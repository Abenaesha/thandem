const connection = require( "../db/connection" )

exports.fetchCommentsByRideId = ( ride_id ) => {
	return connection( "comments" ).select("*").where( { ride_id } )	
}

exports.postCommentByRideId = ( ride_id, { author, body } ) => {
	
	const newComment = {
		body: body,
		ride_id: ride_id,
		author: author,
		votes: 0,
		created_at: new Date()
	}

	return connection( "comments" ).insert( newComment ).returning( "*" ).then( ( [ comment ] ) => {
		return comment
	})
}

exports.patchCommentById = ( comment_id, body ) => {
	return connection( "comments" ).where( { comment_id } ).update( { body } ).returning( "*" )
}

exports.deleteCommentById = ( comment_id ) => {
	return connection("comments").where({comment_id}).del().then( () => {
		return { msg: `Comment with id ${ comment_id } has been successfully deleted` }
	})
}