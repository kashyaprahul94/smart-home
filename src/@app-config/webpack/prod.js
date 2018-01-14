const _ = require( "lodash" );

let buildConfig = _.merge( {}, require( "./common" )( "prod" ) );

module.exports = buildConfig.webpack;