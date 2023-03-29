/**
 * @param {Object} params 
 * @returns {String} command
 */
const getMatlabParamsFromObject = (params)=>{
    const keys = Object.keys(params);
    const command = keys.map(key=>{
        const string_value = `'${params[key]}'`
        let value;
        // try to parse the param as number
        try {
            value = parseFloat(params[key])
            if(!value){
                value = string_value
            }
        } catch (e){
            value = string_value
        }
        return `${key}=${value}`
    }).join(';')
    return command
  }

module.exports = getMatlabParamsFromObject;