var path = require('path')
var webpack = require('webpack')

module.exports = {
  // todo: buscar que es devtool 'source-map', hay otra opcion para prod
  devtool: 'source-map',
  entry: [
    './source/index'
  ],
  output: {
    path: path.join(__dirname, 'build'),
    filename: 'index.js',
  },
  resolve: {
    // probar sin root
    root: __dirname,
    // las carpetas de modulos, en nuestro caso los paquetes de node y lo que este debajo de source/
    modulesDirectories: [ 'node_modules', 'source' ],
    extensions: [ '', '.js', '.jsx', '.css' ],
    alias: {
      auth      : path.join(__dirname, 'source', 'auth'),
      actions   : path.join(__dirname, 'source', 'actions'),
      api       : path.join(__dirname, 'source', 'api'),
      components: path.join(__dirname, 'source', 'components'),
      constants : path.join(__dirname, 'source', 'constants'),
      images    : path.join(__dirname, 'source', 'images'),
      store     : path.join(__dirname, 'source', 'store'),
    }
  },
  plugins: [
    // buscar este plugin
    new webpack.optimize.OccurenceOrderPlugin(),
    // define variables de entorno
    new webpack.DefinePlugin({
      'process.env': {
        'NODE_ENV': JSON.stringify('production')
      }
    })
  ],
  module: {
    loaders: [
      {
        test: /\.(woff(2)?|ttf|eot)(\?v=[0-9]\.[0-9]\.[0-9])?$/,    //to support @font-face rule
        loader: "url-loader",
        query:{
          limit:'10000',
          name:'[name].[ext]',
          outputPath:'fonts/'
          //the fonts will be emmited to public/assets/fonts/ folder
          //the fonts will be put in the DOM <style> tag as eg. @font-face{ src:url(assets/fonts/font.ttf) }
        }
      },
      {
        test: /\.js$/,
        loader: 'babel-loader',
        include: path.join(__dirname, 'source'),
        query: {
          presets: ['es2015', 'stage-0', 'react']
        }
      },{
        test: /\.css$/,
        loaders: [
          'style?sourceMap',
          'css?modules&importLoaders=1&localIdentName=[path]___[name]__[local]___[hash:base64:5]'
        ]
      },{
      //to support eg. background-image property
       test: /\.(gif|jpg|jpeg|png|ico|svg)$/i,
       loader: 'url-loader?limit=100000'
      }
    ],
  }
}

