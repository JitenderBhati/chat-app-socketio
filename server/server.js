const express = require('express');
const path = require('path');

var app = new express();

const publicPath = path.join(__dirname,'../public');

app.listen(3000, (err, res)=>{
  if(err)
  console.log('Server Didn`t start');
  else {
    console.log('Server started on port 3000');
  }
});

app.use(express.static(publicPath));
