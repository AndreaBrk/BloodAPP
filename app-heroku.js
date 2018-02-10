// http://stackoverflow.com/questions/31092538/heroku-node-js-error-r10-boot-timeout-web-process-failed-to-bind-to-port-w

var path = require('path');
var express = require('express');
var app = express();

app.get('/favicon.ico', function (req, res) {
  res.sendFile(path.join(__dirname, 'favicon.ico'));
});

app.get('/reset.css', function (req, res) {
  res.sendFile(path.join(__dirname, 'reset.css'));
});

app.get('/rc-tooltip.css', function (req, res) {
  res.sendFile(path.join(__dirname, 'node_modules/rc-tooltip/assets/bootstrap_white.css'));
});

app.get('/rc-time-picker.css', function (req, res) {
  res.sendFile(path.join(__dirname, 'node_modules/rc-time-picker/assets/index.css'));
});

app.get('/react-contextmenu.css', function (req, res) {
  res.sendFile(path.join(__dirname, 'source/styles/react-contextmenu.css'));
});

// TODO Remove this when we use Webpack
app.get('/static/index.js', function (req, res) {
  res.sendFile(path.join(__dirname, 'build/index.js'));
});

app.get('*', function (req, res) {
  res.sendFile(path.join(__dirname, 'index.html'));
});

app.set('port', (process.env.PORT || 5000));
app.get('/', function(request, response) {
    var result = 'App is running'
    response.sendFile(path.join(__dirname, 'index.html'));
}).listen(app.get('port'), function() {
    console.log('App is running, server is listening on port ', app.get('port'));
});
