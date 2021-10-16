const identifierAndValue = /^(\w*)(.*?)$/;
const capture = '(.+?)';


module.exports = async (template, line, ext) => {
    let identifiers = [];
    let schema;

    const parts = template.split('$');
    const delimiters = [];

    delimiters.push(parts.shift())

    for (const part of parts) {
        const token = part.match(identifierAndValue)
        identifiers.push(token[1])

        const delimiter = escapeRegExpLiteral(token[2])
        delimiters.push(delimiter)
    }

    const regexpString = '^' + delimiters.join(capture) + '$'
    schema = new RegExp(regexpString)

    
    return parseLine(schema, line, identifiers, ext);
}

const escapeRegExpLiteral = (str) => str.replace(/[\\.?*+^$|\-(){}\[\]]/g, '\\$&');

const parseLine = (schema, line, identifiers, ext) => {
    const values = line.match(schema)

    if (!values || values.length - 1 !== identifiers.length) return

    values.shift()
    let result = (ext === 'json' ? {} : "");
    
    for (let i = 0; i < values.length; i++) {
        const identifier = identifiers[i]
        if(ext === 'json') result[identifier] = values[i]
        if(ext === 'txt') result += `${identifier}: ${values[i]} \n`
    }

    return result
}