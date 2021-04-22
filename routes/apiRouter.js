const apiRouter = require("express").Router()
const usersRouter = require("./usersRouter")
const ridesRouter = require( "./ridesRouter" )
//const commentsRouter = require("./commentsRouter")

apiRouter.use("/users", usersRouter)
apiRouter.use( "/rides", ridesRouter )
// apiRouter.use("/comments", commentsRouter)

module.exports = apiRouter