// module.exports = {
// 	entry: './app/app.js',
// 	output: {
// 		path: "public/static/js",
//     	filename: "bundle.js"
// 	},
// 	watch: true,
// 	module: {
// 		loaders: [
// 			{
// 				test: /\.scss$/,
// 				loaders: ["style", "css", "sass"]
// 			},
// 			{
// 				test: /\.js$/,
// 				exclude: /(node_modules|bower_components)/,
// 				loader: 'babel',
// 				query: {
// 					presets: ['es2015']
// 			  }
// 			}
// 		]
// 	}
// }

var path = require('path');
var webpack = require('webpack');
//var ExtractTextPlugin = require("extract-text-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

require('es6-promise').polyfill();

module.exports = {
	entry: './app/app.js',
  // mode: 'development',
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'public/static/js')
},
watch: true,

  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
		use: {
		        loader: 'babel-loader',
		        /*options: {
		          presets: ['env']
		        }*/
		      }
      },
      {
        test: /\.scss$/,
		use: [{
		           loader: 'style-loader'
		         }, {
		           loader: 'css-loader'
		         }, {
		           loader: 'sass-loader'
		 }]
      }
    ]
  },

  stats: {
    // Colored output
    colors: true
  },

  // Create Sourcemaps for the bundle
  devtool: 'source-map'
};
