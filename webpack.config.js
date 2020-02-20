var path = require('path');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var TerserPlugin = require('terser-webpack-plugin');
module.exports = {
     watch: true ,
     entry:  { index: './src/map.js' } ,
     output: {
          path: path.resolve(__dirname, 'dist'),
          filename: './build/[name].js'
     } ,
     devServer: {
        contentBase: './dist/',
        compress: true,
        port: 3000
     } ,
     module: {
        rules: [
            {
              test: /\.(s*)css$/ ,
              use: ExtractTextPlugin.extract({
                        fallback:'style-loader',
                        use:['css-loader','sass-loader'],
              })
            }
        ]
     } ,
     plugins: [
        new ExtractTextPlugin({ filename: '/css/appbundle.css' }) ,
     ] ,
     optimization: {
        minimize: true,
        minimizer: [new TerserPlugin()],
     },
};

// "webpack -d --watch"
