/**
 NOTE This file is ONLY for local development, there isn't any need to check
 environment. For heroku we have app-heroku.js
*/

var path = require('path')
var express = require('express')
var webpack = require('webpack') // webpack: sistema de empaquetado

// determina que configuración usar según el entorno
var config = process.env.NODE_ENV === 'production' ? require('./webpack.config') : require('./webpack.config.dev')

var app = express()

// se compila según la config
var compiler = webpack(config)

if (process.env.NODE_ENV !== 'production') {
  app.use(require('webpack-dev-middleware')(compiler, {
    noInfo: true,
    publicPath: config.output.publicPath
  }))
}

app.get('/reset.css', function (req, res) {
  res.sendFile(path.join(__dirname, 'reset.css'))
})

app.get('/globals.css', function (req, res) {
  res.sendFile(path.join(__dirname, 'source/styles/globals.css'))
})

// NOTA: Version customizada
app.get('/simple-grid.css', function (req, res) {
  res.sendFile(path.join(__dirname, 'source/styles/simple-grid.css'))
})

app.get('/rc-tooltip.css', function (req, res) {
  res.sendFile(path.join(__dirname, 'node_modules/rc-tooltip/assets/bootstrap_white.css'))
})

app.get('/rc-time-picker.css', function (req, res) {
  res.sendFile(path.join(__dirname, 'node_modules/rc-time-picker/assets/index.css'))
})

app.get('/react-contextmenu.css', function (req, res) {
  res.sendFile(path.join(__dirname, 'source/styles/react-contextmenu.css'))
})

app.get('/static/index.js', function (req, res) {
  res.sendFile(path.join(__dirname, 'build/index.js'))
})

app.get('*', function (req, res) {
  res.sendFile(path.join(__dirname, 'index.html'))
})

// se determina a qué puerto escuchar según el entorno
if (process.env.NODE_ENV === 'production') {
  // Asi se configura para Heroku
  app.set('port', (process.env.PORT || 5000))
  app.get('/', function(request, response) {
    var result = 'App is running'
    response.sendFile(path.join(__dirname, 'index.html'))
  }).listen(app.get('port'), function() {
    console.log('App is running, server is listening on port ', app.get('port'))
  })
} else {
  const {
    HOST = 'localhost',
    PORT = 4000
  } = process.env

  // Esto es para trabajar en modo desarrollo
  app.listen(PORT, HOST, function (err) {
    if (err) {
      console.log(err)
      return
    }

    console.log(`Listening at http://${HOST}:${PORT}`)
  })
}