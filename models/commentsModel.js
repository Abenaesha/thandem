const connection = require( "../db/connection" )

exports.fetchCommentsByRideId = ( ride_id ) => {
	return connection( "comments" ).select("*").where( { ride_id } )	
}

exports.postCommentByRideId = (newComment) => {
	return connection( "comments" ).insert( newComment ).returning("*")
}