const { fetchCommentsByRideId, postCommentByRideId, patchCommentById, deleteCommentById } = require( "../models/commentsModel" )


exports.getCommentsByRideId = ( req, res, next ) => {
	const { ride_id } = req.params
	fetchCommentsByRideId( ride_id ).then( (comments) => {
		res.status(200).send({comments})
	} )
		.catch(err => next(err))
}

exports.insertCommentByRideId = ( req, res, next ) => {
	const { ride_id } = req.params
	const post = req.body
	postCommentByRideId(ride_id, post).then( ( [newComment]  ) => {
		res.status(201).send({newComment})
	} )
		.catch(err => next(err))
}

exports.updateCommentById = ( req, res, next ) => {
	const { comment_id } = req.params
	const { body } = req.body
	patchCommentById( comment_id, body ).then( ( [comment] ) => {
		res.status(200).send({comment})
	} )
		.catch( err => next( err ) )
}

exports.removeCommentById = ( req, res, next ) => {
	const { comment_id } = req.params
	deleteCommentById(comment_id).then( (msg) => {
		res.status(200).send(msg)
	} )
		.catch(err=>next(err))
}