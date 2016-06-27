const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const devFlagPlugin = new webpack.DefinePlugin({
  __DEV__: JSON.stringify(JSON.parse(process.env.DEBUG || 'false'))
});

module.exports = {
	entry: [
		'webpack-dev-server/client?http://0.0.0.0:8080',
		'webpack/hot/only-dev-server',
		"./app/app.js"
	],
	output: {
		path: './build',
		filename: "bundle.js"
	},
	devtool: 'eval-source-map',
	module: {
		loaders: [
			{ test: /\.js?$/, loaders: ['react-hot', 'babel'], exclude: /node_modules/},
			{
				test: /\.js$/,
				exclude: /node_modules/,
				loaders: [
					'babel-loader?' +  JSON.stringify({presets: ['es2015', 'react']}),
					'eslint-loader'
				]
			},
			{
				test: /\.css$/,
				include: /stylesheets/,
				loader: 'style!css?outputStyle=expanded'
			},
			{
				test: /\.scss$/,
				include: /stylesheets/,
				loader: 'style!css!sass?outputStyle=expanded'
			},
			{
				test: /\.(jpg|png|gif|eot|woff|ttf|svg)/,
				loader: "file"
			}
		]
	},
	eslint: {
		configFile: './.eslintrc'
	},
	devServer: {
		contentBase: "./build",
	},
	plugins: [
		new HtmlWebpackPlugin({
			title: 'Itinerary POC'
		}),
		new ExtractTextPlugin('[name].css'),
		devFlagPlugin,
		new webpack.NoErrorsPlugin()
	]

};
