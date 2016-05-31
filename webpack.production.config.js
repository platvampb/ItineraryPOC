const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const devFlagPlugin = new webpack.DefinePlugin({
  __DEV__: JSON.stringify(JSON.parse(process.env.DEBUG || 'false'))
});

module.exports = {
	entry: {
		app: './app/app.js',
		vendor: ['react', 'react-dom', 'react-router', 'redux', 'react-redux', 'redux-thunk']
	},
	output: {
		path: './build',
		filename: '[name].js'
	},
	devtool: 'source-map',
	module: {
		loaders: [
			{ test: /\.js?$/, loader: 'babel', exclude: /node_modules/},
			{ test: /\.js$/, exclude: /node_modules/, loader: 'babel-loader', query: {presets: ['es2015', 'react']}},
			{
				test: /\.css$/,
				include: /stylesheets/,
				loader: 'style!css?outputStyle=expanded'
			},
			{
				test: /\.scss$/,
				include: /stylesheets/,
				loader: ExtractTextPlugin.extract('style-loader', 'css!sass?outputStyle=expanded')
			},
			{
				test: /\.(jpg|png|gif|eot|woff|ttf|svg)/,
				loader: "file"
			}
		]
	},
	plugins: [
		new webpack.optimize.CommonsChunkPlugin('vendor', 'vendor.js'),
		new HtmlWebpackPlugin({
			title: 'Itinerary POC'
		}),
		new ExtractTextPlugin('[name].css'),
		devFlagPlugin
	]

};
