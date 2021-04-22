const connection = require( "../db/connection" )

exports.fetchRides = () => {
	return connection("rides").select("*")
}

exports.fetchRideById = ( ride_id ) => {
	return connection( "rides" ).where( { ride_id } ).then( (ride) => {
		return ride[0]
	})
}

exports.fetchRidesByUsername = ( username ) => {
	return connection( "rides" ).where( { username } ).then( ( rides ) => {
		console.log( rides )
		return rides
	})
}

exports.postRide = ( newRide ) => {
	return connection( "rides" ).insert( newRide ).returning( "*" ).then( ride => {
		console.log( ride )
		return ride
	})
}