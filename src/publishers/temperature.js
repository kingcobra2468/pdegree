// const ds18b20 = require('../sensors/ds18b20')
//  .findSensorId();

const id = 'living_room';
const queue = 'temp';

const buildMessage = (ch, newTempMessage) => {
  const message = newTempMessage.create({ nodeId: id, tempValue: 50 });
  const buffer = newTempMessage.encode(message).finish();

  ch.sendToQueue(queue, buffer);
};

// '@sensors/ds18b20'
const publisher = (conn, root, emitter) => {
  conn.createChannel((err, ch) => {
    ch.assertQueue(queue);

    const NewTemperatureMessage = root.lookupType('rpist.temperature.NewTemperatureMessage');

    const cycle = setInterval(() => buildMessage(ch, NewTemperatureMessage), 5000);
    emitter.on('exit', () => {
      clearInterval(cycle);
    });
  });
};

module.exports = publisher;
