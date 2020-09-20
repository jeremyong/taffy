import path = require('path');
import * as fs from '../common/fs';
const fm = require('front-matter');
import { render, VIEWS } from '../common/view';
import config from '../common/config';
import Markdown from 'markdown-it';

const callouts = ['tip', 'info', 'warning', 'danger'];

function callout(type: string, body: string) {
    if (callouts.includes(type)) {
        return `<div class="callout-${type}">${body}</div>`;
    } else {
        return '';
    }
}

const hljs = require('highlight.js');
const md = Markdown({
    html: true,
    highlight: function (str: string, lang: string) {
        if (lang && hljs.getLanguage(lang)) {
            try {
                return hljs.highlight(lang, str).value;
            } catch (_) { }
        }

        return callout(lang, str);
    }
});
const mk = require('@iktakahiro/markdown-it-katex');
const footnote = require('markdown-it-footnote');
const emoji = require('markdown-it-emoji');
const admon = require('markdown-it-admonition');
md.use(admon, {
    classes: ['mui-panel', 'admonition'],
    titleTransform: (title: string) => title.charAt(0).toLocaleUpperCase() + title.slice(1),
});
md.use(footnote);
md.use(emoji);

const raw_md = Markdown({ html: true });

let mk_initialized = false;

exports.command = 'build [post]';

exports.aliases = 'b';

exports.describe = 'Build the blog, optionally restricting the build to a single post';

interface Args {
    '$0': string; // exe name
    '_': string[]; // raw arguments
    post?: string; // optional post name
}

let posts = new Map();

async function init() {
    if (!mk_initialized) {
        const conf = await config();
        if (conf.katex_options) {
            md.use(mk, conf.katex_options);
            raw_md.use(mk, conf.katex_options);
        } else {
            md.use(mk);
            raw_md.use(mk);
        }
        mk_initialized = true;
    }
    posts = new Map();
}


async function build_post(post: string) {
    // Find what should be the lone markdown file in the post directory
    const post_dir = path.join(process.cwd(), 'posts', post);

    // Verify that the post passed is a valid directory
    const stats = await fs.stat(post_dir);
    if (!stats.isDirectory()) {
        console.log(`Skipping build of posts/${post}: not a directory`);
        return;
    }

    const files = await fs.ls(post_dir);
    let markdown_found = false;
    let markdown_file = '';

    for (let i = 0; i != files.length; ++i) {
        const file = files[i];
        const ext = path.extname(file);
        if (ext === '.md' || ext === '.markdown') {
            const file_path = path.join(post_dir, file);
            const stats = await fs.stat(file_path);
            if (stats.isFile()) {
                if (!markdown_found) {
                    markdown_found = true;
                    markdown_file = file_path;
                } else {
                    console.error(`Not processing posts/${post} as it contains two or more markdown files`);
                    return;
                }
            }
        }
    }
    if (!markdown_found) {
        console.log(`Skipping posts/${post} as it does not contain a markdown file`);
        return;
    }

    const text = await fs.readFile(markdown_file);
    const meta = fm(text);
    const attributes = meta.attributes;
    if (!attributes.title) {
        console.error(`Post ${markdown_file} is missing a title!`);
        return;
    }
    if (!(attributes.year && attributes.month && attributes.day)) {
        console.error(`Post ${markdown_file} needs a date (please specify a year, month, and day in the front matter)!`);
        return;
    }
    if (attributes.subtitle) {
        // Process any LaTeX present in the subtitle
        attributes.subtitle = raw_md.render(attributes.subtitle);
    }

    const month = attributes.month < 10 ? `0${attributes.month}` : attributes.month;
    const day = attributes.day < 10 ? `0${attributes.day}` : attributes.day;

    const body = md.render(meta.body);
    const long_date = `${attributes.year}.${month}.${day}`;

    const data = {
        config: await config(),
        post: {
            ...attributes,
            long_date,
            body,
        },
    };
    const output = await render(VIEWS.post, data);

    // Emit the output page to the "dist" directory. If no custom uri is provided, the default
    // path mapping will be used

    let uri = attributes.uri;
    // Normalize the title to something URL friendly
    const title = attributes.title
        .replace(/ /g, '-') // Represent spaces as hyphens
        .toLowerCase() // Normalize capitalization
        .replace(/--+/g, '-') // Coalesce sequences of repeated hyphens
        .replace(/[^0-9a-z_-]/g, ''); // Strip non-printable and whitespace ascii characters
    if (!uri) {
        uri = `${attributes.year}/${month}/${day}/${title}`;
    }
    const output_path = path.join(process.cwd(), 'dist', uri, 'index.html');

    posts.set(uri, {
        title: attributes.title,
        subtitle: attributes.subtitle,
        long_date,
        uri,
    });

    try {
        await fs.writeFile(output_path, output);
    } catch (err) {
        console.error(`Failed to build posts/${post}: ${err}`);
    }
}

async function build_home() {
    const post_summaries = Array.from(posts.values());
    console.log(post_summaries)
    const output = await render(VIEWS.home, {
        config: await config(),
        posts: post_summaries,
    });
    const output_path = path.join(process.cwd(), 'dist', 'index.html');
    try {
        await fs.writeFile(output_path, output);
    } catch (err) {
        console.error(`Failed to build home page: ${err}`);
    }
}

exports.handler = async function (argv: Args) {
    await init();

    if (argv.post) {
        await build_post(argv.post);
    } else {
        const dirs = await fs.ls(path.join(process.cwd(), 'posts'));

        await Promise.all(dirs.map(build_post));

        // Rebuild index page
        build_home();
    }

    // Ensure that global scripts/css files needed are available
    const main_css = await render(VIEWS.main_style, {});
    await fs.writeFile(path.join(process.cwd(), 'dist', 'main.css'), main_css);

}
