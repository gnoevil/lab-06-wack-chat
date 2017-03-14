'use strict';
const net = require('net');
const server = net.createServer();
const parse = require('./lib/parse-message.js');

let sockets = [];

server.on('connection', function(socket){
  console.log('a client connected');
  socket.write('welcome to wack chat\n');
  socket.username = `user_${Math.floor(Math.random() * 100)}`;
  sockets.push(socket);

  socket.on('data', function(buffer){
    console.log(buffer.toString());
    let message = buffer.toString();
    if(message.startsWith('/nick'))
      return parse.nickCommand(message, socket);

    if(message.startsWith('/dm'))
      return parse.dmCommand(message, sockets);

    if(message.startsWith('/users'))
      return parse.usersCommand(sockets, socket);

    if(message.startsWith('/troll'))
      return parse.trollCommand(message, sockets);

    if(message.startsWith('/ban'))
      return parse.banCommand(message, sockets);

    if(message.startsWith('/info'))
      return parse.infoCommand(socket);

    sockets.forEach(s => {
      if(s !== socket)
        s.write(`${socket.username}: ${message}\n`);
    });
  });

  socket.on('close', function(){
    console.log('a client left the chat');
    sockets.forEach((s, index) => {
      if(s == socket)
        sockets.splice(index, 1);
    });
  });
});

server.listen(3000, function(){
  console.log('server up!');
});
