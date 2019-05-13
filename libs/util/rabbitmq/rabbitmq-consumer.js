'use strict';

var amqp = require('amqplib/callback_api');

const RabbitmqConsumerInfo = require("../../model/rabbitmq/rabbitmq-consumer-info");
const AbstractConsumer = require("../../core/consumer/abstract-consumer");

class RabbitmqConsumer {

    /**
     * 
     * @param {RabbitmqConsumerInfo} rabbitmqConsumerInfo 
     */
    constructor(rabbitmqConsumerInfo) {
        this.rabbitmqConsumerInfo = rabbitmqConsumerInfo;

        amqp.connect(`amqp://${this.rabbitmqConsumerInfo.host}:${this.rabbitmqConsumerInfo.port}`, (err, connection) => {
            connection.createChannel((err, channel) => {
                channel.assertExchange(this.rabbitmqConsumerInfo.exchangeName, 'topic', { durable: false });
                this.channel = channel;
            })
        });
    }

    /**
     * 
     * @param {AbstractConsumer} abstractConsumer 
     */
    setConsumer(abstractConsumer) {
        this.channel.assertQueue(abstractConsumer.queueName, { durable: false }, (err, q) => {
            if(err) {
                throw err;
            }                    
            abstractConsumer.bindings.forEach((binding) => {
                this.channel.bindQueue(q.queue, this.rabbitmqConsumerInfo.exchangeName, binding);
            });
            this.channel.consume(q.queue, (message) => {
                abstractConsumer.consume(message);
                this.channel.ack(message);
            });
        });
        
    }
}

module.exports = RabbitmqConsumer;