/* eslint-disable class-methods-use-this */
const BaseSensor = require('./baseSensor');

/**
 * Dummy temperature sensor (DTS) for testing when physical sensor
 * is not present.
 */
class Dts extends BaseSensor {
  /**
   * Generates random temperature value.
   * @async
   * @throws Exception if there is a failure to read temperature data
   * @returns {int} temperature
   */
  async getRawTemp() {
    return Math.floor(Math.random() * (150) - 50);
  }
}

module.exports = Dts;
