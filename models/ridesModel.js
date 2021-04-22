const connection = require( "../db/connection" )

exports.fetchRides = () => {
	return connection("rides").select("*")
}

exports.fetchRideById = ( ride_id ) => {
	return connection( "rides" ).where( { ride_id } ).then( (ride) => {
		return ride[0]
	})
}

exports.fetchRidesByUsername = ( username,  ) => {
	return connection( "rides" ).where( { username } ).then( ( rides ) => {
		console.log( rides )
		return rides
	})
}

exports.postRide = (newRide) => {
	return connection("rides").insert(newRide).returning("*")
}

exports.patchRideById = (ride_id, votes) => {
	return connection( "rides" )
		.where( { ride_id } )
		.increment( { votes } || 0 )
		.returning( "*" )
		.then( ( [ride] ) => {
			return ride
		})
}