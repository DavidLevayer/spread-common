const RabbitmqProducerInfo = require('./libs/model/rabbitmq/rabbitmq-producer-info');
const RabbitmqConsumerInfo = require('./libs/model/rabbitmq/rabbitmq-consumer-info');

const RabbitmqProducer = require('./libs/util/rabbitmq/rabbitmq-producer');
const RabbitmqConsumer = require('./libs/util/rabbitmq/rabbitmq-consumer');

exports.RabbitmqProducerInfo = RabbitmqProducerInfo;
exports.RabbitmqConsumerInfo = RabbitmqConsumerInfo;

exports.RabbitmqProducer = RabbitmqProducer;
exports.RabbitmqConsumer = RabbitmqConsumer;
