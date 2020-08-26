const path = require('path');
module.exports = {
  entry: './index',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'index.js',
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
  }
}