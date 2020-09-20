import * as path from 'path';
import * as http from 'http';
import handler from 'serve-handler';

exports.command = 'preview [port]';

exports.aliases = 'p';

exports.describe = 'Preview the blog on a local server, optionally specifying a port (default: 5000).'

interface Args {
    port?: number;
}

exports.handler = function (argv: Args) {
    const port = argv.port ? argv.port : 5000;

    const server = http.createServer((request, response) => {
        return handler(request, response, {
            public: path.join(process.cwd(), 'dist'),
        });
    });

    server.listen(port, () => {
        console.log(`Tuppy preview server running at http://localhost:${port}`);
    });
}
