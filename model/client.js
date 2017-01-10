'use strict';

const uuid = require('uuid/v4');

const Client = module.exports = function(socket) {
  this.socket = socket;
  this.username = `user_${Math.floor(Math.random() * 100)}`;
  this.id = uuid(); //gives unique id for Client
};
