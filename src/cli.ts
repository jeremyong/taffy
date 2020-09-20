#!/usr/bin/env node

import yargs = require('yargs');

yargs
    .scriptName('tuppy')
    .commandDir('./commands')
    .argv;