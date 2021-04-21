const apiRouter = require("express").Router()
const usersRouter = require("./usersRouter")
const ridesRouter = require("./ridesRouter")

apiRouter.use("/users", usersRouter)
apiRouter.use("/rides", ridesRouter)

module.exports = apiRouter