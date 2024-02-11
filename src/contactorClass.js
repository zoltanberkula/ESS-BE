const GPIO = require("onoff").Gpio;
const { GPIO_Config } = require("./config.js");

class Contactor {
  /**
   * @Member Contactor Class
   * @param {number} pin the GPIO pin the contactor is attached to
   */
  constructor(pin, name) {
    (this.pin = pin), (this.contactor = new GPIO(pin, "out"));
    this.name = name;
    this.contactorState = null;
    this.isLocked = null;
    this.instances = [];
    this.instances.push(this);
  }

  /**
   * @Member Contactor Class
   * @Getter
   * @returns number of class instances
   */
  getInstances = () => {
    return this.instances;
  };

  /**
   * @Member Contactor Class
   * @description A function responsible for getting back the actual state of the given contactor
   * @returns the actual state of the contactor
   */
  getContactorState = () => {
    try {
      this.contactorState = this.contactor.readReadSync();
    } catch (error) {
      console.error("Error during retrieving Contactor state", error);
    }
    //return this.contactorState;
    return this.isLocked;
  };

  /**
   * @Member Contactor Class
   * @description A function responsible for setting the contactor's state to ON | HIGH
   * @returns the actual state of the contactor
   */
  setContactorOn = () => {
    try {
      console.log("Contactor LOCKED:", this.contactor._gpio);
      this.contactor.writeSync(this.contactor.readSync() ^ 1);
      this.isLocked = true;
    } catch (error) {
      console.error("Error setting Contactor ON!", error);
    }
    //return this.contactorState;
    return this.isLocked;
  };

  /**
   * @Member Contactor Class
   * @description A function responsible for setting the contactor's state to OFF | LOW
   * @returns the actual state of the contactor
   */
  setContactorOff = () => {
    try {
      console.log("Contactor DISLOCKED:", this.contactor._gpio);
      this.contactor.writeSync(this.contactor.readSync() ^ 1);
      this.isLocked = false;
    } catch (error) {
      console.error("Error setting Contactor OFF!", error);
    }
    //return this.contactorState;
    return this.isLocked;
  };
}

module.exports = {
  Contactor,
};
