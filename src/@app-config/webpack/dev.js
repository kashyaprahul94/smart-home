const _ = require( "lodash" );

let buildConfig = _.merge( {}, require( "./common" )( "dev" ) );

module.exports = buildConfig.webpack;