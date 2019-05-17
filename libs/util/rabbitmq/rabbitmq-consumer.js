'use strict';

var amqp = require('amqplib/callback_api');

const RabbitmqInfo = require("../../model/rabbitmq/rabbitmq-info");
const AbstractConsumer = require("../../core/consumer/abstract-consumer");

class RabbitmqConsumer {

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
     * @param {AbstractConsumer} abstractConsumer 
     */
    setConsumer(abstractConsumer) {
        this.channel.assertQueue(abstractConsumer.queueName, { durable: false }, (err, q) => {
            if(err) {
                throw err;
            }                    
            abstractConsumer.bindings.forEach((binding) => {
                this.channel.bindQueue(q.queue, this.rabbitmqInfo.exchangeName, binding);
            });
            this.channel.consume(q.queue, (message) => {
                abstractConsumer.consume(message);
                this.channel.ack(message);
            });
        });
        
    }
}

module.exports = RabbitmqConsumer;