const path = require('path');
const webpack = require('webpack');

const currentPath = path.resolve('.');

const PROD = process.env.NODE_ENV === 'production';

function getOutput() {
  return PROD ?
    {
      path: path.join(currentPath, 'dist/client'),
      filename: 'bundle.js',
    } :
    {
      path: path.join(currentPath, './src/client/dist'),
      publicPath: 'http://localhost:8080/dist/',
      filename: 'bundle.js',
    };
}

module.exports = {
  entry: path.join(currentPath, './src/client/main.js'),
  output: getOutput(),
  module: {
    rules: [
      {
        test: /\.vue$/,
        loader: 'vue',
        options: {
          // vue-loader options go here
        },
      },
      {
        test: /\.js$/,
        loader: 'babel',
        exclude: /node_modules/,
      },
      {
        test: /\.(png|jpg|gif|svg)$/,
        loader: 'file',
        options: {
          name: '[name].[ext]?[hash]',
        },
      },
    ],
  },
  resolve: {
    alias: {
      vue$: 'vue/dist/vue',
    },
  },
  devServer: {
    historyApiFallback: true,
    noInfo: true,
  },
  devtool: '#eval-source-map',
};

if (PROD) {
  module.exports.devtool = '#source-map';

  // http://vue-loader.vuejs.org/en/workflow/production.html
  module.exports.plugins = (module.exports.plugins || []).concat([
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: '"production"',
      },
    }),
    new webpack.optimize.UglifyJsPlugin({
      compress: {
        warnings: false,
      },
    }),
    new webpack.LoaderOptionsPlugin({
      minimize: true,
    }),
  ]);
}
