'use strict';
const Client = require('./../model/client');
const EE = require('events');
const ee = new EE();
const allUsers = [];
//module for parsing client request
ee.on('default', function(client, data) {
  allUsers.forEach(client => {
    client.socket.write(`${client.nickname}: ${data} is not a command`);
  });
});
ee.on('error', (err) => {
  throw err;
});
  // if a client sends a message that starts with `/nick some_name`
  //change their nickname to the name they have provided
ee.on('/nick', function(client, data) {
  client.nickname = data.trim();
  client.socket.write(`You are now ${client.nickname}`);
});
  //if a client sends a message that starts with `/dm some_name some message`
  //send their message to the client with the some_name nickname
ee.on('/dm', function(client, data) {
  let nickname = data.split(' ').shift().trim();
  let message = data.split(' ').slice(1).join(' ').trim();
  allUsers.forEach(client => {
    if (client.nickname === nickname) {
      client.socket.write(`${client.nickname}: ${message}`);
    }
  });
});
  //if a client sends a message that starts with `/users`
  //send the requester the usernames of all connected users
ee.on('/users', function(client, message) {
  allUsers.forEach( client => {
    client.socket.write(`${client.nickname}: ${message}`);
  });
});
  //if a client sends a message that starts with `/troll some message`
  //send their message to all users 10 times
ee.on('/troll', function(client, data) {
  let message = data.split(' ').slice(1).join(' ').trim();
  allUsers.forEach( client => {
    client.socket.write(`${client.nickname}: ${message}`) * 10;
  });
});
  // if a client sends a message that starts with `/ban user_name`
  //logout the user with the user_name (close their connection, and remove from sockets array)
  //otherwise send their message to all clients
  //when a user speaks their nickname should be printed
  // i.e.`teapot: Sup Hacker?`

ee.on('/ban', function(client, data) {
  let nickname = data.split(' ').shift().trim();
  allUsers.forEach(client => {
    if (client.nickname === nickname) {
      client.socket.destroy();
      allUsers.forEach( client => {
        client.socket.write(`${client.nickname}: BANNED`);
      });
    }
  });
});
