/* eslint-disable class-methods-use-this */
/**
 * Base class for developing sensor drivers.
 */
class BaseSensor {
  /**
   * Retrieves the "raw" temperature value from the sensor. Note
   * the raw value is in Celsius.
   * @abstract
   * @async
   * @throws Exception if there is a failure to read temperature data
   * @returns {int} temperature
   */
  async getRawTemp() {
    throw new Error('Abstract Method');
  }

  /**
   * Retrieves the temperature(C) value from the sensor.
   * @async
   * @throws Exception if there is a failure to read temperature data
   * @returns {int} temperature
   */
  async getCelsius() {
    const temp = await this.getRawTemp();

    return temp;
  }

  /**
   * Retrieves the temperature(F) value from the sensor.
   * @async
   * @throws Exception if there is a failure to read temperature data
   * @returns {int} temperature
   */
  async getFahrenheit() {
    const temp = await this.getRawTemp();

    return (temp * (9 / 5)) + 32;
  }

  /**
   * Retrieves the temperature(K) value from the sensor.
   * @async
   * @throws Exception if there is a failure to read temperature data
   * @returns {int} temperature
   */
  async getKelvin() {
    const temp = await this.getRawTemp();

    return temp + 273.15;
  }
}

module.exports = BaseSensor;
