const { getCommentsByRideId, insertCommentByRideId } = require( "../controllers/commentsController" )
const { getRides, getRideById, insertRide, updateRideById, removeRideById } = require( "../controllers/ridesController" )

const ridesRouter = require( "express" ).Router()

ridesRouter
	.route( "/" )
	.get( getRides )
	.post( insertRide )

	
ridesRouter
	.route( "/:ride_id" )
	.get( getRideById )
	.patch( updateRideById )
	.delete( removeRideById )
	
ridesRouter
	.route( "/:ride_id/comments" )
	.get( getCommentsByRideId )
	.post(insertCommentByRideId)


module.exports = ridesRouter