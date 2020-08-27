const path = require('path');
const TerserPlugin = require('terser-webpack-plugin');
module.exports = {
  entry: {
    'validator': './index',
    'validator.min': './index'
  },
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: '[name].js',
    libraryTarget: 'umd',
    umdNamedDefine: true
  },
  resolve: {
    extensions: ['.ts', '.js', '.json']
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/, 
        loader: "ts-loader"
      },
      {
        test: /\.js$/,
        exclude: /node_modules/, 
        loader: "babel-loader"
      }
    ]
  },
  optimization: {
    minimize: true,
    minimizer: [
      new TerserPlugin({
        include:/\.min\.js$/,
      }),
    ],
  }
}