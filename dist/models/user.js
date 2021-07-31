"use strict";

var mongoose = require('mongoose');

var uniqueValidator = require("mongoose-unique-validator");

var Schema = mongoose.Schema;
var userSchema = new Schema({
  'email': {
    type: String,
    required: true,
    unique: true
  },
  'password': {
    type: String,
    required: true
  }
}, {
  collection: 'Users'
});
userSchema.plugin(uniqueValidator);
module.exports = mongoose.model('Users', userSchema);