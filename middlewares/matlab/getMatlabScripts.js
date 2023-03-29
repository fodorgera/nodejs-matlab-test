const fs = require('fs')

const folder = "matlab/"

const getMatlabScripts = ()=>{
    const files = fs.readdirSync(folder)
    let scripts = {};
    files.forEach(file=>{
        const fileName = file.split('.')[0];
        scripts[fileName] = folder+fileName
    })
    return scripts
}

module.exports = getMatlabScripts