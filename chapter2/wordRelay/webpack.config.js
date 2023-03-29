const path = require('path');

module.exports = {
  name: 'WordRelay setting',
  mode: 'development',
  devtool: 'eval',
  resolve: {
    extensions: ['.jsx', 'js'],
  },

  entry: {
    app: ['./client'],
  },
  
  module: {
    rules: [{
      test: /\.jsx?/,
      loader: 'babel-loader',
      options: {
        presets: ['@babel/preset-env', '@babel/preset-react'],
      }
    }]
  },

  output: {
    path: path.join(__dirname, 'dist'),
    filename: 'app.js'
  },
}