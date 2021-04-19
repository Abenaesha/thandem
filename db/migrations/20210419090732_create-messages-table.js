
exports.up = function(knex) {
	return knex.schema.createTable( "messages", () => {
		
	})
}

exports.down = function(knex) {
	return knex.schema.dropTable("conversations")
}
