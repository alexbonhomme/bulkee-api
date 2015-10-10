'use strict';

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

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
      type: Number
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

BulkySchema.plugin(mongoose.timestampPlugin);
module.exports = mongoose.model('Bulkies', BulkySchema);