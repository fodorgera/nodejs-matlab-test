const fs = require("fs");
const { exec } = require("child_process");
const shell = require("shelljs");

const scripts = {
  getVersion: "matlab/getVersion",
  getText: "matlab/getText",
};

const hasMATLAB = () => {
  return !shell.which("matlab");
};

/**
 * Run test function with one parameter
 * @returns {string} text
 */
const getText = (s) => {
  console.log(s);
  return new Promise((resolve, reject) => {
    exec(
      `matlab -batch "s='${s}';run('${scripts.getText}(s)')"`,
      (error, stdout, stderr) => {
        console.log(stdout);
        return resolve(stdout.split("\r\n")[0]);
      }
    );
  });
};

/**
 * Checks MATLAB version
 * @returns {number} version
 */
const getVersion = () => {
  return new Promise((resolve, reject) => {
    exec(
      `matlab -batch "run('${scripts.getVersion}()')`,
      (error, stdout, stderr) => {
        return resolve(stdout.split("\r\n")[0]);
      }
    );
  });
};

/**
 * Runs MATLAB script and gives output
 * @param {string} input Runnable Script
 * @returns {string} result
 */
const run = async (input) => {
  let temporaryFile = input;
  try {
    if (hasMATLAB()) {
      return "You must have MATLAB installed";
    }
    let version = await getVersion();
    if (version) {
      if (!fs.existsSync(input)) {
        return null;
      }

      return new Promise((resolve, reject) => {
        exec(
          `matlab -nosplash -batch "run('${temporaryFile}'); exit;"`,
          (error, stdout, stderr) => {
            if (error) {
              reject(stderr.trim());
            }
            resolve(
              stdout
                .replace("ans =\r\n\r\n", "")
                .trim()
                .replace(/\\n/g, "\n")
                .trim()
            );
          }
        );
      });
    }
  } catch (error) {
    return error;
  }
};

module.exports = {
  run,
  getVersion,
  getText,
};
