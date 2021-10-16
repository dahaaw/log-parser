#! /usr/bin/env node

const yargs = require('yargs');
const fs = require('fs')

const options = yargs
 .usage('Usage: [path to log file] -t <format needed> -o <destination>')
 .option('t', { alias: 'format', describe: 'json / text', type: 'string' })
 .option('o', { alias: 'dest', describe: 'destination', type: 'string', demandOption: false })
 .argv;

const logFile = options._[0];
const format = options.format ;
const dest = options.dest; 

if(!logFile) return console.log('path of log is required');
if(!fs.existsSync(logFile)) return console.log('log file not found');



console.log({logFile, format, dest, options})