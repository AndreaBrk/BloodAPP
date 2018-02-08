/**
 NOTE This file is ONLY for local development, there isn't any need to check
 environment. For heroku we have app-heroku.js
*/

var path = require('path');
var express = require('express');
var webpack = require('webpack');

var config = require('./webpack.config');

var app = express();
var compiler = webpack(config);

const {
  HOST = 'localhost',
  PORT = 4000
} = process.env;



app.use(require('webpack-dev-middleware')(compiler, {
  noInfo: true,
  publicPath: config.output.publicPath
}));


app.get('/reset.css', function (req, res) {
  res.sendFile(path.join(__dirname, 'reset.css'));
});

app.get('/globals.css', function (req, res) {
  res.sendFile(path.join(__dirname, 'source/styles/globals.css'));
});

// NOTA: Version customizada
app.get('/simple-grid.css', function (req, res) {
  res.sendFile(path.join(__dirname, 'source/styles/simple-grid.css'));
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

app.get('*', function (req, res) {
  res.sendFile(path.join(__dirname, 'index.html'));
});

app.listen(PORT, HOST, function (err) {
  if (err) {
    console.log(err);
    return;
  }

  console.log(`Listening at http://${HOST}:${PORT}`);
});
