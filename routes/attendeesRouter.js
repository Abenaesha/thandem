const attendeesRouter = require( "express" ).Router()

const { removeAttendeeById } = require( "../controllers/attendeesController" )

attendeesRouter
	.route( "/:attendee_id" )
	.delete(removeAttendeeById)
	
module.exports = attendeesRouter