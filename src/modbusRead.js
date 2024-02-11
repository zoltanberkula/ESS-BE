const { Default_Modbus_Config, Orno_Modbus_Config } = require("./config.js");
const { storage, ModbusMaster } = require("./modbusMasterClass.js");

/**
 * @Member modbusRead Module
 * @Instance of ModbusMasterClass
 * @description
 */
let modbusMaster = new ModbusMaster(
  Default_Modbus_Config.SERIAL_PORT,
  Default_Modbus_Config.BAUD_RATE,
  Default_Modbus_Config.STOP_BIT,
  Default_Modbus_Config.START_BIT,
  Default_Modbus_Config.PARITY, //PARITY NONE
  Default_Modbus_Config.AUTO_OPEN,
  Default_Modbus_Config.MODBUS_ID
);

/**
 * @Member modbusRead Module
 * @Instance of ModbusMasterClass
 * @description Modbus instance attached to the Orno EMD
 */
let ornoModbus = new ModbusMaster(
  Orno_Modbus_Config.SERIAL_PORT,
  Orno_Modbus_Config.BAUD_RATE,
  Orno_Modbus_Config.STOP_BIT,
  Orno_Modbus_Config.START_BIT,
  Orno_Modbus_Config.PARITY, //PARITY EVEN
  Orno_Modbus_Config.AUTO_OPEN,
  Orno_Modbus_Config.MODBUS_ID
);

/**
 * @Member modbusRead Module
 * @decription connecting to modbus network 1, 2
 */
modbusMaster.connect(); //PARITY NONE
ornoModbus.connect(); //PARITY EVEN

let storedData = [];

/**
 * @Member modbusRead Module
 * @Function
 * @param {Object} data
 * @param {Number} id
 * @param {Number} wordCount
 * @param {Number} waitMS
 * @description Function responsible for reading Holding Registers
 */
function modbusReadHolding(data, id, wordCount, waitMS) {
  modbusMaster.modbusReadHoldingRegs(data, id, wordCount, waitMS);
  storedData[0] = JSON.stringify(storage);
}

/**
 * @Member modbusRead Module
 * @Function
 * @param {Object} data
 * @param {Number} id
 * @param {Number} wordCount
 * @param {Number} waitMS
 * @description Function responsible for reading Input Registers
 */
function modbusReadInput(data, id, wordCount, waitMS) {
  modbusMaster.modbusReadInputRegs(data, id, wordCount, waitMS);
  storedData[1] = JSON.stringify(storage);
}

/**
 * @Member modbusRead Module
 * @Function
 * @param {Object} data
 * @param {Number} id
 * @param {Number} wordCount
 * @param {Number} waitMS
 * @description Function responsible for reading Holding Registers
 * @comment used for Orno EMD readings
 */
function ornoModbusRead(data, id, wordCount, waitMS) {
  ornoModbus.modbusReadHoldingRegs(data, id, wordCount, waitMS);
  storedData[2] = JSON.stringify(storage);
}

/**
 * @Member modbusRead Module
 * @returns number of active modbusMaster Class instances
 */
function getMBinstances() {
  return [modbusMaster.getInstances(), ornoModbus.getInstances()];
}

module.exports = {
  modbusReadHolding: modbusReadHolding,
  modbusReadInput: modbusReadInput,
  ornoModbusRead: ornoModbusRead,
  getMBinstances: getMBinstances,
  storedData: storedData,
};
