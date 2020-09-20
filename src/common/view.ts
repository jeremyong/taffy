import path = require('path');
const { readFile } = require('./fs');
import mustache = require('mustache');

const views: { [view: string]: string } = {};

export const VIEWS = {
    config: 'config.json5.hbs',
    main_style: 'main.css.hbs',
    post: 'post.html.hbs',
    home: 'home.html.hbs',
};

async function load_view(view: string) {
    if (views[view]) {
        return views[view];
    }

    // Get views directory
    // console.log(require.resolve('tuppy'));
    const views_path = path.join(__dirname, '..', '..', 'views');

    try {
        const template = await readFile(path.join(views_path, view));
        views[view] = template;
        return template;
    } catch (error) {
        console.error(error);
        process.exit(1);
    }
}

export async function render(view: string, data: any): Promise<string> {
    const template = await load_view(view);
    return mustache.render(template, data);
}