
exports.up = function(knex) {
	return knex.schema.createTable( "rides", ( rideTable ) => {
		rideTable.increments( "ride_id" ).primary()
		rideTable.string( "author" ).references( "users.username" ).onDelete( "CASCADE" )
		rideTable.datetime("ride_date")
		rideTable.string( "location" )
		rideTable.string( "ride_type" )
		rideTable.string( "exprience_level" )
		rideTable.string("attendees").refrences("users.username")
		rideTable.timestamp("created_at").defaultTo(knex.fn.now())
	})
}

exports.down = function(knex) {
	return knex.schema.dropTable("rides")
}
