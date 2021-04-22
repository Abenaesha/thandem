const { fetchCommentsByRideId, postCommentByRideId } = require( "../models/commentsModel" )


exports.getCommentsByRideId = ( req, res, next ) => {
	const { ride_id } = req.params
	fetchCommentsByRideId( ride_id ).then( (comments) => {
		res.status(200).send({comments})
	} )
		.catch(err => next(err))
}

exports.insertCommentByRideId = ( req, res, next ) => {
	postCommentByRideId(req.body ).then( ( [newComment]  ) => {
		res.status(201).send({newComment})
	} )
		.catch(err => next(err))
}