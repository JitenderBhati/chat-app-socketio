var socket = io();
socket.on('connect', function(){
  console.log('Connected to Server');

//Listen for newMessage event
socket.on('newMessage', function(message){
  console.log(JSON.stringify(message, undefined, 2));
  var li = jQuery("<li></li>");
  li.text(`${message.from}: ${message.text}`);
  jQuery('#messages').append(li);
});
});

socket.on('disconnect', function(){
  console.log('Disconnected from Server');
});

jQuery('#message-form').on('submit', function(e){
  e.preventDefault();
  socket.emit('createMessage', {
    from:'User',
    text:jQuery("[name=message]").val()
  }, function(){

  });
  jQuery('#message').focus( function() { $(this). val(""); } );
});
