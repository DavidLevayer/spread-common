'use strict';

var amqp = require('amqplib/callback_api');

const RabbitmqInfo = require("../../model/rabbitmq/rabbitmq-info");

class RabbitmqProducer {

    /**
     * 
     * @param {RabbitmqInfo} rabbitmqInfo 
     */
    constructor(rabbitmqInfo) {
        this.rabbitmqInfo = rabbitmqInfo;

        amqp.connect(`amqp://${this.rabbitmqInfo.host}:${this.rabbitmqInfo.port}`, (err, connection) => {
            connection.createChannel((err, channel) => {
                channel.assertExchange(this.rabbitmqInfo.exchangeName, 'topic', { durable: false });
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
        this.channel.publish(this.rabbitmqInfo.exchangeName, routingKey, Buffer.from(JSON.stringify(message)));
    }
}

module.exports = RabbitmqProducer;