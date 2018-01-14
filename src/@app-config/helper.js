module.exports = {
	
	landscape: function ( env ) {
		
		var result = env || "dev";
		
		if ( result === "test" ) {
			result = "test";
		} else if ( result === "stage" ) {
			result = "stage";
		} else if ( result === "prod" ) {
			result = "prod";
		}
		
		return result;
	}
};