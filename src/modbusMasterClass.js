const { Device_Config } = require("./config.js");
const ModbusRTU = require("modbus-serial");
const { join, concat } = require("lodash");
const { HexStringConverter } = require("javascript-binary-converter");

/**
 * @description initiation of Storage Object
 */
let storage = {
  deviceName: Device_Config.DEVICE_NAME,
};

/**
 * @Class
 * @description Modbus Master Class
 */
class ModbusMaster {
  /**
   * @Member ModbusMaster Class
   * @Constructor
   * @param {String} serialPort Serialport to connect to
   * @param {number} baudRate   Baudrate
   * @param {number} stopBit    Stopbit
   * @param {number} startBit   Startbit
   * @param {number} parity     Parity
   * @param {boolean} autoOpen  Port auto-open
   * @returns
   */
  constructor(
    serialPort,
    baudRate,
    stopBit,
    startBit,
    parity,
    autoOpen = false,
    mbID
  ) {
    this.serialPort = serialPort;
    this.baudRate = baudRate;
    this.stopBit = stopBit;
    this.startBit = startBit;
    this.parity = parity;
    this.autoOpen = autoOpen;
    this.mbID = mbID;
    this.instances = [];
    this.instances.push(this);
  }

  /**
   * @Member ModbusMaster Class
   * @Private
   * @Property
   * @description private field containing serial settings
   */
  #serialSettings = {
    port: this.serialPort,
    buadRate: this.baudRate,
    stopBit: this.stopBit,
    startBit: this.startBit,
    parity: this.parity,
    autoOpen: this.autoOpen,
  };

  client = {};

  /**
   * @Member ModbusMaster Class
   * @Getter
   * @returns number of class instances
   */
  getInstances = () => {
    return this.instances.length;
  };

  /**
   * @Member ModbusMaster Class
   * @Method
   * @description Method that establishes the connection to the RTU
   */
  connect() {
    try {
      this.client = new ModbusRTU();
      this.client.connectRTUBuffered(this.serialPort, {
        baudRate: this.baudRate,
        stopbits: this.stopBit,
        databits: 8,
        parity: this.parity,
        autoOpen: this.autoOpen,
      });
      this.client.open();
      console.log(
        `MODBUS INSTANCE WITH ID ${this.mbID} INITIALIZED ON PORT ${this.serialPort} WITH ${this.baudRate} BPS!`
      );
    } catch (error) {
      console.error("Modbus Connection ERROR!", error);
    }
  }

  /**
   * @Member ModbusMaster Class
   * @param {Number} ms delay time in Milliseconds
   * @description Promise that serves as delay between modbus readings
   */
  sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

  /**
   * @Member ModbusMaster Class
   * @Method
   * @param {Any} data
   * @returns binary representation of the given variable
   */
  hex2bin = (data) =>
    data
      .split("")
      .map((i) => parseInt(i, 16).toString(2).padStart(4, "0"))
      .join("");

  /**
   * @Member ModbusMaster Class
   * @Method
   * @param {Array} frame
   * @returns floating point representation of the given variable
   * @label 2 words
   */
  hex2float(frame) {
    const highByteStr = frame.data[0].toString(16);
    const lowByteStr = frame.data[1].toString(16);
    const word = concat(highByteStr, lowByteStr).join("");
    return new HexStringConverter(word).toFloat();
  }

  /**
   * @Member ModbusMaster Class
   * @Method
   * @param {Array} frame
   * @returns floating point representation of the given variable
   * @label 4 words
   */
  hex2float4W(frame) {
    const highByteStr1 = frame.data[0].toString(16);
    const lowByteStr1 = frame.data[1].toString(16);
    const highByteStr2 = frame.data[2].toString(16);
    const lowByteStr2 = frame.data[3].toString(16);
    const word1 = "0x" + concat(highByteStr1, lowByteStr1).join("");
    const word2 = concat(highByteStr2, lowByteStr2).join("");
    const res = concat(word1, word2).join("");
    return new HexStringConverter(res).toFloat();
  }

  /**
   * @Member ModbusMaster Class
   * @async
   * @Method
   * @description Method responsible for writing, reading and parsing incoming and outgoing serial data
   * @label modbus function code 0x04
   */
  async modbusReadInputRegs(obj, id, wordCount, waitMS) {
    await this.client.setID(id);
    try {
      if (!Object.entries(obj)) {
        console.error("Empty Object!");
      }
      for (let [key, value] of Object.entries(obj)) {
        let frame = await this.client.readInputRegisters(value, wordCount);
        if (wordCount == 1) {
          storage[key] = frame.data[0];
        } else if (wordCount == 2) {
          storage[key] = Number(this.hex2float(frame).toFixed(2));
        } else if (wordCount == 8) {
          storage[key] = Number(this.hex2float4W(frame).toFixed(3));
        } else {
          console.log("wordcount exceeded");
        }
        await this.sleep(waitMS); //def 100
      }
    } catch (error) {
      console.error("Error during Input register read", this.serialPort, error);
    }
  }

  /**
   * @Member ModbusMaster Class
   * @async
   * @Method
   * @description Method responsible for writing, reading and parsing incoming and outgoing serial data
   * @label modbus function code 0x03
   */
  async modbusReadHoldingRegs(obj, id, wordCount, waitMS) {
    await this.client.setID(id);
    try {
      if (!Object.entries(obj)) {
        console.error("Empty Object!");
      }
      for (let [key, value] of Object.entries(obj)) {
        let frame = await this.client.readHoldingRegisters(value, wordCount);
        if (wordCount == 1) {
          storage[key] = frame.data[0];
        } else if (wordCount == 2) {
          storage[key] = Number(this.hex2float(frame).toFixed(2));
        } else if (wordCount == 8) {
          storage[key] = Number(this.hex2float4W(frame).toFixed(3));
        } else {
          console.log("wordcount exceeded");
        }
        await this.sleep(waitMS); //def 100
      }
    } catch (error) {
      console.error(
        "Error during Holding register read",
        this.serialPort,
        error
      );
    }
  }
}

module.exports = {
  ModbusMaster,
  storage,
};
