const { fetchUsers, postUser, fetchUserByUsername } = require( "../models/usersModel" )


exports.getUsers = ( req, res, next ) => {
	fetchUsers().then( ( users ) => {
		res.status(200).send({users})
	} )
		.catch(err => next(err))
}

exports.insertUser = ( req, res, next ) => {
	
	postUser( req.body ).then( ([newUser]) => {
		res.status(201).send({newUser})
	} )
		.catch(err => next(err))
}

exports.getUserByUsername = ( req, res, next ) => {
	const { username } = req.params
	fetchUserByUsername( username ).then( ( user ) => {
		res.status(200).send({user})
	} )
		.catch(err => next(err))
}
