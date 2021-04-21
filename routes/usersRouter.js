const usersRouter = require( "express" ).Router()
const { getUsers, insertUser, getUserByUsername } = require( "../controllers/usersController" )

usersRouter.route( "/" )
	.get( getUsers )
	.post( insertUser )
	
usersRouter.route( "/:username" )
	.get( getUserByUsername )
	
	
module.exports = usersRouter