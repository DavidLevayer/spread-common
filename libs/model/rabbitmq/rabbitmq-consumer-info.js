'use strict';

class RabbitmqConsumerInfo {

    /**
     * 
     * @param {string} host 
     * @param {number} port 
     * @param {string} exchangeName
     */
    constructor(host, port, exchangeName, queueName, bindings) {
        this.host = host;
        this.port = port;
        this.exchangeName = exchangeName;
    }
}

module.exports = RabbitmqConsumerInfo;