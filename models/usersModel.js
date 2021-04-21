const connection = require( "../db/connection" )

exports.fetchUsers = () => {
	return connection( "users" ).select( "*" )
}

exports.postUser = ( newUser ) => {
	return connection("users").insert(newUser).returning("*")
}

exports.fetchUserByUsername = ( username ) => {
	return connection( "users" ).where( { username } ).then( ( user ) => {
		return user[0]
	})
}