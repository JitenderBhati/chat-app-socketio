const express = require('express');
const path = require('path');
const http = require('http');
const socketIO = require('socket.io');
const {generateMessage} = require('./utils/message');

var app = new express();
var server = http.createServer(app);
const publicPath = path.join(__dirname,'../public');

app.use(express.static(publicPath));

server.listen(3000, (err, res)=>{
  if(err)
  console.log('Server Didn`t start');
  else {
    console.log('Server started on port 3000');
  }
});
var io = socketIO(server);
io.on('connection', (socket)=>{
  console.log('Connected User');


//For Listing new message sent from client
  socket.on('createMessage', (message, callback)=>{
    console.log(message);
    io.emit('newMessage', generateMessage(message.text, message.from));
    callback({
      from:message.from
    });
  });

  socket.emit('newMessage', generateMessage('Welcome to Chat App', 'Admin'));
  socket.broadcast.emit('newMessage', generateMessage('New User Joined', 'Admin'));
  //disconnect event
  socket.on('disconnect', ()=>{
    console.log('Disconnected from User');
  });
});
