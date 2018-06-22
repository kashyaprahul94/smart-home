const _ = require( "lodash" );

module.exports = () => {
	return ( _.merge( {}, require( "./common" )() ) ).webpack;
};