const cfg = require("./config.js");

/**
 * @Member dummyPayload Module
 * @param {Number} min min value
 * @param {Number} max max value
 * @returns random number between min and max
 */
function randomIntFromInterval(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}

/**
 * @Member dummyPayload Module
 * @returns Object containing the randomized data
 * @description Creates the payload to be sent up to GCP Firestore
 */
module.exports = function createDummyPyld() {
  let essData = {
    deviceInfo: {
      deviceName: "MTH_ESS",
      deviceId: 1,
      deviceType: "ENERGY_STORAGE_SYSTEM",
      location: "Erebor",
      company: "MTholding",
    },
    acrelData: {
      DCVoltage: randomIntFromInterval(390, 410),
      DCCurrent: randomIntFromInterval(40, 55),
      //BrokenWire: 0,
      InternalTemp: randomIntFromInterval(37, 70),
      Power: randomIntFromInterval(19500, 22550),
      //AlarmStatus: randomIntFromInterval(0, 3),
      DeviceName: cfg.Acrel_Single_Config.ACREL_NAME,
      DeviceType: cfg.Acrel_Single_Config.DEVICE_TYPE,
    },
    acrelDualData: {
      DCVoltage: randomIntFromInterval(390, 410),
      DCCurrent: randomIntFromInterval(50, 55),
      //BrokenWire: 0,
      InternalTemp: randomIntFromInterval(37, 70),
      Power: randomIntFromInterval(19500, 22550),
      //AlarmStatus: randomIntFromInterval(0, 3),
      DeviceName: cfg.Acrel_Dual_Config.ACREL_DUAL_NAME,
      DeviceType: cfg.Acrel_Dual_Config.DEVICE_TYPE,
    },
    ornoData: {
      L1Voltage: randomIntFromInterval(230, 250),
      L2Voltage: randomIntFromInterval(230, 250),
      L3Voltage: randomIntFromInterval(230, 250),
      L1Current: randomIntFromInterval(16, 18),
      L2Current: randomIntFromInterval(16, 18),
      L3Current: randomIntFromInterval(16, 18),
      TotalActivePower: randomIntFromInterval(11040, 24000),
      L1ActivePower: randomIntFromInterval(3680, 4500),
      L2ActivePower: randomIntFromInterval(3680, 4500),
      L3ActivePower: randomIntFromInterval(3680, 4500),
      Frequency: randomIntFromInterval(49, 51),
      DeviceName: cfg.Orno_Config.ORNO_NAME,
      DeviceType: cfg.Orno_Config.DEVICE_TYPE,
    },
    lumelData: {
      L1Voltage: randomIntFromInterval(230, 250),
      L2Voltage: randomIntFromInterval(230, 250),
      L3Voltage: randomIntFromInterval(230, 250),
      L1Current: randomIntFromInterval(16, 18),
      L2Current: randomIntFromInterval(16, 18),
      L3Current: randomIntFromInterval(16, 18),
      L1Power: randomIntFromInterval(3680, 4500),
      L2Power: randomIntFromInterval(3680, 4500),
      L3Power: randomIntFromInterval(3680, 4500),
      TotalActivePower: randomIntFromInterval(11040, 24000),
      TotalActiveEnergy: 2312414141,
      DeviceName: cfg.Lumel_Config.LUMEL_NAME,
      DeviceType: cfg.Lumel_Config.DEVICE_TYPE,
    },
    batteryData: {
      TotalVoltage: randomIntFromInterval(390, 410),
      TotalCurrent: randomIntFromInterval(70, 95),
      SystemSOC: randomIntFromInterval(87, 95),
      RemainingCapacity: randomIntFromInterval(65, 70),
      SOH: randomIntFromInterval(57, 70),
      //BatteryFullSign: randomIntFromInterval(0, 1),
      //BatteryEmptyFlag: randomIntFromInterval(1, 0),
      DeviceName: cfg.Battery_Config.BATTERY_NAME,
      DeviceType: cfg.Battery_Config.DEVICE_TYPE,
    },
    contactorStates: {
      K1: randomIntFromInterval(0, 1),
      K2: randomIntFromInterval(0, 1),
      K3: randomIntFromInterval(0, 1),
      K4: randomIntFromInterval(0, 1),
    },
    time: {
      timestamp: Date.now(),
      date: new Date(Date.now()).toLocaleString(),
    },
  };
  return essData;
};
