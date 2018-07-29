const path = require("path")
// include the js minification plugin
const UglifyJSPlugin = require("uglifyjs-webpack-plugin")

// include the css extraction and minification plugins
const MiniCssExtractPlugin = require("mini-css-extract-plugin")
const OptimizeCSSAssetsPlugin = require("optimize-css-assets-webpack-plugin")

const BrowserSyncPlugin = require("browser-sync-webpack-plugin")

module.exports = {
	entry: ["./assets/src/js/app.js", "./assets/src/css/app.scss"],
	output: {
		filename: "./build/js/app.min.[hash].js",
		path: path.resolve(__dirname)
	},
	module: {
		rules: [
			// perform js babelization on all .js files
			{
				test: /\.js$/,
				exclude: /node_modules/,
				use: {
					loader: "babel-loader",
					options: {
						presets: ["babel-preset-env"]
					}
				}
			},
			// compile all .scss files to plain old css
			{
				test: /\.(sass|scss)$/,
				use: [MiniCssExtractPlugin.loader, "css-loader", "sass-loader"]
			}
		]
	},
	plugins: [
		new BrowserSyncPlugin({
			proxy: "http://loro.test/",
			port: 8080
		}),
		// extract css into dedicated file
		new MiniCssExtractPlugin({
			filename: "./build/css/app.min.[hash].css"
		})

	],
	optimization: {
		minimizer: [
			// enable the js minification plugin
			new UglifyJSPlugin({
				cache: true,
				parallel: true
			}),
			// enable the css minification plugin
			new OptimizeCSSAssetsPlugin({})
		]
	}
}
