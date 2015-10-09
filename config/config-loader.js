'use strict';

var _ = require('lodash');
var path = require('path');

process.env.NODE_ENV = process.env.NODE_ENV || 'development';

module.exports = {
  load: function (opts) {
    opts = opts || {};

    var env = opts.env || process.env.NODE_ENV;

    var configFiles = [
      path.join(__dirname, 'env', env),
      path.join(__dirname, 'env/default')
    ];

    var configs = configFiles.map(function (file) {
      return require(file);
    });

    defaults.apply(null, configs);
    return _.first(configs);
  },

  defaults: defaults

};

var defaults = function(obj, source) {
  var args = arguments;
  obj = obj || {};

  Object.keys(args).slice(1).forEach(function (num) {
    source = args[num];

    _.forEach(source, function (prop, key) {

      if (_.isPlainObject(prop)) {

        if (!_.isPlainObject(obj[key])) {obj[key] = {};}
        defaults(obj[key], prop);

      } else if (obj[key] === undefined) {
        obj[key] = prop;
      }
    });
  });

  return obj;
};
