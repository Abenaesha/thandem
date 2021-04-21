const connection = require( "../db/connection" )

exports.fetchUsers = () => {
	return connection( "users" ).select( "*" )
}