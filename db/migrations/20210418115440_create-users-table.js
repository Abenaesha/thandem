exports.up = function(knex) {
	return knex.schema.createTable( "users", ( userTable ) => {
		userTable.increments("user_id").primary()
		userTable.string("username").unique().notNullable()
		userTable.string("password")
		userTable.string("email").unique().notNullable()
		userTable.string("avatar_url")
		userTable.string("first_name")
		userTable.string("last_name")
		userTable.string( "location" )
		userTable.string("routes_data")
		userTable.timestamp("created_at").defaultTo(knex.fn.now())
	})
}

exports.down = function(knex) {
	return knex.schema.dropTable("users")
}
