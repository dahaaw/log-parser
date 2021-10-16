const fs = require('fs');

module.exports  = (logFile) => {
    return new Promise((resolve, reject) => {
        fs.readFile(logFile, 'utf8', (err, contents) => {
            if(err) return console.log('invalid log file')
            resolve(contents.toString().split(/\n/).reverse().filter(f => f !== ""));
        });
    });
};