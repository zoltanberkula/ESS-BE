const cfg = require("./config.js");
const { storage } = require("./modbusMasterClass.js");
const { MQTT } = require("./mqttClass.js");
const { firestoreWrite } = require("./firestoreCoop.js");

//const { Contactor } = require("./contactorClass.js");
//const contactorControl = require("./contactorStateObserver.js");
//const { K1, K2, K3, K4 } = require("./contactorStateObserver.js");
const createPyld = require("./payload.js");
const createDummyPyld = require("./dummyPayload.js");
const log = require("./log.js");

const {
  modbusReadHolding,
  modbusReadInput,
  getMBinstances,
  ornoModbusRead,
  storedData,
} = require("./modbusRead.js");

const {
  Acrel_Single_Config,
  Acrel_Dual_Config,
  Orno_Config,
  Battery_Config,
} = require("./config.js");

const {
  acrel_iData,
  acrelD_iData,
  orno_iData,
  battery_iData,
  acrel_cumulated_iData,
  battery_basic_iData,
} = require("./regAddress.js");

/**
 * @class
 * @description ESS Class
 */
class ESS {
  /**
   * @Member ESS Class
   * @constructor
   * @param {Object} config system configuration object
   */
  constructor(config) {
    this.#config = config;
    this.#payload = {};
    this.#dummyPayload = {};
    this.#mqtt = {};
    this.instances = [];
    this.instances.push(this);
    console.log("ESS INSTANCE INITIALIZED!");
  }

  #config;
  #payload;
  #dummyPayload;
  #mqtt;

  /**
   * @Member ESS Class
   * @Getter
   * @returns number of class instances
   */
  getInstances() {
    return this.instances;
  }

  /**
   * @Member ESS Class
   * @Promise
   * @param {Number} ms wait time Milliseconds
   * @description Promise that serves as delay between modbus readings
   */
  #wait = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

