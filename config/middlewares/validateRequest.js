'use strict';

var jwt = require('jwt-simple');
var secret = require('../secret');

module.exports = function() {
  return function(req, res, next) {

    // if (req.url.indexOf('login') >= 0 || req.url.indexOf('signup') >= 0) {
    //   return next();
    // }

    var token = getAccessToken(req);
    var key = getKey(req);

    if (token || key) {
      var decoded = null;
      try {
        decoded = jwt.decode(token, secret());
      } catch (err) {
        res.status(401);
        return res.json({
          status: 401,
          message: 'Invalid Token or Key'
        });
      }

      if (decoded.exp <= Date.now()) {
        res.status(401);
        return res.json({
          status: 401,
          message: 'Token Expired'
        });
      }
        return next();
    } else {
      res.status(401);
      return res.json({
        status: 401,
        message: 'Token is missing'
      });
    }
  };
};

var getAccessToken = function(req) {
  return (req.body && req.body.access_token) || (req.query && req.query.access_token) || req.headers['x-access-token'];
};

var getKey = function(req) {
  return (req.body && req.body.x_key) || (req.query && req.query.x_key) || req.headers['x-key'];
};
