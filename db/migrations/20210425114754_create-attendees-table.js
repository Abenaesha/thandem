exports.up = function (knex) {
  return knex.schema.createTable("attendees", (attendeesTable) => {
    attendeesTable.increments("attendee_id").primary()
    attendeesTable
      .string("attendee")
      .references("users.username")
      .onDelete("CASCADE")
    attendeesTable
      .integer("ride_id")
      .references("rides.ride_id")
      .onDelete("CASCADE")
    attendeesTable.string("name").notNullable()
  })
}

exports.down = function (knex) {
  return knex.schema.dropTable("attendees")
}
