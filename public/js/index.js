var socket = io();
socket.on('connect', function(){
  console.log('Connected to Server');

//Listen for newMessage event
socket.on('newMessage', function(message){
  console.log(JSON.stringify(message, undefined, 2));
});
});

socket.on('disconnect', function(){
  console.log('Disconnected from Server');
});
