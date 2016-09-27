var express = require('express');
var path = require('path');
var logger = require('morgan');
var bodyParser = require('body-parser');
var corsFilter = require('cors');

var app = express();
app.set('port', process.env.PORT || 3001);
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));
app.use(corsFilter());
app.options('*', corsFilter()); // allow preflight (http.OPTIONS)
app.use(express.static('public'));
app.use(express.static('build'));

var mode =  process.env.MODE || ('');

app.listen(app.get('port'), function() {
  console.log('Express server listening on port ' + app.get('port'));
});
