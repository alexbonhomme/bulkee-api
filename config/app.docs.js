'use strict';

var _ = require('lodash');
var requireDir = require('require-dir');
var paths = {};
var definitions = {};

_.forEach(requireDir('./docs'), function (path) {
  _.assign(paths, path.paths);
  _.assign(definitions, path.definitions);
});

module.exports = function(config) {
  return {
    swagger: '2.0',
    info: {
      version: '1.0'
    },
    host: config.server.url.replace('http://', ''),
    schemes: ['http'],
    consumes: [
      'application/json'
    ],
    produces: [
      'application/json'
    ],
    tags: [
      {name: 'user'}
    ],
    paths: paths,
    definitions: definitions
  };
};

