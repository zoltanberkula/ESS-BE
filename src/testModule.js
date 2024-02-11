const { join, concat } = require("lodash");
const { converter } = require("javascript-binary-converter");
const { HexStringConverter } = require("javascript-binary-converter");
const { hex } = require("javascript-binary-converter/build/cjs/utils");

function hex2float(hb, lb) {
  const highByteStr = hb.toString(16);
  const lowByteStr = lb.toString(16);
  const word = concat(highByteStr, lowByteStr).join("");
  return new HexStringConverter(word).toFloat();
}

function getWH(wh) {
  return parseInt(wh, 16);
}

function getWH1(hb, lb) {
  console.log("HB", hb);
  console.log("LB", lb);
  const highByte16 = parseInt(hb, 16);
  const lowByte16 = parseInt(lb, 16);
  return parseInt(hb + lb, 16);
}

console.log(hex2float(545, 35));
console.log(hex2float(44, 5453));
console.log(hex2float(18, 54122));

console.log((38936 / 10).toFixed(2));
console.log(38936 / 100);

console.log(255 / 10);

console.log("Acrel Channel 1 HB: 63  LB: 684", getWH(68463));
console.log("Acrel Channel 1 HB: 535 LB: 54", getWH(53554));
console.log("Acrel CHannel 1 HB: 44  LB: 535", getWH(44535));
console.log("Acrel CHannel 1 HB: 535 LB: 44", getWH(53544));

console.log("Acrel Channel 1 HB: 54  LB: 535", getWH1(54, 535));
console.log("Acrel Channel 1 HB: 535 LB: 54", getWH1(535, 54));
console.log("Acrel CHannel 1 HB: 44  LB: 535", getWH1(44, 535));
console.log("Acrel CHannel 1 HB: 535 LB: 44", getWH1(535, 44));

console.log(hex2float(0x217, 0x36));
console.log(getWH1(0x217, 0x36));
console.log(getWH1(0x36, 0x217));

const { set } = require("lodash");
const serialPort = require("serialport");

serialPort.list().then((ports) => {
  ports.forEach((port) => {
    console.log("Port:", port);
  });
});

const port1SerialNumber = "A50285BI"; //COM4
const port2SerialNumber = "5&228c54a3&0&31"; //COM7
let portsAvailable = false;

async function portScan() {
  let ports = await serialPort.list();
  const scannerPort1 = ports.filter(
    (port) => port.serialNumber === port1SerialNumber
  );
  const scannerPort2 = ports.filter(
    (port) => port.serialNumber === port2SerialNumber
  );
  if (scannerPort1.length !== 0 && scannerPort2.length !== 0) {
    response = { Message: "Connected" };
    portsAvailable = true;
  } else {
    response = { Message: "Not Connected" };
    portsAvailable = false;
  }
  console.log(response);
  return;
}

let intervalID = null;
let cntr = 0;
let scanner = function () {
  if (!portsAvailable && cntr < 3) {
    portScan();
    cntr++;
  } else if (portsAvailable) {
    clearInterval(intervalID);
    console.log("Ports available!");
  }
};

intervalID = setInterval(scanner, 500);
intervalID = setInterval(scanner, 500);
