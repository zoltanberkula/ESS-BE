const { storage } = require("./modbusMasterClass.js");
const cfg = require("./config.js");
let { join, concat } = require("lodash");
const { converter } = require("javascript-binary-converter");
const { HexStringConverter } = require("javascript-binary-converter");

/**
 * @Member payload Module
 * @param {byte} hb high byte
 * @param {byte} lb low byte
 * @returns floating point representation of given bytes
 */
function hex2float(hb, lb) {
  const highByteStr = hb.toString(16);
  const lowByteStr = lb.toString(16);
  const word = concat(highByteStr, lowByteStr).join("");
  return new HexStringConverter(word).toFloat();
}

/**
 * @Member payload Module
 * @param {byte} hb high byte
 * @param {byte} lb low byte
 * @returns parsed representation of given bytes
 */
function getkWh(hb, lb) {
  let hbStr = hb.toString(16);
  let lbStr = lb.toString(16);
  let hexStr = concat(hbStr, lbStr).join("");
  return parseInt(hexStr, 16) / 1000;
}

//const contactorControl = require("./contactorStateObserver.js");

/**
 * @Member payload Module
 * @returns Object containing the read data from the slaves
 * @description Creates the payload to be sent up to GCP Firestore
 */
module.exports = function createPyld() {
  let essData = {
    deviceInfo: {
      deviceName: "MTH_ESS",
      deviceId: 1,
      deviceType: "ENERGY_STORAGE_SYSTEM",
      location: "Erebor",
      company: "MTholding",
    },
    acrelData: {
      DCVoltage: Number(storage.AcrelDcVoltage),
      DCCurrent: Number(storage.AcrelDcCurrent / 10),
      InternalTemp: Number(storage.AcrelInternalTemp / 10),
      Power: Number(storage.AcrelPowerValue / 10),
      DeviceName: cfg.Acrel_Single_Config.ACREL_NAME,
      DeviceType: cfg.Acrel_Single_Config.DEVICE_TYPE,
      Wh1: Number(
        getkWh(
          storage.AcrelTotalPositiveActiveEnergyHighByte,
          storage.AcrelTotalPositiveActiveEnergyLowByte
        )
      ),
      Wh2: Number(
        getkWh(
          storage.AcrelTotalPositiveActiveEnergyHb,
          storage.AcrelTotalPositiveActiveEnergyLb
        )
      ),
    },
    acrelDualData: {
      DCVoltage: Number(storage.AcrelDDcVoltage),
      DCCurrent: Number(storage.AcrelDDcCurrent / 10),
      InternalTemp: Number(storage.AcrelDInternalTemp / 10),
      Power: Number(storage.AcrelDPowerValue / 10),
      DeviceName: cfg.Acrel_Dual_Config.ACREL_DUAL_NAME,
      DeviceType: cfg.Acrel_Dual_Config.DEVICE_TYPE,
      // cons: Number(
      //   getWh(
      //     storage.AcrelDualTotalPositiveActiveEnergyHighByte,
      //     storage.AcrelDualTotalPositiveActiveEnergyLowByte
      //   )
      // ),
      // cons2: Number(
      //   getWh(
      //     storage.AcrelDualTotalPositiveActiveEnergyHb,
      //     storage.AcrelDualTotalPositiveActiveEnergyLb
      //   )
      // ),
    },
    ornoData: {
      L1Voltage: Number(storage.OrnoL1Voltage),
      L2Voltage: Number(storage.OrnoL2Voltage),
      L3Voltage: Number(storage.OrnoL3Voltage),
      L1Current: Number(storage.OrnoL1Current),
      L2Current: Number(storage.OrnoL2Current),
      L3Current: Number(storage.OrnoL3Current),
      TotalActivePower: Number(storage.OrnoTotalActivePower),
      L1ActivePower: Number(storage.OrnoL1ActivePower),
      L2ActivePower: Number(storage.OrnoL2ActivePower),
      L3ActivePower: Number(storage.OrnoL3ActivePower),
      Frequency: Number(storage.OrnoGridFrequency),
      DeviceName: cfg.Orno_Config.ORNO_NAME,
      DeviceType: cfg.Orno_Config.DEVICE_TYPE,
    },
    // lumelData: {
    //   L1Voltage: Number(storage.LumelL1Voltage),
    //   L2Voltage: Number(storage.LumelL2Voltage),
    //   L3Voltage: Number(storage.LumelL3Voltage),
    //   L1Current: Number(storage.LumelL1Current),
    //   L2Current: Number(storage.LumelL2Current),
    //   L3Current: Number(storage.LumelL3Current),
    //   L1Power: Number(storage.LumelL1Power),
    //   L2Power: Number(storage.LumelL2Power),
    //   L3Power: Number(storage.LumelL3Power),
    //   TotalActivePower: Number(storage.LumelTotalActivePower),
    //   TotalActiveEnergy: Number(storage.LumelTotalActiveEnergy),
    //   DeviceName: cfg.Lumel_Config.LUMEL_NAME,
    //   DeviceType: cfg.Lumel_Config.DEVICE_TYPE,
    // },
    batteryData: {
      TotalVoltage: Number(storage.BatteryTotalVoltage / 10),
      //TotalVoltage: Number(storage.BatteryTotalVoltage / 100),
      TotalCurrent: Number(storage.BatteryTotalCurrent / 10),
      SystemSOC: Number(storage.BatterySystemSOC),
      SOH: Number(storage.BatterySOH),
      DeviceName: cfg.Battery_Config.BATTERY_NAME,
      DeviceType: cfg.Battery_Config.DEVICE_TYPE,
    },
    contactorStates: {
      K1: false, //contactorControl.contactorStatusObj.K1,
      K2: false, //contactorControl.contactorStatusObj.K2,
      K3: false, //contactorControl.contactorStatusObj.K3,
      K4: false, //contactorControl.contactorStatusObj.K4,
    },
    time: {
      timestamp: Date.now(),
      date: new Date(Date.now()).toLocaleString(),
    },
  };
  return essData;
};
