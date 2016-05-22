var express = require('express');
var path = require('path');
var logger = require('morgan');
var bodyParser = require('body-parser');
var corsFilter = require('cors');

var app = express();

app.set('port', process.env.PORT || 3000);
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));
app.use(corsFilter());
app.options('*', corsFilter()); // allow preflight (http.OPTIONS)

var routes = require('./routes/api');
app.use('/', routes);

app.listen(app.get('port'), function() {
  console.log('Express server listening on port ' + app.get('port'));
});
