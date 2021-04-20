exports.up = function(knex) {
	return knex.schema.createTable( "rides", ( rideTable ) => {
		rideTable.increments( "ride_id" ).primary()
		rideTable.string( "author" ).references( "users.username" ).onDelete( "CASCADE" )
		rideTable.integer("user_id").references("users.user_id").onDelete("CASCADE")
		rideTable.datetime("ride_date").notNullable()
		rideTable.string( "route_data" ).notNullable()
		rideTable.string( "ride_type" ).notNullable()
		rideTable.string( "title" ).notNullable()
		rideTable.string("description").notNullable()
		rideTable.string( "exprience_level" ).notNullable()
		rideTable.integer("joins").defaultTo(0)
		rideTable.string("attendees").references("users.username")
		rideTable.timestamp("created_at").defaultTo(knex.fn.now())
	})
}

exports.down = function(knex) {
	return knex.schema.dropTable("rides")
}
