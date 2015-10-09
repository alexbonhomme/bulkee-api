'use strict';

var express = require('express');

function isPromise(value) { return value != null && typeof value.then === 'function'; }

['json', 'jsonp', 'send'].forEach(function (method) {

  var methodOrig = express.response[method];

  express.response[method] = function expressPromise(response) {
    var self = this;

    if (isPromise(response)) {
      return response.then(function (result) {
        methodOrig.call(self, result);

      }, function (err) {
        return self.req.next(err);
      });
    }

    methodOrig.apply(this, arguments);
  };

});
