Lab 06 Wack Chat
===
Implement a TCP chat server using the nodejs net module

## Description
- The TCP server is started within the **server.js** module.
- The **parse-message.js** module parses the client requests:
 - Available commands:
  - `/nick some_name` -- change username to the name provided
  - `/dm user_name message` -- send message only to target username
  - `/users` -- sends the requester the usernames of all connected users
  - `/troll message` -- sends the message to all users 10 times
  - `/ban user_name` -- close the connection of the target username
  - `/info` -- display port, family, IP address, bytes written and received at that point in time

## Usage
- In the command line, start the server by running `node server.js`
- In another terminal window, type `telnet localhost 3000`
The chat server is now up and running!

By yourself, you can simulate other clients connecting to the chat by opening more terminal windows and typing `telnet localhost 3000`.

If you get tired of holding conversations with yourself, a friend can connect to your chat server if you give them your IP address.
- Tell your friend to type `telnet <your IP address> 3000`, and you can troll each other until the sun comes up.
