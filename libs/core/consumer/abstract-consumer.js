'use strict';

class AbstractConsumer {

    /**
     * 
     * @param {string} queueName
     * @param {array} bindings 
     */
    constructor(queueName, bindings) {
        this.queueName = queueName;
        this.bindings = bindings;
    }

    consume(message) {
        throw new Error('trigger method must be overriden');
    }
}

module.exports = AbstractConsumer;