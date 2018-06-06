var socket = io();
socket.on('connect', function(){
  console.log('Connected to Server');

//Listen for newMessage event
socket.on('newMessage', function(message){
  console.log(message);
});

//emit createMessage Event by client
socket.emit('createMessage', {
  text:'Hello User',
  from:'Azhar'
});
});

socket.on('disconnect', function(){
  console.log('Disconnected from Server');
});
