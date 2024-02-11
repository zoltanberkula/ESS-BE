const http = require("http");
const config = require("./config.js");
const { networkInterfaces } = require("os");
const { result } = require("lodash");
const { OpenVPN_Config } = require("./config.js");

/**
 * @Member vpnLogin Module
 * @Function
 * @returns network interface instances based on the statement: IPv4 && !internal
 */
function getOpenVPNAddress() {
  const nets = networkInterfaces();
  const results = Object.create(null);
  for (const name of Object.keys(nets)) {
    for (const net of nets[name]) {
      if (net.family === "IPv4" && !net.internal) {
        if (!results[name]) {
          results[name] = [];
        }
        results[name].push(net.address);
      }
    }
  }
  return results;
}

/**
 * @Member vpnLogin Module
 * @Function
 * @decription function that creates a data object containing necessary vpn data
 */
function vpnLogin() {
  const data = JSON.stringify({
    name: OpenVPN_Config.name,
    id: OpenVPN_Config.id,
    ip: getOpenVPNAddress(),
  });

  /**
   * @Member vpnLogin Module
   * @label VPN options
   */
  const options = {
    hostname: `${OpenVPN_Config.utilServerAddress}`,
    port: OpenVPN_Config.utilServerPort,
    path: "/login",
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Content-Length": data.length,
    },
  };

  /**
   * @Member vpnLogin Module
   * @Request POST
   * @label post request to the given endpoint, containing vpn options
   */
  const req = http.request(options, (res) => {
    res.on("data", () => {});
  });
  req.on("error", (error) => {});
  req.write(data);
  req.end();
}

/**
 * @Member vpnLogin Module
 * @label immediately invoked function that keeps the vpn connection alive
 */
(() => vpnLogin())();
setInterval(() => vpnLogin(), 60000);
