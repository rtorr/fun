var path = require('path');
var webpack = require('webpack');
var resolvPath = function(componentPath) {
  return path.join(__dirname, componentPath);
};

module.exports = function(config) {

  config.set({

    browsers: [ 'PhantomJS' ],
    frameworks: [ 'mocha' ],
    reporters: [ 'mocha' ],

    files: [
      'node_modules/es5-shim/es5-shim.js',
      'node_modules/es5-shim/es5-sham.js',
      'tests.webpack.js'
    ],

    preprocessors: {
      'tests.webpack.js': [ 'webpack', 'sourcemap' ]
    },

    webpack: {
      devtool: 'inline-source-map',
      module: {
        loaders: [
          { test: /\.js$/, exclude: /node_modules/, loader: 'babel' }
        ]
      },
      plugins: [
        new webpack.DefinePlugin({
          'process.env.NODE_ENV': JSON.stringify('test')
        })
      ],
      resolve: {
        alias: {
          components: resolvPath('./src/components'),
          lib: resolvPath('./src/lib')
        }
      }
    },

    webpackServer: {
      noInfo: true
    }


  });
};
