const Utils = require( "./utils" );
const NodeExternals = require( "webpack-node-externals" );
const CleanupWebpackPlugin = require( "webpack-cleanup-plugin" );

const BuildDir = Utils.Root( "build" );

module.exports = () => {
	
	return {
		
		info: {
			buildDir: BuildDir
		},
		
		webpack: {
			node: {
				console: true,
				fs: "empty",
				net: "empty",
				tls: "empty"
			},
			entry: Utils.Root( "index.ts" ),
			output: {
				path: BuildDir,
				filename: "index.js"
			},
			resolve: {
				extensions: [ ".js", ".ts", ".tsx" ],
				alias: {
					"@app-config": Utils.Root( "src", "@app-config" )
				},
				modules: [
					Utils.Root( "node_modules" ),
					Utils.Root( "config" ),
					Utils.Root( "src" )
				]
			},
			target: "node",
			externals: [ NodeExternals() ],
			module: {
				loaders: [
					{
						test: /\.ts(x?)$/,
						loader: [ "babel-loader", "awesome-typescript-loader" ],
						exclude: /node_modules/
					}
				]
			},
			plugins: [
				
				new CleanupWebpackPlugin(),
			
			]
		}
	}
};