//mongoose user scheme
const mongoose = require('mongoose');

// create User Schema
const User = mongoose.Schema({
  name: String,
  someID: String
});

module.exports = mongoose.model('users', User);