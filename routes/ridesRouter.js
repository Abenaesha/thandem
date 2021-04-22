const { getRides, getRideById } = require( "../controllers/ridesController" )

const ridesRouter = require( "express" ).Router()

ridesRouter
	.route( "/" )
	.get( getRides )
	
ridesRouter
	.route( "/:ride_id" )
	.get( getRideById )


module.exports = ridesRouter