'use strict';

var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var Users = require('./users');
var Bluebird = require('bluebird');
var distance = require('gps-distance');
var _ = require('lodash');
Bluebird.promisifyAll(Users);
Bluebird.promisifyAll(Users.prototype);
var config = require('../../config/config-loader').load();
var request = require('request');


var BulkySchema = new Schema({
  category: {
    id: {
      type: Number
    },
    name: {
      type: String
    }
  },
  picture: {
    type: String,
    default: '',
    required: true
  },
  description: {
    type: String,
    default: '',
    trim: true,
    required: true
  },
  position: {
    type: [Number, Number],
    index: '2d'
  },
  address: {
    type: String,
    default: '',
    required: true
  },
  author: {
    id: {
      type: String
    },
    name: {
      type: String,
      default: ''
    }
  },
  available: {
    type: Boolean,
    default: true
  }
});

BulkySchema.post('save', function(doc) {
  var self = this;
  // if (!self.isNew) return next();

  // if (!validatePresenceOf(self.password) && !self.skipValidation()) {
  //   next(new Error('Invalid password'));
  // } else {
  //   next();
  // }

  // Users.aggregateAsync([
  //   {
  //     $geoNear: {
  //       near: [parseFloat(doc.position[0]), parseFloat(doc.position[1])],
  //       distanceField: 'distCalculated',
  //       maxDistance: 100000
  //     }
  //   }])
  //   .then(function (users) {
  //     console.log('users : ', users);
  //   });
  var tokens = [];
  
  Users.findAsync()
    .then(function (users) {
      _.forEach(users, function (user) {
        // if (distance(parseFloat(doc.position[0]), parseFloat(doc.position[1]), user.alerts.position[0], user.alerts.position[1]) <= user.alerts.distance) {
        //   console.log('ici : ', distance(parseFloat(doc.position[0]), parseFloat(doc.position[1]), user.alerts.position[0], user.alerts.position[1]));
        //   tokens.push(user.device_token);
        // }
        tokens.push(user.device_token);
      });
      if (tokens.length) {
        sendPush(_.uniq(tokens), doc._id);
      }
    });


});

function sendPush(devicetoken, bulkyId) {
  var headers = {
    'X-Ionic-Application-Id': config.push.app_id,
    Authorization: 'Basic ' + new Buffer(config.push.private_key + ':').toString('base64')
  };

  var data = {
    tokens: ['DEV-ef91c15f-9ba6-421d-b67d-b53f366951fa', 'DEV-47af8a02-ea16-46c0-8414-c54c5bceb501'],
    // production: true,
    notification: {
      alert:'Un objet dans le coin risque de t\'intéresser'
    }
  };

  console.log('iciiii');

  request.post({url: config.push.url, headers: headers, data: data}, function (err, resp) {
    if (err) {
      console.log('err', err);
      return ;
    }

    console.log('data : ', resp);
  });
}

BulkySchema.plugin(mongoose.timestampPlugin);
module.exports = mongoose.model('Bulkies', BulkySchema);