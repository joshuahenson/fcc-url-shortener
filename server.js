//break up file after i get it working

var express = require('express');
var mongoose = require("mongoose");
var routes = require('./routes/index.js');
require('dotenv').load();
var app = express();

var uristring = process.env.MONGOLAB_URI;
mongoose.connect(uristring, function (err, res) {
  if (err) {
    console.log('ERROR connecting to: ' + uristring + '. ' + err);
  } else {
    console.log('Succeeded connecting to: ' + uristring);
  }
});



//routes
app.set('views', __dirname + '/views');
app.set('view engine', 'jade');

routes(app);



var port = process.env.PORT;
app.listen(port, function() {
    console.log('Node.js listening on port ' + port + '...');
});
