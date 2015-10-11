'use strict';

var keenio = require('express-keenio');
var logger = require('morgan');
var assert = require('assert');
var express = require('express');
var cors = require('cors');
var bodyParser = require('body-parser');
var compression = require('compression');
var mongoose = require('./mongoose');
var injector = require('./injector');
var validateRequest = require('./middlewares/validateRequest');
var http = require('http');
var path = require('path');
require('./plugins/express-promise');

module.exports = function (config) {
  assert(config, 'config is required');

  mongoose.connect(config.mongo);

  var port = config.server.port;
  var app = express();
  http.Server(app);
  app.disable('x-powered-by');
  app.set('json spaces', config.debug ? 2 : 0);
  app.all('/*', function(req, res, next) {
    // CORS headers
    // restrict it to the required domain
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
    // Set custom headers for CORS
    res.header('Access-Control-Allow-Headers', 'Content-type,Accept,X-Access-Token,X-Key');
    if (req.method === 'OPTIONS') {
        res.status(200).end();
    } else {
        next();
    }
  });

  app.use(logger('dev'));
  app.use(cors());
  app.use(compression());
  app.use(bodyParser.urlencoded({extended: false}));
  app.use(bodyParser.json());
  app.use('/explorer', createSwaggerApp());

  app.use(function(req, res, next) {
    if (process.env.NODE_IS_CLOSING !== 'false') {
      return next();
    }
    res.setHeader('Connection', 'close');
 
    res.send(503, 'Server is reloading...');
  });

  var api = express.Router();

  configInjector(config, api, app);  

  app.all(config.server.basePath + '/*', [validateRequest()]);
  app.use(config.server.basePath, api);

  app.get('/api-docs', function (req, res) {
    res.json(require('./app.docs')(config));
  });

  app.use(function (req, res) {
    return res.status(404).send(req.originalUrl + ' does\'nt exist');
  });
  configKeenIo(config);
  //The keen.io method has to be defined after the 404 not found route handler.
  app.use(keenio.handleAll());

  // Start the server
  app.set('port', port);
  app.set('ip', config.server.ip);

  return app;
};

var configInjector = function(config, api, app) {
  var container = injector.load(config);
  container.openModels();
  container.openApp(app);
  container.openCommonLib();
  container.openControllers(api);
};

var configKeenIo = function(config) {
  if (config.apiKey.keenProjectId && config.apiKey.keenWriteKey) {
    keenio.configure({
        client: {
          projectId: config.apiKey.keenProjectId,
          writeKey: config.apiKey.keenWriteKey
        }
    });   
    keenio.on('error', console.warn); // There are 'error', 'info',
  }
};

var createSwaggerApp = function() {
  var swaggerApp = express.Router();
  swaggerApp.use(express.static(path.join(__dirname, '../docs/swagger-ui')));

  return swaggerApp;
};
