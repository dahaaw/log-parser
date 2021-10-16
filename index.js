#! /usr/bin/env node

const yargs = require('yargs');
const fs = require('fs');
const readLog = require('./readLog');
const parser = require('./parser');


const options = yargs
 .usage('Usage: [path to log file] -t <format needed> -o <destination>')
 .option('t', { alias: 'format', describe: 'json / text', type: 'string' })
 .option('o', { alias: 'dest', describe: 'destination', type: 'string', demandOption: false })
 .argv;

const logFile = options._[0];
const format = options.format || 'text';
const extension = format === 'text' ? 'txt' : 'json';
const dest = options.dest || `./result/log.${extension}`; 

if(!logFile) return console.log('path of log is required');
if(!fs.existsSync(logFile)) return console.log('log file not found');

readLog(logFile)
.then(async d => {
    let schema;
    const accessSchema = '$remote_addr - $remote_user [$time_local] "$request" $status $bytes_sent "$http_referer" "$http_user_agent"';
    const errorSchema = '$date $time [$level] $port *$code $message, client: $client, server: $server, request: "$request", host: "$host"';
    
    if(await parser(accessSchema, d[0], extension)) schema = accessSchema;
    if(await parser(errorSchema, d[0], extension)) schema = errorSchema;
    if(!schema) return console.log('invalid log format');

    let res = extension === 'json' ? [] : "";
    await d.map(async d => {
        const parsed = await parser(schema, d, extension);
        if(extension === 'json') res.push(parsed);
        if(extension === 'txt') res += parsed + `\n\n`;
    });

    if(extension === 'json') fs.writeFileSync(dest ,JSON.stringify(res));
    if(extension === 'txt') fs.writeFileSync(dest, res);

    console.log(`file saved to ${dest}`);
});