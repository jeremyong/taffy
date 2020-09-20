import path = require('path');
import fs = require('../common/fs');

exports.command = 'init';

exports.aliases = 'i';

exports.describe = 'Initialize a new blog';

exports.handler = async function () {
    // TODO: query user for blog name, description, etc

    try {
        console.log('Creating posts directory...')
        await fs.mkdir(path.join(process.cwd(), 'posts'));
    } catch (err) {
        console.error(`Unable to create posts directory`);
        process.exit(1);
    }
}