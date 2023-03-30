const fs = require("fs");
const { exec } = require("child_process");
const getMatlabScripts = require("./getMatlabScripts");

const hasMATLAB = () => {
    return !shell.which("matlab");
};

const scripts = getMatlabScripts()

/**
 * Checks MATLAB version
 * @returns {number} version
 */
const getVersion = () => {
    return new Promise((resolve, reject) => {
      exec(
        `matlab -batch "run('${scripts.getVersion}()')`,
        (error, stdout, stderr) => {
          if(!error){
            return resolve(stdout.split("\r\n")[0]);
          } else {
            return reject(error)
          }
        }
      );
    });
  };

  module.exports = {
    getVersion,
    hasMATLAB
  }