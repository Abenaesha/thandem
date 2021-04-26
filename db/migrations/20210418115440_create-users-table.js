exports.up = function (knex) {
	return knex.schema.createTable( "users", ( userTable ) => {
		userTable.string("username").primary().notNullable()
		userTable.string("password")
		userTable.string("email").unique()
		userTable.string("avatar_url")
		userTable.string("first_name")
		userTable.string("last_name")
		userTable.string("location")
		userTable.specificType("routes_data", "text[]")
		userTable.string("bike_type")
		userTable.string("rider_level")
	})
}

exports.down = function (knex) {
	return knex.schema.dropTable("users")
}
