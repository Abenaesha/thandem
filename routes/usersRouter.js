const usersRouter = require( "express" ).Router()
const { getRidesByUsername } = require( "../controllers/ridesController" )
const { getUsers, insertUser, getUserByUsername, updateUserByUsername, removeUserByUsername } = require( "../controllers/usersController" )

usersRouter
	.route( "/" )
	.get( getUsers )
	.post( insertUser )
	
usersRouter
	.route( "/:username" )
	.get( getUserByUsername )
	.patch( updateUserByUsername )
	.delete( removeUserByUsername )

usersRouter
	.route( "/:username/rides" )
	.get(getRidesByUsername)
	
module.exports = usersRouter