var path = require('path')
var webpack = require('webpack')

// Determina la configuración que luego va a ser usada al compilar
module.exports = {
  devtool: 'source-map',
  resolve: {
    root: __dirname + '/source'
  },
  entry: [
    './source/index' // archivo a compilar
  ],
  // dónde va a estar ubicado el archivo al hacer build
  output: {
    path: path.join(__dirname, 'build'),
    filename: 'index.js',
    publicPath: '/static/'
  },
  resolve: {
    // se definen los alias de los archivos, permitiendo luego hacer referencias
    root: __dirname,
    // las carpetas de modulos, en nuestro caso los paquetes de node y lo que este debajo de source/
    modulesDirectories: [ 'node_modules', 'source' ],
    extensions: [ '', '.js', '.jsx', '.css', '.jpg'],
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
  // plugíns necesarios para la app
  plugins: [
    new webpack.optimize.OccurenceOrderPlugin(),
    new webpack.DefinePlugin({
      'process.env': {
        'NODE_ENV': JSON.stringify('development')
      }
    })
  ],
  // módulos para poder leer imágenes, css y fonts
  module: {
    rules: [
      {
        test: /\.(jpe?g|png|gif)$/i,   //to support eg. background-image property
        loader:"file-loader",
        query:{
          name:'[name].[ext]',
          outputPath:'images/'
          //the images will be emmited to public/assets/images/ folder
          //the images will be put in the DOM <style> tag as eg. background: url(assets/images/image.png)
        }
      },
      {
        test: /\.(woff(2)?|ttf|eot|svg|png|jpg)(\?v=[0-9]\.[0-9]\.[0-9])?$/,    //to support @font-face rule
        loader: "url-loader",
        query:{
          limit:'20000',
          name:'[name].[ext]',
          outputPath:'fonts/'
          //the fonts will be emmited to public/assets/fonts/ folder
          //the fonts will be put in the DOM <style> tag as eg. @font-face{ src:url(assets/fonts/font.ttf) }
        }
      },
      {
        test: /\.css$/,
        loaders: ["style-loader","css-loader"]
      }
    ],
    loaders: [{
      test: /\.js$/,
      loader: 'babel-loader',
      include: path.join(__dirname, 'source'),
      query: {
        presets: ['es2015', 'stage-0', 'react']
      },
    },{
      test: /\.css$/,
      loaders: [
        'style?',
        'css?modules&importLoaders=1&localIdentName=[path]___[name]__[local]___[hash:base64:5]'
      ]
    },{
      test: /\.(gif|jpg|jpeg|png|woff|woff2|eot|ttf|svg)$/i,
      loader: 'url-loader?limit=100000'
    }]
  },
}
