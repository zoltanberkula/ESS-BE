const { ESS } = require("./src/essClass.js");
const { System_Config } = require("./src/config.js");
/**
 * @Member main
 * @description ESS Instantiation
 */
const ess = new ESS(System_Config);
ess.perform();
