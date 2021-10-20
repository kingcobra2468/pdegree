// eslint-disable-next-line import/no-extraneous-dependencies
const { EventEmitter } = require('events');
const amqplib = require('amqplib/callback_api');
const fs = require('fs');
const protobuf = require('protobufjs');
const TemperaturePublisher = require('@publishers/temperature');

const exitEmitter = new EventEmitter();
const opts = {
  cert: fs.readFileSync(process.env.CLIENT_CERT_PATH),
  key: fs.readFileSync(process.env.CLIENT_KEY_PATH),
  passphrase: process.env.CLIENT_CERT_PASSWORD,
  ca: [fs.readFileSync(process.env.CA_CERT_PATH)],
};

/**
 * Signal listner for Control + C events.
 */
process.on('SIGINT', () => {
  exitEmitter.emit('exit');
});

amqplib.connect(`amqps://${process.env.RABBITMQ_ADDRESS}:${process.env.RABBITMQ_PORT}`, opts, async (err, conn) => {
  if (err != null) throw err;
  const root = await protobuf.load('proto/temperature.proto');

  exitEmitter.on('exit', () => conn.close());
  TemperaturePublisher(conn, root, exitEmitter);
});
