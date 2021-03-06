/* eslint-disable */

const webpack = require('webpack');
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CleanPlugin = require('clean-webpack-plugin');
const dotEnv = require('dotenv-webpack');

module.exports = {
  // Default folder for code source
  context: path.join(__dirname, './src'),
  devtool: 'source-map',
  entry: './index.js',
  output: {
		path: path.join(__dirname, 'console'),
    publicPath: '/console/',
		filename: '[chunkhash].js'
	},
	resolve: {
		extensions: ['', '.js']
	},
	module: {
		loaders: [{
  		test: /\.js?$/,
  		exclude: /node_modules/,
  		loaders: ['babel'],
    }]
	},
	plugins: [
		new webpack.DefinePlugin({
			'process.env': {
				NODE_ENV: '"production"'
			}
		}),
		new webpack.optimize.UglifyJsPlugin({
			compress: {
				warnings: false,
				screw_ie8: true,
				drop_console: true,
				drop_debugger: true
			}
		}),
    new webpack.optimize.DedupePlugin(),
    new CleanPlugin(['web'], { verbose: false }),
		new webpack.optimize.OccurenceOrderPlugin(),
		new HtmlWebpackPlugin({
			template: './index.html'
		}),
    new dotEnv({
      path: './.env',
    })
	]
};
