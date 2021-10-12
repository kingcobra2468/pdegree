const Ds18b20 = require('./ds18b20');
const Dts = require('./dts');

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
