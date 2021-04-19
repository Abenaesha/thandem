exports.up = function(knex) {
	return knex.schema.createTable( "conversations", ( conversationTable ) => {
		conversationTable.increments( "conversation_id" ).primary()
		conversationTable.string("author").references("users.username").onDelete("CASCADE")
	})
}

exports.down = function(knex) {
	return knex.schema.dropTable("conversations")
}
