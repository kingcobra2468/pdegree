const { EventEmitter } = require('events');
const amqplib = require('amqplib/callback_api');
const protobuf = require('protobufjs');
const TemperaturePublisher = require('./publishers/temperature');

const exitEmitter = new EventEmitter();

process.on('SIGINT', () => {
  exitEmitter.emit('exit');
});

amqplib.connect('amqp://10.0.1.10', async (err, conn) => {
  if (err != null) process.exit(1);
  exitEmitter.on('exit', () => conn.close());

  const root = await protobuf.load('proto/temperature.proto');

  TemperaturePublisher(conn, root, exitEmitter);
});
