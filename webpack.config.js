const path = require('path');

module.exports = {
  mode: 'development',
  entry: './src/view/main.js',
  output: {
    path: path.join(__dirname, 'public/js'),
    filename: 'bundle.js',
  },
  devtool: 'source-map',
  devServer: {
    contentBase: path.join(__dirname, 'public/js'),
    watchContentBase: true,
    compress: false,
    port: 8000
  }
};
