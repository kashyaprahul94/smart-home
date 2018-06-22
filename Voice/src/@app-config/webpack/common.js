const Process = require( "process" );
const Utils = require( "./utils" );
const NodeExternals = require( "webpack-node-externals" );
const CopyWebpackPlugin = require( "copy-webpack-plugin" );
const CleanupWebpackPlugin = require( "webpack-cleanup-plugin" );

const Root = ( ...path ) => {
	return [ Process.cwd(), path ].join( "/" );
};
const RootPath = ( ...args ) => {
	return Root( args );
};

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
				
				new CopyWebpackPlugin(
					
					[
						{
							from: RootPath( "package.json" ),
							to: BuildDir,
							force: true
						},
						{
							from: RootPath( ".cfignore" ),
							to: BuildDir,
							force: true
						},
						{
							from: RootPath( "manifest.yml" ),
							to: BuildDir,
							force: true
						},
						{
							from: RootPath( "public" ),
							to: [ BuildDir, "public" ].join( "/" ),
							force: true
						}
					], {
						ignore: [ "*.ts", ".tsconfig.json", ".DS_Store" ]
					}
				),
			]
		}
	}
};