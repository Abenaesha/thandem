const commentsRouter = require( "express" ).Router()

const { updateCommentById, removeCommentById } = require( "../controllers/commentsController" )

commentsRouter
	.route( "/:comment_id" )
	.patch( updateCommentById )
	.delete(removeCommentById)
	
module.exports = commentsRouter