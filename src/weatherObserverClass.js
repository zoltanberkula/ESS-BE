const weather = require("openweather-apis");
const { API_KEY } = require("./config.js");

/**
 * @Class
 * @description WeatherObserver Class
 */
class WeatherObserver {
  /**
   * @Member WeatherObserver Class
   * @Constructor
   * @param {any} city city/location
   * @param {any} unit unit
   */
  constructor(city, unit) {
    this.city = city;
    this.unit = unit;
    this.ownKey = "";
    this.weatherData = {};
    this.JSONObj = {};
    weather.setLang("en");
    weather.setCity(city);
    weather.setUnits(unit);
    weather.setAPPID(this.ownKey);
    this.instances = [];
    this.instances.push(this);
  }

  /**
   * @Member WeatherObserver Class
   * @Getter
   * @returns number of class instances
   */
  getInstances = () => {
    return this.instances;
  };

  /**
   * @Member WeatherObserver Class
   * @Method
   * @returns object containing location specific weather data
   */
  getWeather() {
    let data = {};
    weather.getAllWeather(function (err, JSONObj) {
      data = JSONObj;
      console.log(data);
    });
  }

  /**
   * @Member WeatherObserver Class
   * @Method
   * @returns object containing specified location specific weather data
   */
  getWeatherData() {
    console.log(this);
    return this.weatherData;
  }
}

module.exports = {
  WeatherObserver,
};

const whObserver = new WeatherObserver("moscow", "Celsius");
whObserver.getWeather();
