const Ds18b20 = require('./ds18b20');
const Dts = require('./dts');

/**
 * Factory for generating instances of different type
 * of sensors.
 * @throws Exception if sensor type is not a valid factory option
 * @param {string} sensorType Type of the sensor
 * @param  {...any} args Additional constructor args for the sensor
 * @returns Instance to the sensor if created successfully
 */
const create = (sensorType, ...args) => {
  switch (sensorType) {
    case 'dummy':
      return new Dts(...args);
    case 'ds18b20':
      return new Ds18b20(...args);
    default:
      throw Error('unknown sensor type');
  }
};

module.exports.create = create;
