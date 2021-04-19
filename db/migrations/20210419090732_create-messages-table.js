exports.up = function(knex) {
	return knex.schema.createTable( "messages", (messagesTable) => {
		messagesTable.increments( "message_id" ).primary()
		messagesTable.string( "author" ).references( "users.username" ).onDelete( "CASCADE" )
		messagesTable.integer("conversation_id").references("conversations.conversation_id").onDelete("CASCADE")
		messagesTable.text("body").notNullable()
		messagesTable.timestamp( "created_at" ).defaultTo( knex.fn.now() )
	})
}

exports.down = function(knex) {
	return knex.schema.dropTable("conversations")
}
