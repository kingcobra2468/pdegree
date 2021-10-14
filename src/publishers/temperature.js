const sensor = require('@sensors/sensorFactory')
  .create(process.env.SENSOR);

const id = process.env.NODE_ID;
const queue = process.env.QUEUE;

/**
 * Serializes a temperature message and sends it to the queue.
 * @param {*} ch Rabbitmq channel that contains the queue
 * @param {*} newTempMessage Protobuf reference object used for protobuf serialization
 */
const buildMessage = async (ch, newTempMessage) => {
  const message = newTempMessage.create(
    { nodeId: id, tempValue: await sensor.getCelsius(), scale: 0 },
  );
  const buffer = newTempMessage.encode(message).finish();

  ch.sendToQueue(queue, buffer);
};

/**
 * Temperature Publisher for pushing new temperature readings into the queue.
 * @param {*} conn Active Rabbitmq connection over AMQP
 * @param {*} root Object behind the root protobuf scope
 * @param {*} emitter Listener for process lifecycle events
 */
const publisher = (conn, root, emitter) => {
  conn.createChannel((err, ch) => {
    if (err != null) throw err;
    ch.assertQueue(queue);

    const NewTemperatureMessage = root.lookupType('rpist.temperature.NewTemperatureMessage');

    const cycle = setInterval(async () => buildMessage(ch, NewTemperatureMessage), 5000);
    emitter.on('exit', () => {
      clearInterval(cycle);
    });
  });
};

module.exports = publisher;
