const fs = require('fs');
const path = require('path');
const BaseSensor = require('./baseSensor');

/**
 * Driver for reading temperature data from ds18b20
 * temperature sensor.
 */
class Ds18b20 extends BaseSensor {
  /**
   * Initializes instance of sensor reader.
   * @param {string} [devicePath='/sys/bus/w1/devices/'] Path to device
   */
  constructor(devicePath = '/sys/bus/w1/devices/') {
    super();
    this.devicePath = devicePath;
    this.findSensorId();
  }

  /**
   * Attempts to find the sensor id at the directory specified
   * by the constructor.
   * @throws Exception when there is a failure is finding the sensor
   */
  findSensorId() {
    const scanner = RegExp('28-*'); // Signature of sensor.

    const files = fs.readdirSync(this.devicePath);
    this.sensorId = files.find((file) => scanner.test(file));
    if (this.sensorId == null) {
      throw new Error('Thermometer not found.');
    }
  }

  /**
   * Retrives the sensor id of the sensor.
   */
  get id() {
    return this.sensorId;
  }

  /**
   * Retrieves the "raw" temperature value from the sensor. Note
   * the raw value is in Celsius.
   * @async
   * @throws Exception if there is a failure to read temperature data
   * @returns {int} temperature
   */
  async getRawTemp() {
    const dataStream = path.join(this.devicePath, this.sensorId, 'temperature');

    return fs.promises.readFile(dataStream)
      .then((data) => {
        const temperature = parseInt(data.toString(), 10) / 1000;

        return temperature;
      })
      .catch((_) => {
        throw new Error('Unable to parse temperature stream.');
      });
  }
}

module.exports = Ds18b20;
