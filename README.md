# Tuppy 🍲

## NOTE: CURRENTLY UNDER ACTIVE DEVELOPMENT

Tuppy is a no-fuss, batteries included static-site blog engine. It is designed
to deploy easily on [GitHub Pages](https://pages.github.com/) and is built on
top of Markdown and LaTeX. Tuppy is geared toward bloggers with a math, science,
and tech bent, but all usage is encouraged.

Here are some of the batteries Tuppy includes:

1. LaTeX support for inline math (single $ signs) and display math (surrounded
   with $$).
2. Full syntax highlighting
3. Customizable theme based on [Material Design](https://material.io/)
4. WebGL integration to seamlessly produced demos in-browser with custom JS
5. Smoothly resizing responsive layout for desktop, tablet, and mobile

## Usage

Tuppy is written in [TypeScript](https://www.typescriptlang.org/) and distributed
via NPM. To start a new blog, execute the following commands:

```bash
# In your blog folder
npm init
npm install tuppy
```

### Making a Post

Here are some guidelines for making a new post:

- Create a folder in the posts folder (name is up to you)
- Create a single `.md` file in the posts folder (name is up to you)
- Add a preamble to the markdown file to describe the post (example below)

```md
---
title: My Snazzy Post
author: Your Name
year: 2020
month: 08
day: 02
---
```

### Add Content

When adding content, you have a number of options available for creating "admonition"
tooltips.

TODO: Document LaTeX usage, admonitions, images, etc

## TODOs

### Style/Layout changes/fixes

- [ ] Invoke KaTeX on the post descriptions to enable LaTeX usage in descriptions
- [ ] Injectable JS
- [ ] Integrate plotting library
- [ ] Integrate markdown anchors extensions to support inter-post linking
- [ ] Provide header/footer templates and enable customization
- [ ] Social media links/icons

### Live previewer

The `preview` command is implemented in `src/commands/preview.ts`. Currently, this
command creates a simple express server that hosts files built statically in the `dist`
folder. Ideally, the files would be rebuilt each time a corresponding markdown file or
stylesheet changes.

- [ ] Use nodejs's file watcher functionality to watch file dependencies for changes
- [ ] Every time a page is built, write a metadata file containing all dependencies needed
      to build the file (html templates, css templates, markdown files, etc)
- [ ] When dependencies change, automatically rebuild all dependent pages
- [ ] Inject a script to each served page which opens a socket to the preview server
- [ ] When a page is rebuilt, push a message to the browser via websocket indicating the page
      should reload

## FAQ

### Why do all posts have their own folder?

Posts with substance generally have associated images, figures,
code, or any number of other resources that should be logically grouped together.
The folder name can be anything, as the title will be described in the markdown
file in that directory. Sometimes, it can be helpful to put in things like
your own notes, or test code that never actually get published to your site.
Enforcing a folder per-post creates a logical structure to make navigating
a long-running blog a bit less painful. This design choice (like many others),
was made after years of operating with other blogging engines.

### Why do post markdown file names and folder names not matter?

When you do a project-wide search in your favorite editor or filesystem, you
really don't want to see dozens of listings called `index.md` or `post/post.md`.
Ideally, posts you author have a nice shortname that is easy to locate later
for easy reference or editing.

### Why is the year, month, and day specified separately in the post preamble?

To avoid confusion between different date formats, or mistakenly specifying the
month when you meant the day or vice versa.

### Why is the [Computer Modern Serif](https://en.wikipedia.org/wiki/Computer_Modern) font used?

Math is best displayed with a serif font, and Computer Modern was designed with
the express purpose of suitability for scientific typesetting by (the great)
Donald Knuth. Posts that intermix sans-serif and serif fonts for math and non-math
text are less readable, and enforcing the font throughout produces a more
uniform aesthetic.

### OK, but why the serif font-family?

While Computer Modern also comes in a sans-serif variety, it is the creator's
opinion that many mathematical symbols and Greek letters are simply more
legible and distinguishable when serifs are provided. Compare for example, the
letter i, the imaginary i (or i unit vector), or the Greek letter iota. All of
them may reasonably show up in a neighboring context, and should be immediately
differentiable (in the visual sense). While they are visually distinct in the
sans-serif form, the difference is less pronounced.
