const apiRouter = require("express").Router()
const usersRouter = require("./usersRouter")
const ridesRouter = require( "./ridesRouter" )
const commentsRouter = require("./commentsRouter")
const attendeesRouter = require( "./attendeesRouter" )

apiRouter.use("/users", usersRouter)
apiRouter.use( "/rides", ridesRouter )
apiRouter.use( "/comments", commentsRouter )
apiRouter.use("/attendees", attendeesRouter)

module.exports = apiRouter