exports.up = function (knex) {
	return knex.schema.createTable( "users", ( userTable ) => {
		userTable.string("username").primary().notNullable()
		userTable.string("password")
		userTable.string("email")
		userTable.string("avatar_url")
		userTable.string("first_name")
		userTable.string("last_name")
		userTable.string("location")
		userTable.string("routes_data")
		userTable.string("bike_type")
		userTable.string("rider_level")
	})
}

exports.down = function (knex) {
	return knex.schema.dropTable("users")
}
