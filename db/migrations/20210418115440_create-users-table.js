
exports.up = function(knex) {
	return knex.schema.createTable( "users", ( userTable ) => {
		userTable.increments("user_id").primary()
		userTable.string("username").notNullable()
		userTable.string("password").notNullable()
		userTable.string("email").unique().notNullable()
		userTable.string("avatar_url").notNullable()
		userTable.string("first_name")
		userTable.string("last_name")
	})
}

exports.down = function(knex) {
	return knex.schema.dropTable("users")
}
