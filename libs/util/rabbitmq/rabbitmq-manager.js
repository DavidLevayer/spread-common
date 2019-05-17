'use strict';

var amqp = require('amqplib/callback_api');

const RabbitmqInfo = require("../../model/rabbitmq/rabbitmq-info");
const RabbitmqConsumer = require('./rabbitmq-consumer');
const RabbitmqProducer = require('./rabbitmq-producer');
const AbstractConsumer = require("../../core/consumer/abstract-consumer");

class RabbitmqManager {

    /**
     * 
     * @param {RabbitmqInfo} rabbitmqInfo
     */
    constructor(rabbitmqInfo) {
        this.rabbitmqInfo = rabbitmqInfo;
        this.consumers = [];
        this.producers = [];
    }

    /**
     * 
     * @param {AbstractConsumer} rabbitmqConsumer 
     */
    addConsumer(abstractConsumer) {
        let rabbitmqConsumer = new RabbitmqConsumer(this.rabbitmqInfo);

        // TODO use promise instead
        // Wait for channel creation
        setTimeout(() => {
            rabbitmqConsumer.setConsumer(abstractConsumer);
        }, 1000);
        
        this.consumers.push(rabbitmqConsumer);
    }

    createProducer() {
        let rabbitmqProducer = new RabbitmqProducer(this.rabbitmqInfo);
        this.producers.push(rabbitmqProducer);

        return rabbitmqProducer;
    }
}

module.exports = RabbitmqManager;