const usersRouter = require( "express" ).Router()
const { getUsers } = require( "../controllers/usersController" )

usersRouter.route("/").get(getUsers)
module.exports = usersRouter