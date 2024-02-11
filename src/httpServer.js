const { createServer } = require("http");
const data = require("../log.json");

const testObj = {
  name: "Laci",
  age: "32",
};

const dataJSON = JSON.stringify(data, null, 2);

/**
 * @Member httpServer Module
 * @description a http server that provides JSON data
 */
const server = createServer((request, response) => {
  response.writeHead(200, { "Content-Type": "text/html" });
  response.write("<h1>ESS DATA</h1>");
  response.write(`[${dataJSON}`);
  return response.end();
});

/**
 * @Member httpServer Module
 * @description http listener
 */
server.listen(8080);
