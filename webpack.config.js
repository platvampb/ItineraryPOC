var webpack = require('webpack');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var devFlagPlugin = new webpack.DefinePlugin({
  __DEV__: JSON.stringify(JSON.parse(process.env.DEBUG || 'false'))
});

module.exports = {
	entry: [
		'webpack-dev-server/client?http://0.0.0.0:8081',
		'webpack/hot/only-dev-server',
		"./app/app.js"
	],
	output: {
		path: './build',
		filename: "bundle.js"
	},
	module: {
		loaders: [
			{ test: /\.js?$/, loaders: ['react-hot', 'babel'], exclude: /node_modules/},
			{ test: /\.js$/, exclude: /node_modules/, loader: 'babel-loader', query: {presets: ['es2015', 'react']}},
			{
				test: /\.css$/,
				include: /stylesheets/,
				loader: 'style!css?outputStyle=expanded'
			},
			{
				test: /\.scss$/,
				include: /stylesheets/,
				//loader: ExtractTextPlugin.extract('style-loader', 'css!sass?outputStyle=expanded')
				loader: 'style!css!sass?outputStyle=expanded'
			},
			{
				test: /\.(jpg|png|gif|eot|woff|ttf|svg)/,
				loader: "file"
			}
		]
	},
	devServer: {
		contentBase: "./build",
	},
	plugins: [
		new ExtractTextPlugin('[name].css'),
		devFlagPlugin,
		new webpack.NoErrorsPlugin()
	]

};
