const moment = require('moment');
var generateMessage = (text, from)=>{
  return {
    text,
    from,
    createdAt:moment().valueOf()
  };
};

var generateLocationMessage = (from, latitude, longitude)=>{
  return{
  from,
  url: `https://www.google.com/maps?q=${latitude},${longitude}`,
  createdAt: moment().valueOf()
}};
module.exports = {generateMessage,generateLocationMessage};
