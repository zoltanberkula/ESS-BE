module.exports = config = {
  /**
   * @Member config Module
   * @description ESS device configuration
   */
  Device_Config: {
    DEVICE_NAME: "MTH_ESS",
    DEVICE_TYPE: "ESS",
    DEVICE_ID: "01",
  },
  /**
   * @Member config Module
   * @description ESS system configuration
   */
  System_Config: {
    useModbus: true,
    useAcrelCh1: true,
    useAcrelCh2: false,
    useOrno: true,
    useBattery: false,
    useDirectDBWrite: false,
    useMQTTPublish: false,
    useContactors: false,
    testContactors: false,
    useLOG: true,
    useInstanceLOG: true,
    useStorageLOG: true,
    collection: "ESS-DATA",
    testCollection: "DUMMY-ESS-DATA",
    waitTimeMS: 1000,
    contactorDelay: 2000,
  },
  /**
   * @Member config Module
   * @description default modbus serial configuration
   */
  Default_Modbus_Config: {
    SERIAL_PORT: "COM4",
    BAUD_RATE: 9600,
    STOP_BIT: 1,
    START_BIT: 0,
    PARITY: "none", //KEEP IN MIND EMD ORNO USES EVEN PARITY
    AUTO_OPEN: false,
    MODBUS_ID: 1,
  },
  /**
   * @Member config Module
   * @description orno modbus serial configuration
   */
  Orno_Modbus_Config: {
    SERIAL_PORT: "COM5",
    BAUD_RATE: 9600,
    STOP_BIT: 1,
    START_BIT: 0,
    PARITY: "even",
    AUTO_OPEN: false,
    MODBUS_ID: 2,
  },
  /**
   * @Member config Module
   * @description Google Cloud configuration
   */
  gcp_Config: {
    PROJECT_ID: "energystoragesystem",
    DEVICE_ID: "ESS_1",
    REGISTRY_ID: "ess-registry",
    REGION: "europe-west1",
    ALGORITHM: "RS256",
    PRIVATE_KEY_FILE: "./keys/rsa_private.pem",
    MQTT_BRIDGE_HOSTNAME: "mqtt.googleapis.com",
    MQTT_BRIDGE_PORT: 8883,
    MESSAGE_TYPE: "events",
  },
  /**
   * @Member config Module
   * @description MQTT configuration
   */
  MQTT_Config: {
    USERNAME: "unused",
    PROTOCOL_ID: "MQTT",
    PROTOCOL: "mqtts",
    PROTOCOL_VERSION: 4,
  },
  /**
   * @Member config Module
   * @description Acrel CH1 DC EMD configuration
   */
  Acrel_Single_Config: {
    ACREL_SINGLE_ADDRESS: 1,
    ACREL_SINGLE_WORD_COUNT: 1,
    ACREL_WAIT_MS: 10,
    ACREL_NAME: "ACREL_DJSF1352-RN",
    DEVICE_TYPE: "DC_ENERGY_METER",
  },
  /**
   * @Member config Module
   * @description Acrel CH2 DC EMD configuration
   */
  Acrel_Dual_Config: {
    ACREL_DUAL_ADDRESS: 3,
    ACREL_DUAL_WORD_COUNT: 1,
    ACREL_DUAL_WAIT_MS: 10,
    ACREL_DUAL_NAME: "ACREL_DJSF1352_RN",
    DEVICE_TYPE: "DC_ENERGY_METER",
  },
  /**
   * @Member config Module
   * @description Orno AC EMD configuration
   */
  Orno_Config: {
    ORNO_ADDRESS: 1,
    ORNO_WORD_COUNT: 8,
    ORNO_WAIT_MS: 10,
    ORNO_NAME: "ORNO_WE_516",
    DEVICE_TYPE: "3P_AC_ENERGY_METER",
    //KEEP IN MIND THAT THE PARITY ON ORNO DEVICES CANNOT BE MODIFIED!!//
  },
  /**
   * @Member config Module
   * @description GSO Battery configuration
   */
  Battery_Config: {
    BATTERY_ADDRESS: 1, //Cannot be changed
    BATTERY_WORD_COUNT: 1,
    BATTERY_WAIT_MS: 10,
    BATTERY_NAME: "GSO_GBP384300",
    DEVICE_TYPE: "LiFePO4_BATTERY_PACK",
  },
  /**
   * @Member config Module
   * @description Lumel AC EMD configuration
   */
  Lumel_Config: {
    LUMEL_ADDRESS: 3,
    LUMEL_WORD_COUNT: 2,
    LUMEL_WAIT_MS: 10,
    LUMEL_NAME: "LUMEL_NMID30-1",
    DEVICE_TYPE: "3P_ENERGY_METER",
  },
  /**
   * @Member config Module
   * @description Contactor configuration
   */
  Contactor_Config: {
    CONTACTOR_PIN_1: 5, //RPi3 GPIO 05 //BW Controller and BMS
    CONTACTOR_PIN_2: 6, //RPi3 GPIO 06 //BW Inverter and Grid
    CONTACTOR_PIN_3: 17, //RPi3 GPIO 17 //
    CONTACTOR_PIN_4: 27, //RPi3 GPIO 27 //
  },
  /**
   * @Member config Module
   * @description Weather Observer configuration
   */
  Weather_Observer_Config: {
    URL: "",
    API_KEY: "",
    LANG: "en",
    UNIT: "metric",
  },
  /**
   * @Member config Module
   * @description LOG functionality configuration
   */
  Log_Config: {
    LOG_FILE_NAME: "log.json",
  },
  /**
   * @Member config Module
   * @description VPN configuration
   */
  OpenVPN_Config: {
    name: "ESS-PI",
    id: 1,
    vendor: "MT",
    utilServerAddress: "",
    utilServerPort: 3005, //get device list
  },

  MODBUS_READ_INTERVAL: 2500,
  MODBUS_READ_TIMEOUT: 2000,
};
