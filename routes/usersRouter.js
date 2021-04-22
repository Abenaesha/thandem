const usersRouter = require( "express" ).Router()
const { getUsers, insertUser, getUserByUsername, updateUserByUsername } = require( "../controllers/usersController" )

usersRouter.route( "/" )
	.get( getUsers )
	.post( insertUser )
	
usersRouter.route( "/:username" )
	.get( getUserByUsername )
	.patch(updateUserByUsername)
	
	
module.exports = usersRouter