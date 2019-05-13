'use strict';

var amqp = require('amqplib/callback_api');

const RabbitmqProducerInfo = require("../../model/rabbitmq/rabbitmq-producer-info");

class RabbitmqProducer {

    /**
     * 
     * @param {RabbitmqProducerInfo} rabbitmqProducerInfo 
     */
    constructor(rabbitmqProducerInfo) {
        this.rabbitmqProducerInfo = rabbitmqProducerInfo;

        amqp.connect(`amqp://${this.rabbitmqProducerInfo.host}:${this.rabbitmqProducerInfo.port}`, (err, connection) => {
            connection.createChannel((err, channel) => {
                channel.assertExchange(this.rabbitmqProducerInfo.exchangeName, 'topic', { durable: false });
                this.channel = channel;
            })
        });
    }

    /**
     * 
     * @param {string} routingKey 
     * @param {object} message 
     */
    send(routingKey, message) {
        this.channel.publish(this.rabbitmqProducerInfo.exchangeName, routingKey, Buffer.from(JSON.stringify(message)));
    }
}

module.exports = RabbitmqProducer;