const connection = require( "../db/connection" )

exports.fetchRides = () => {
	return connection("rides").select("*")
}

exports.fetchRideById = ( ride_id ) => {
	return connection( "rides" ).where( { ride_id } ).then( (ride) => {
		//console.log( ride )
		return ride[0]
	})
}