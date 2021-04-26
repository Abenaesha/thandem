const { handle405s } = require("../controllers/errorHandling")
const { getCommentsByRideId, insertCommentByRideId } = require( "../controllers/commentsController" )
const { getRides, getRideById, insertRide, updateRideById, removeRideById } = require( "../controllers/ridesController" )
const { getAttendeesByRideId, insertAttendeeByRideId } = require("../controllers/attendeesController")

const ridesRouter = require("express").Router()

ridesRouter.route("/").get(getRides).post(insertRide).all(handle405s)

ridesRouter
  .route("/:ride_id")
  .get(getRideById)
  .patch(updateRideById)
  .delete(removeRideById)
  .all(handle405s)

ridesRouter
	.route( "/:ride_id/comments" )
	.get( getCommentsByRideId )
	.post( insertCommentByRideId )

ridesRouter
	.route( "/:ride_id/attendees" )
	.get( getAttendeesByRideId )
	.post(insertAttendeeByRideId)

module.exports = ridesRouter
