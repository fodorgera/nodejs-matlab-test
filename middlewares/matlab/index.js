const fs = require("fs");
const { exec } = require("child_process");

const getVersion = require('./getVersion')
const getMatlabScripts = require('./getMatlabScripts')
const getMatlabFunctionWithParams = require('./getMatlabFunctionWithParams')
const getMatlabParamsFromObject = require('./getMatlabParamsFromObject')

/**
 * Run function with parameters
 * @returns {Object} data
 */
const runFunction = ({fileName, params}) => {
  return new Promise((resolve, reject)=>{
    const matlabCommand = `${getMatlabParamsFromObject(params)};${getMatlabFunctionWithParams(fileName,params)}`;
    exec(
      `matlab -batch "${matlabCommand}"`,
      (error, stdout, stderr) => {
        console.log(stdout);
        return resolve(JSON.parse(stdout.split("\r\n")[0]));
      }
    )
  })
}

module.exports = {
  runFunction,
  getVersion,
  getMatlabScripts,
  getMatlabFunctionWithParams,
  getMatlabParamsFromObject
};
