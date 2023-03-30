const {getVersion,hasMATLAB} = require('./getVersion')
const getMatlabScripts = require('./getMatlabScripts')
const getMatlabFunctionWithParams = require('./getMatlabFunctionWithParams')
const getMatlabParamsFromObject = require('./getMatlabParamsFromObject')

/**
 * Run function with parameters
 * @returns {Promise} JSON output from MATLAB || error
 */
const runFunction = ({fileName, params}) => {
  return new Promise((resolve, reject)=>{
    const matlabCommand = `${getMatlabParamsFromObject(params)};${getMatlabFunctionWithParams(fileName,params)}`;
    exec(
      `matlab -batch "${matlabCommand}"`,
      (error, stdout, stderr) => {
        if(!error){
          console.log(stdout);
          return resolve(JSON.parse(stdout.split("\r\n")[0]));
        } else {
          return reject(error)
        }
      }
    )
  })
}

module.exports = {
  runFunction,
  hasMATLAB,
  getVersion,
  getMatlabScripts,
  getMatlabFunctionWithParams,
  getMatlabParamsFromObject
};
