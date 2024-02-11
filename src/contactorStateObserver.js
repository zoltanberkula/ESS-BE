const cfg = require("./config.js");
const { Contactor } = require("./contactorClass.js");

const K1 = new Contactor(cfg.Contactor_Config.CONTACTOR_PIN_1, "K1");
const K2 = new Contactor(cfg.Contactor_Config.CONTACTOR_PIN_2, "K2");
const K3 = new Contactor(cfg.Contactor_Config.CONTACTOR_PIN_3, "K3");
const K4 = new Contactor(cfg.Contactor_Config.CONTACTOR_PIN_4, "K4");

/**
 * @Member contactorStateObserver Module
 * @returns states of the contactors
 */
function contactorStateObserver() {
  let contactorInstances = K1.getInstances();
  let contactorStates = {};
  for (let inst = 0; inst <= contactorInstances.length; inst++) {
    contactorStates[inst.name] = inst.getContactorState();
  }
  return contactorStates;
}

let contactorStatusObj = contactorStateObserver();

module.exports = {
  K1: K1,
  K2: K2,
  K3: K3,
  K4: K4,
  contactorStateObserver: contactorStateObserver,
  contactorStatusObj: contactorStatusObj,
};
