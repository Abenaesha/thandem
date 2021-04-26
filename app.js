const express = require( "express" )
// const cors = require("cors")
const apiRouter = require( "./routes/apiRouter" )
const { handle405s, handle500s,	customErrorHandler,	psqlErrorHandler,  } = require("./controllers/errorHandling")

const app = express()
// app.use(cors())
app.use(express.json())
app.use("/api", apiRouter)
app.all( "/*", handle405s )
app.use(customErrorHandler)
app.use(psqlErrorHandler)
app.use(handle500s)

module.exports = app