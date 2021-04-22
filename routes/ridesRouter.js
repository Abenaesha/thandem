const { getRides, getRideById, insertRide } = require( "../controllers/ridesController" )

const ridesRouter = require( "express" ).Router()

ridesRouter
	.route( "/" )
	.get( getRides )
	.post(insertRide)
	
ridesRouter
	.route( "/:ride_id" )
	.get( getRideById )


module.exports = ridesRouter