
exports.up = function(knex) {
	return knex.schema.createTable( "conversations", () => {
		
	})
}

exports.down = function(knex) {
	return knex.schema.dropTable("conversations")
}
