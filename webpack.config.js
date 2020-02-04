var path = require('path');

module.exports = {
   entry: { index: './src/map.js' , buildData: './src/buildMapData.js' } ,
   output: { filename: './build/[name].js' } ,
   devServer: {
    contentBase: './dist/',
    compress: true,
    port: 3000
  }
};
