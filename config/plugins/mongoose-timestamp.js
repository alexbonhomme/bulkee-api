'use strict';

module.exports = function (schema) {

  schema.add({
    createdAt: Date,
    updatedAt: Date
  });

  schema.pre('save', function (next) {
    if (this.isNew && !this.createdAt) {
      this.createdAt = new Date(); // TODO this._id.getTimestamp()
    }

    this.updatedAt = new Date();

    next();
  });
};
