const getMatlabScripts = require("./getMatlabScripts");

const scripts = getMatlabScripts()

/**
 * @param {String} fileName 
 * @param {Object} params 
 * @returns {String} command
 */
const getMatlabFunctionWithParams = (fileName,params)=>{
  const keys = Object.keys(params).join(',');
  const command = `run('${scripts[fileName]}(${keys})')`
  return command
}

module.exports = getMatlabFunctionWithParams