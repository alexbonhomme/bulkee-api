'use strict';

var assert = require('assert');
var mongoose = require('mongoose');
var Bluebird = require('bluebird');

mongoose.timestampPlugin = require('./plugins/mongoose-timestamp');

Bluebird.promisifyAll(mongoose);

module.exports = {

  connect: function(config) {
    var self = this;
    if (mongoose.connection.readyState) {
      return;
    }

    assert(config && config.url, '"config.mongo.url" is required');

    mongoose.connection.on('error', function(err) {
      console.error('MongoError:', err.message); // TODO Use logger
    });

    mongoose.connection.once('open', function() {
      console.log('Connected to MongoDB : ' + config.url); // TODO Use logger
    });

    process.once('SIGUSR2', self.close('SIGUSR2'));
    process.once('SIGINT', self.close('SIGINT'));
    process.once('SIGTERM', self.close('SIGTERM'));
    mongoose.set('debug', config.debug);

    var options = {};
    options.server = options.replset = {};
    options.server.socketOptions = options.replset.socketOptions = {
      keepAlive: 1
    };
    options.server.socketOptions.connectTimeoutMS = options.replset.socketOptions.connectTimeoutMS = 30000;

    mongoose.connect(config.url, options);
  },
  close: function(signal) {
    return function() {
      mongoose.connection.close(function() {
        console.log('Mongoose connection closed'); // TODO Use logger
        process.kill(process.pid, signal);
      });
    };
  }
};
