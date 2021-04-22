const { getRides, getRideById, insertRide, updateRideById } = require( "../controllers/ridesController" )

const ridesRouter = require( "express" ).Router()

ridesRouter
	.route( "/" )
	.get( getRides )
	.post( insertRide )

	
ridesRouter
	.route( "/:ride_id" )
	.get( getRideById )
	.patch(updateRideById)


module.exports = ridesRouter