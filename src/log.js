const fs = require("fs");
/**
 * @Member log Module
 * @Function
 * @param {Object} obj
 * @description function that creates a json log file containing the last values read from modbus slaves
 */
module.exports = function createJSONLogFile(obj) {
  obj.timestamp = Date.now();
  Object.assign(obj, {
    logDate: new Date(obj.time.timestamp).toLocaleString(),
  });
  let jsonFile = JSON.stringify(obj, null, 2);
  fs.writeFile("log.json", jsonFile, function (err) {
    if (err) throw err;
    console.log(`log.json saved!`);
  });
};
