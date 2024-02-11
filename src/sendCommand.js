const { gcp_Config } = require("./config.js");
const iot = require("@google-cloud/iot");
const iotClient = new iot.v1.DeviceManagerClient({});

let commandMessage = "THIS IS A TEST MESSAGE";

/**
 * @Member sendCommand Module
 * @description
 */
async function sendCommand() {
  const formattedName = iotClient.devicePath(
    gcp_Config.PROJECT_ID,
    gcp_Config.REGION,
    gcp_Config.REGISTRY_ID,
    gcp_Config.DEVICE_ID
  );

  const binaryData = Buffer.from(commandMessage);

  const request = {
    name: formattedName,
    binaryData: binaryData,
  };

  console.log("Message to be sent:", commandMessage);
  const [response] = await iotClient.sendCommandToDevice(request);
  console.log("Sent command: ", response);
}

module.exports = {
  sendCommand: sendCommand,
};
