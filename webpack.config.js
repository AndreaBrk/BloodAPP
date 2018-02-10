var path = require('path');
var webpack = require('webpack');

module.exports = {
  devtool: 'source-map',
  resolve: {
    root: __dirname + '/source'
  },
  entry: [
    './source/index'
  ],
  output: {
    path: path.join(__dirname, 'build'),
    filename: 'index.js',
    publicPath: '/static/'
  },
  resolve: {
    root: __dirname,
    modulesDirectories: [ 'node_modules', 'source' ],
    extensions: [ '', '.js', '.jsx', '.css' ],
    alias: {
      actions   : path.join(__dirname, 'source', 'actions'),
      api       : path.join(__dirname, 'source', 'api'),
      components: path.join(__dirname, 'source', 'components'),
      constants : path.join(__dirname, 'source', 'constants'),
      containers: path.join(__dirname, 'source', 'containers'),
      utilities : path.join(__dirname, 'source', 'utilities'),
      images    : path.join(__dirname, 'source', 'images'),
      store     : path.join(__dirname, 'source', 'store'),
    }
  },
  plugins: [
    new webpack.optimize.OccurenceOrderPlugin(),
    new webpack.DefinePlugin({
      'process.env': {
        'NODE_ENV': JSON.stringify('production')
      }
    })
  ],
  module: {
    rules: [
      {
        test: /\.(jpe?g|png|gif)$/i,   //to support eg. background-image property
        loader:"file-loader",
        query:{
          name:'[name].[ext]',
          outputPath:'images/'
          //the images will be emmited to public/assets/images/ folder
          //the images will be put in the DOM <style> tag as eg. background: url(assets/images/image.png);
        }
      },
      {
        test: /\.(woff(2)?|ttf|eot|svg)(\?v=[0-9]\.[0-9]\.[0-9])?$/,    //to support @font-face rule
        loader: "url-loader",
        query:{
          limit:'10000',
          name:'[name].[ext]',
          outputPath:'fonts/'
          //the fonts will be emmited to public/assets/fonts/ folder
          //the fonts will be put in the DOM <style> tag as eg. @font-face{ src:url(assets/fonts/font.ttf); }
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
      }
    },{
      test: /\.css$/,
      loaders: [
        'style?sourceMap',
        'css?modules&importLoaders=1&localIdentName=[path]___[name]__[local]___[hash:base64:5]'
      ]
    },{
     test: /\.(gif|jpg|jpeg|png|woff|woff2|eot|ico|ttf|svg)$/i,
     loader: 'url-loader?limit=100000'
     }]
  }
};