  /**
   * @Member ESS Class
   * @Method
   * @param {Boolean} flag flag to be checked
   * @returns the state of the flag
   */
  #check(flag) {
    return flag ? true : false;
  }

  /**
   * @Member ESS Class
   * @Getter
   * @description Getter that returns the current system configuration
   * @return System Configuration Object
   */
  getConfig() {
    return this.#config;
  }

  /**
   * @Member ESS Class
   * @Method
   * @description Method that resolves connection to the Google Provided MQTT Broker
   */
  #connectMQTT() {
    try {
      if (this.#check(this.#config.useMQTT)) {
        this.#mqtt = new MQTT(cfg.gcp_Config);
        this.#mqtt.connect();
        console.log("[ENABLED] [MQTT] functionality!");
        return true;
      } else {
        console.log("[DISABLED] [MQTT] functionality!");
        return false;
      }
    } catch (error) {
      console.log(new Error("[MQTT_ERROR] MQTT INIT ERROR!"));
    }
  }
  /**
   * @Member ESS Class
   * @Method
   * @description Method that publishes message to the Google Provided MQTT Broker
   */
  #publishMQTT() {
    try {
      this.#connectMQTT()
        ? this.#mqtt.publish(JSON.stringify(this.#payload, null, 2))
        : console.log("[MQTT] not connected!");
    } catch (error) {
      console.log(new Error("[MQTT_ERROR] MQTT CONNECTION ERROR!", error));
    }
  }
  /**
   * @Member ESS Class
   * @Method
   * @description Method that publishes message directly to the Google Provided Firestore Database
   */
  #publishDIRECT() {
    this.#check(this.#config.useDirectDBWrite)
      ? this.firestoreWrite(this.#config.collection, this.#payload)
      : console.log("[ENABLED] Direct DB Write!");
  }
  /**
   * @Member ESS Class
   * @Method
   * @param {Boolean} log log flag if true console.log ON
   * @description Method that creates a payload object according to the measured data
   */
  #createPayload(log) {
    try {
      console.log("Creating Payload!");
      this.#payload = createPyld();
      log ? console.log(this.#payload) : "";
    } catch (error) {
      console.log(
        new Error("[PAYLOAD_ERROR] ERROR DURING PAYLOAD CREATION!", error)
      );
    }
  }
  /**
   * @Member ESS Class
   * @Method
   * @param {Boolean} log log flag if true console.log ON
   * @description Method that creates a dummy payload according to the measured data
   */
  #createDummyPayload(log) {
    try {
      console.log("Creating Dummy Payload!");
      this.#dummyPayload = createDummyPyld();
      log ? console.log(this.#dummyPayload) : "";
    } catch (error) {
      console.log(
        new Error("[PAYLOAD_ERROR] ERROR DURING DUMMY PAYLOAD CREATION!", error)
      );
    }
  }
  /**
   * @Member ESS Class
   * @Method
   * @description Method that tests the contactors used in the system
   */
  #testContactors() {
    try {
      this.#check(this.#config.useContactors) ? this.#contactorTest1 : "";
    } catch (error) {
      console.log(new Error("ERROR DURING CONTACTOR TESTS!", error));
    }
  }
  /**
   * @Member ESS Class
   * @Method
   * @description Method that logs date and time everytime it is being called
   */
  #dateLOG() {
    console.log(`[${new Date(Date.now()).toLocaleString()}]`);
  }
  /**
   * @Member ESS Class
   * @Method
   * @description Method that logs out the actual number of used class instances
   */
  #instanceLOG() {
    try {
      if (this.#check(this.#config.useInstanceLOG)) {
        console.log("Number of ModbusMaster instances:", getMBinstances()[0]);
        console.log("Number of ornoModbus instance:", getMBinstances()[1]);
        this.#check(this.#config.useMQTTPublish)
          ? console.log("Number of MQTT instances", this.#mqtt.getInstances())
          : console.log("Number of MQTT instances", 0);
      } else {
        return;
      }
    } catch (error) {
      console.log(
        new Error("[LOGGING_ERROR] ERROR DURING INSTANCE LOGGING!", error)
      );
    }
  }
  /**
   * @Member ESS Class
   * @Method
   * @description Method that creates a log.json file according to the measured data
   */
  #createLOG() {
    try {
      this.#check(this.#config.useLOG)
        ? log(this.#payload)
        : console.log("[DISABLED] Logging functionality!");
    } catch (error) {
      console.log(
        new Error("[LOGGING_ERROR] ERROR DURING LOG FILE CREATION!", error)
      );
    }
  }
  /**
   * @Member ESS Class
   * @Method
   * @description Method that logs out the actual content of the Storage Object
   */
  #storageLOG() {
    try {
      this.#check(this.#config.useStorageLOG)
        ? console.log("Storage Object:", storage)
        : console.log("[DISABLED] Storage LOG functionality!");
    } catch (error) {
      console.log(
        new Error("[LOGGING_ERROR] ERROR DURING STORAGE LOGGING!", error)
      );
    }
  }
  /**
   * @Member ESS Class
   * @async
   * @Method
   * @description Method used for retrieving data from a given Modbus Device (Acrel ch1)
   */
  async #getDataAcrelCh1() {
    console.log("READING -> [ACREL CHANNEL 1]");
    if (this.#check(this.#config.useAcrelCh1)) {
      try {
        modbusReadHolding(
          acrel_iData,
          Acrel_Single_Config.ACREL_SINGLE_ADDRESS,
          Acrel_Single_Config.ACREL_SINGLE_WORD_COUNT,
          Acrel_Single_Config.ACREL_WAIT_MS
        );
        await this.#wait(1000).then(console.log("Wait accomplished!"));
      } catch (error) {
        console.log(new Error("[MODBUS_ERROR] ERROR ACREL CH1 READING", error));
      }
    } else {
      return;
    }
  }
  /**
   * @Member ESS Class
   * @async
   * @Method
   * @description Method used for retrieving data from a given Modbus Device (Acrel ch2)
   */
  async #getDataAcrelCh2() {
    console.log("READING -> [ACREL CHANNEL 2]");
    if (this.#check(this.#config.useAcrelCh2)) {
      try {
        modbusReadHolding(
          acrelD_iData,
          Acrel_Dual_Config.ACREL_DUAL_ADDRESS,
          Acrel_Dual_Config.ACREL_DUAL_WORD_COUNT,
          Acrel_Dual_Config.ACREL_DUAL_WAIT_MS
        );
        await this.#wait(1000).then(console.log("Wait accomplished"));
      } catch (error) {
        console.log(new Error("[MODBUS_ERROR] ERROR ACREL CH2 READING", error));
      }
    } else {
      return;
    }
  }
  /**
   * @Member ESS Class
   * @async
   * @Method
   * @description Method used for retrieving data from a given Modbus Device (Orno)
   */
  async #getDataOrno() {
    console.log("READING -> [ORNO]");
    if (this.#check(this.#config.useOrno)) {
      try {
        ornoModbusRead(
          orno_iData,
          Orno_Config.ORNO_ADDRESS,
          Orno_Config.ORNO_WORD_COUNT,
          Orno_Config.ORNO_WAIT_MS
        );
        await this.#wait(1000).then(console.log("Wait accomplished"));
      } catch (error) {
        console.log(new Error("[MODBUS_ERROR] ERROR ORNO READING", error));
      }
    } else {
      return;
    }
  }
  /**
   * @Member ESS Class
   * @async
   * @Method
   * @description Method used for retrieving data from a given Modbus Device (Battery)
   */
  async #getDataBattery() {
    console.log("READING -> [BATTERY]");
    if (this.#check(this.#config.useBattery)) {
      try {
        modbusReadInput(
          battery_iData,
          Battery_Config.BATTERY_ADDRESS,
          Battery_Config.BATTERY_WORD_COUNT,
          Battery_Config.BATTERY_WAIT_MS
        );
        await this.#wait(1000).then(console.log("Wait accomplished!"));
      } catch (error) {
        console.log(new Error("[MODBUS_ERROR] ERROR BATTERY READING", error));
      }
    } else {
      return;
    }
  }
  /**
   * @Member ESS Class
   * @Method
   * @param {String} device name of the device to retrive data from
   * @description Method used for retrieving cumulated/aggregated data from a specific Modbus Device
   */
  #getDeviceData(device) {
    switch (device) {
      case "ACREL_CH1":
        this.#getDataAcrelCh1(
          acrel_cumulated_iData,
          Acrel_Single_Config.ACREL_SINGLE_ADDRESS,
          Acrel_Single_Config.ACREL_SINGLE_WORD_COUNT,
          Acrel_Single_Config.ACREL_WAIT_MS
        );
        console.log("Stored Data:", storedData[0]);
        break;
      case "ACREL_CH2":
        this.#getDataAcrelCh2(
          acrel_cumulated_iData,
          Acrel_Dual_Config.ACREL_DUAL_ADDRESS,
          Acrel_Dual_Config.ACREL_DUAL_WORD_COUNT,
          Acrel_Dual_Config.ACREL_DUAL_WAIT_MS
        );
        console.log("Stored Data:", storedData[0]);
        break;
      case "ORNO":
        this.#getDataOrno(
          orno_iData,
          Orno_Config.ORNO_ADDRESS,
          Orno_Config.ORNO_WORD_COUNT,
          Orno_Config.ORNO_WAIT_MS
        );
        console.log("Stored Data:", storedData[0]);
        break;
      case "BATTERY":
        this.#getDataBattery(
          battery_basic_iData,
          Battery_Config.BATTERY_ADDRESS,
          Battery_Config.BATTERY_WORD_COUNT,
          Battery_Config.BATTERY_WAIT_MS
        );
        console.log("Stored Data:", storedData[1]);
        break;
      default:
        break;
    }
  }
  /**
   * @Member ESS Class
   * @async
   * @Method
   * @description Method used for testing contactors used in the system
   */
  async #contactorTest1() {
    console.log("TESTING CONTACTORS");
    try {
      console.log("Setting Contactors ON!");
      K1.setContactorOn();
      console.log("K1 ON!");
      await this.#wait(this.#config?.contactorDelay);
      K2.setContactorOn();
      console.log("K2 ON!");
      await this.#wait(this.#config?.contactorDelay);
      K3.setContactorOn();
      console.log("K3 ON!");
      await this.#wait(this.#config?.contactorDelay);
      K4.setContactorOn();
      console.log("K4 ON!");
      await this.#wait(this.#config?.contactorDelay);
      console.log("Setting Contactors OFF!");
      K4.setContactorOn();
      console.log("K4 OFF!");
      await this.#wait(this.#config?.contactorDelay);
      K3.setContactorOn();
      console.log("K3 OFF!");
      await this.#wait(this.#config?.contactorDelay);
      K2.setContactorOn();
      console.log("K2 OFF!");
      await this.#wait(this.#config?.contactorDelay);
      K1.setContactorOn();
      console.log("K1 OFF!");
      await this.#wait(this.#config?.contactorDelay);
      console.log("CONTACTOR TEST FINISHED!");
    } catch (error) {
      console.log(
        new Error("[CONTACTOR_ERROR] ERROR DURING CONTACTOR TEST #1", error)
      );
    }
  }
  /**
   * @Member ESS Class
   * @Method
   * @Interval
   * @description Method that executes the required actions
   */
  perform() {
    setInterval(async () => {
      console.log("Reading Data...");
      await this.#getDataAcrelCh1();
      await this.#getDataAcrelCh2();
      await this.#getDataOrno();
      await this.#getDataBattery();
      this.#createPayload();
      this.#publishMQTT();
      this.#publishDIRECT();
      this.#dateLOG();
      this.#createLOG();
      this.#instanceLOG();
      this.#storageLOG();
    }, cfg.MODBUS_READ_INTERVAL);
  }
}

module.exports = {
  ESS,
};
