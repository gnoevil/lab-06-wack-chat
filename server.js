'use strict';

const net = require('net');
const EE = require('events');
const server = net.createServer();
const pm = require('./lib/parse-message');
const Client = require('./model/client');
const ee = new EE();
//start a TCP server using the `net` module
const allUsers = [];

server.on('connection', function(socket) {
  let client = new Client(socket);
  allUsers.push(client);
  console.log('Client connected.');
  // ee.write(`Hello ${client.id}. Welcome to Wat Chat!`);

  socket.on('data', function(data){
    let command = data.toString().split(' ').shift().trim();
    let message = data.toString().split(' ').slice(1).join(' ');
    if (command.startsWith('/')) {
      ee.emit(command, client, message);
    }
  });
  socket.on('close', function(){
    allUsers.forEach(client => {
      if (client.nickname) {
        client.socket.destroy();
        allUsers.forEach( client => {
          console.log(`${client.nickname}: has left Wat Chat!`);
        });
      }
    });
  });
});

server.listen(3000, function() {
  console.log('server connection at localhost://3000');
});
