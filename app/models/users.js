'use strict';

var mongoose = require('mongoose');
var crypto = require('crypto');
var Schema = mongoose.Schema;


var UserSchema = new Schema({
  lastName: {
    type: String,
    default: ''
  },
  firstName: {
    type: String,
    default: ''
  },
  email: {
    type: String,
    default: '',
    lowercase: true,
    trim: true
  },
  birthdate: {
    type: Date,
    default: ''
  },
  hashed_password: {
    type: String,
    default: '',
  },
  salt: {
    type: String,
    default: ''
  }
});

UserSchema
  .virtual('password')
  .set(function(password) {
    this._password = password;
    this.salt = this.makeSalt();
    this.hashed_password = this.encryptPassword(password);
  })
  .get(function() {
    return this._password;
  });

UserSchema.pre('save', function(next) {
  if (!this.isNew) return next();

  if (!validatePresenceOf(this.password) && !this.skipValidation()) {
    next(new Error('Invalid password'));
  } else {
    next();
  }
});

/* Validators */
var validatePresenceOf = function(value) {
  return value && value.length;
};

UserSchema.methods = {

  encryptPassword: function(password) {
    if (!password) return '';
    try {
      return crypto
        .createHmac('sha1', this.salt)
        .update(password)
        .digest('hex');
    } catch (err) {
      return '';
    }
  },

  makeSalt: function() {
    return Math.round((new Date().valueOf() * Math.random())) + '';
  }
};

UserSchema.statics = {

  validate: function(userObj, cb) {
    this.findOne({
      email: userObj.email
    })
    .exec(cb);
  },

  selectOne: function(userId, cb) {
    this.findOne({
      _id: userId
    })
    .exec(cb);
  }
};

UserSchema.plugin(mongoose.timestampPlugin);
module.exports = mongoose.model('Users', UserSchema);
