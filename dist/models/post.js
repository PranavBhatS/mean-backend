"use strict";

var mongoose = require("mongoose");

var Schema = mongoose.Schema;
var postSchema = new Schema({
  title: {
    type: String,
    required: true
  },
  content: {
    type: String,
    required: true
  },
  imagePath: {
    type: String,
    required: false
  },
  creator: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Users",
    required: false
  },
  createdAt: {
    type: mongoose.Schema.Types.Date,
    "default": function _default() {
      return Date.now();
    }
  },
  updatedAt: {
    type: mongoose.Schema.Types.Date,
    "default": function _default() {
      return Date.now();
    }
  },
  postStatus: {
    type: mongoose.Schema.Types.String,
    required: true
  }
}, {
  collection: "Posts",
  timestamps: true
});
module.exports = mongoose.model("Posts", postSchema);