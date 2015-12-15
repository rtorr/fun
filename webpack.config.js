var path = require('path');
var webpack = require('webpack');
var resolvPath = function(componentPath) {
  return path.join(__dirname, componentPath);
};

var plugins = [
  new webpack.DefinePlugin({
    'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV)
  })
];

var entry = {
  index: ['./src/public/js/index']
};

var loaders = [
  { test: /\.js?$/, exclude: /node_modules/, loaders: ['babel'] }
];

if (process.env.NODE_ENV === 'production') {
  plugins.push(
    new webpack.optimize.DedupePlugin(),
    new webpack.optimize.OccurenceOrderPlugin(),
    new webpack.optimize.UglifyJsPlugin({
      compressor: {
        unsafe: true,
        warnings: false
      },
      output: {comments: false}
    })
  );
}else {
  plugins.push(
    new webpack.NoErrorsPlugin()
  );
}

module.exports = {

  devtool: process.env.NODE_ENV !== 'production' ? 'inline-source-map' : '',

  entry: entry,

  output: {
    path: path.join(__dirname, './src/public/dist/js/'),
    filename: '[name]_bundle.js'
  },

  module: {
    loaders: loaders
  },

  node: {
    Buffer: false
  },

  plugins: plugins,

  resolve: {
    alias: {
      components: resolvPath('./src/components'),
      lib: resolvPath('./src/lib')
    }
  }

};
