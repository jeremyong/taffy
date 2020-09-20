import path = require('path');
import fs = require('./fs');
import json5 = require('json5');
import crypto from 'crypto';

let config: any = null;

export default async function () {
    if (!config) {
        try {
            const text = await fs.readFile(path.join(process.cwd(), 'config.json5'));
            config = json5.parse(text);

            if (!config.name) {
                console.error(`Config file is missing a name!`);
                process.exit(1);
            }

            if (!config.lang) {
                config.lang = 'en';
            }

            if (config.gravatar_email) {
                const hash = crypto.createHash('md5').update(config.gravatar_email.trim().toLowerCase()).digest('hex');
                config.avatar = `https://www.gravatar.com/avatar/${hash}`;
            }

            if (!config.highlight_theme) {
                config.highlight_theme = 'github';
            }
        }
        catch (error) {
            console.error(`Unable to load config.json5 file: ${error}`);
            process.exit(1);
        }
    }
    return config;
}
