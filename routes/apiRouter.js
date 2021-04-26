const apiRouter = require("express").Router()
const usersRouter = require("./usersRouter")
const ridesRouter = require( "./ridesRouter" )
const commentsRouter = require("./commentsRouter")
const attendeesRouter = require( "./attendeesRouter" )
const { getAllEndpoints } = require( "../controllers/apiController" )
apiRouter
	.route( "/" )
	.get(getAllEndpoints)

apiRouter.use("/users", usersRouter)
apiRouter.use( "/rides", ridesRouter )
apiRouter.use( "/comments", commentsRouter )
apiRouter.use("/attendees", attendeesRouter)

module.exports = apiRouter