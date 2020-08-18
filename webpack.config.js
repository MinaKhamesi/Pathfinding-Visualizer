const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');


module.exports = {
    entry:'./src/js/Main.js',
    output: {
        filename: 'bundle.js',
        path: path.resolve(__dirname, 'dist'),
      },
      plugins: [
            new HtmlWebpackPlugin({
               title: 'PathFinding Visualizer',
               template: './index.html'
             }),
           ],
    module:{
        rules:[
            {
                test: /\.css$/i,
                use: ['style-loader', 'css-loader'],
              },
              {
                test: /\.js$/,
                exclude: /(node_modules|bower_components)/,
                use: {
                  loader: 'babel-loader',
                  options: {
                    presets: ['@babel/preset-env']
                  }
                }
              }
        ]
    },
    
    mode: process.env.NODE_ENV==='production' ? 'production' : 'development'
}