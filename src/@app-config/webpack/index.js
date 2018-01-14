const Helper = require( "../helper" );

module.exports = function ( env ) {
	return require( "./" + Helper.landscape( env ) );
};