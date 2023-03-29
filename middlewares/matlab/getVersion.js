const hasMATLAB = () => {
    return !shell.which("matlab");
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

  module.exports = getVersion
  module.exports = {
    hasMATLAB
  }