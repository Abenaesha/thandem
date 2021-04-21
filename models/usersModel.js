const connection = require( "../db/connection" )

exports.fetchUsers = () => {
	return connection( "users" ).select( "*" )
}

exports.postUser = ( newUser ) => {
	return connection("users").insert(newUser).returning("*")
}

exports.fetchUserByUsername = ( username ) => {
	return connection.select("*").from("users").where( "users.username", username ).then( (user) => {
		console.log( user )
		return user
	})
}