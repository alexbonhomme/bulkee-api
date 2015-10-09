
var path = require('path');
var extend = require('util')._extend;

var local = require('./env/local');
var development = require('./env/development');
var production = require('./env/production');
var tests = require('./env/tests');

var defaults = {
  root: path.normalize(__dirname + '/..')
};

module.exports = {
  local: extend(local, defaults),
  development: extend(development, defaults),
  production: extend(production, defaults),
  tests: extend(tests, defaults)
}[process.env.NODE_ENV || 'development'];
