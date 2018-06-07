var socket = io();
socket.on('connect', function(){
  console.log('Connected to Server');

//Listen for newMessage event
socket.on('newMessage', function(message){
  var formattedTime = moment(message.createdAt).format("h:mm a");
  // console.log(JSON.stringify(message, undefined, 2));
  // var li = jQuery("<li></li>");
  // li.text(`${message.from} ${formattedTime}: ${message.text}`);
  var template = jQuery('#message-template').html();
  var html = Mustache.render(template,{
    createdAT:formattedTime,
    text:message.text,
    from:message.from
  });
  jQuery('#messages').append(html);
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
    jQuery("[name=message]").val('');

  });
  jQuery('#message').focus( function() { $(this). val(""); } );
});

var locationButton = jQuery('#location-button');
locationButton.on('click', function(){
  if(!navigator.geolocation)
  {
    return alert('Geolocation is not supported by your browser.');
  }
  locationButton.attr("disabled", "disabled").text('Sending Location..');
  navigator.geolocation.getCurrentPosition(function(position){
    locationButton.removeAttr('disabled').text('Send Location');
    socket.emit('createLocation', {
      longitude:position.coords.longitude,
      latitude:position.coords.latitude
    });
},function(){
    locationButton.removeAttr('disabled').text('Send Location');
    alert('Unable to fetch the location.');
  })
});

socket.on('newLocationMessage', function(message){
  var formattedTime = moment(message.createdAt).format("h:mm a");
  // var li = jQuery('<li></li>');
  // var a = jQuery('<a target="_blank">My Current Location</a>');
  //
  // a.attr("href", message.url);
  var template = jQuery('#location-template').html();
  var html = Mustache.render(template,{
    url:message.url,
    createdAT:formattedTime,
    from:message.from
  });
  jQuery('#messages').append(html);
});
