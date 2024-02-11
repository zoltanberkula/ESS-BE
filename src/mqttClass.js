const mqtt = require("mqtt");
const jwt = require("jsonwebtoken");
const fs = require("fs");
const { gcp_Config, MQTT_Config } = require("./config.js");

/**
 * @Class
 * @description MQTT Class
 */
class MQTT {
  /**
   * @Member MQTT Class
   * @Constructor
   * @param {String} projectId    GCP project-id
   * @param {String} deviceId     GCP IoT Core device-id
   * @param {String} registryId   GCP IoT Core registry-id
   * @param {String} region       GCP IoT Core region
   */
  constructor({ PROJECT_ID, DEVICE_ID, REGISTRY_ID, REGION }) {
    this.projectId = PROJECT_ID;
    this.deviceId = DEVICE_ID;
    this.registryId = REGISTRY_ID;
    this.region = REGION;
    this.mqttClientId = this.createId(
      this.projectId,
      this.region,
      this.registryId,
      this.deviceId
    );
    this.mqttTopic = this.createTopic(this.deviceId, this.messageType);
    this.connectionArgs = {
      host: this.mqttBridgeHostname,
      port: this.mqttBridgePort,
      clientId: this.mqttClientId,
      username: MQTT_Config.USERNAME,
      password: this.createJwt(
        this.projectId,
        this.privateKeyFile,
        this.algorithm
      ),
      protocolId: MQTT_Config.PROTOCOL_ID,
      protocolVersion: MQTT_Config.PROTOCOL_VERSION,
      protocol: MQTT_Config.PROTOCOL,
      clean: false,
    };
    this.instances = [];
    this.instances.push(this);
  }

  /**
   * @Member MQTT Class
   * @Getter
   * @returns number of class instances
   */
  getInstances = () => {
    return this.instances.length;
  };

  /**
   * @Member MQTT Class
   * @Method
   * @param {String} projectId
   * @param {String} region
   * @param {String} registryId
   * @param {String} deviceId
   * @returns mqttClientId
   */
  createId = (projectId, region, registryId, deviceId) => {
    let cId = `projects/${projectId}/locations/${region}/registries/${registryId}/devices/${deviceId}`;
    return cId;
  };

  /**
   * @Member MQTT Class
   * @Method
   * @param {string} deviceId
   * @param {string} messageType
   * @returns mqttTopic
   */
  createTopic = (deviceId, messageType) => {
    let topic = `/devices/${deviceId}/${messageType}`;
    return topic;
  };

  /**
   * @Member MQTT Class
   * @description property value assignment
   */
  algorithm = gcp_Config.ALGORITHM;
  privateKeyFile = gcp_Config.PRIVATE_KEY_FILE;
  mqttBridgeHostname = gcp_Config.MQTT_BRIDGE_HOSTNAME;
  mqttBridgePort = gcp_Config.MQTT_BRIDGE_PORT;
  messageType = gcp_Config.MESSAGE_TYPE;
  mqttClientId = this.mqttClientId;
  mqttTopic = this.mqttTopic;

  /**
   * @Member MQTT Class
   * @Method
   * @param {string} projectId
   * @param {string} privateKeyFile
   * @param {string} algorithm
   * @returns jsonwebtoken signature as a password for authentication
   */
  createJwt = (projectId, _privateKeyFile, algorithm) => {
    const token = {
      iat: parseInt(Date.now() / 1000),
      exp: parseInt(Date.now() / 1000) + 20 * 60,
      aud: projectId,
    };
    const privateKey = fs.readFileSync(_privateKeyFile);
    return jwt.sign(token, privateKey, { algorithm: algorithm });
  };

  /**
   * @Member MQTT Class
   * @Method
   * @description method for connecting to the Google Provided MQTT Broker
   */
  connect = () => {
    this.client = mqtt.connect(this.connectionArgs);
    this.client.on("connect", (success) => {
      console.log(
        `Successfully connected to ${this.mqttBridgeHostname} on port ${this.mqttBridgePort}`
      );
      if (!success) {
        console.error("Connection failed!");
      }
    });
    this.client.on("error", (err) => console.log(err));
    this.client.on("close", (err) => {
      console.error("Mqtt reconnecting!", err);
    });
  };

  /**
   * @Member MQTT Class
   * @Method
   * @param {String} payload The message to be published via MQTT
   */
  publish = (payload) => {
    console.log("Publishing message over MQTT:", payload);
    this.client.publish(this.mqttTopic, payload, { qos: 1 }, (err) => {
      if (err) {
        console.log("Publishing error", err);
      }
    });
  };
}

module.exports = {
  MQTT: MQTT,
};
