const express = require('express');
const path = require('path');
const http = require('http');
const socketIO = require('socket.io');

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
  socket.on('createMessage', (message)=>{
    console.log(message);
    io.emit('newMessage', {
      text:message.text,
      from:message.from,
      createdAt:new Date().getTime()
    });
  });

  socket.emit('newMessage', {text:'Welcome to chat app', from:'Admin'});
  socket.broadcast.emit('newMessage', {text:'New User Joined', createdAt:new Date().getTime()});
  //disconnect event
  socket.on('disconnect', ()=>{
    console.log('Disconnected from User');
  });
});
