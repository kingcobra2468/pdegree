// eslint-disable-next-line import/no-extraneous-dependencies
const { EventEmitter } = require('events');
const amqplib = require('amqplib/callback_api');
const protobuf = require('protobufjs');
const TemperaturePublisher = require('./publishers/temperature');

const exitEmitter = new EventEmitter();

process.on('SIGINT', () => {
  exitEmitter.emit('exit');
});

amqplib.connect('amqp://10.0.1.10', async (err, conn) => {
  if (err != null) throw err;
  const root = await protobuf.load('proto/temperature.proto');

  exitEmitter.on('exit', () => conn.close());
  TemperaturePublisher(conn, root, exitEmitter);
});
