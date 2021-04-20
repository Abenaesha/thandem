const { usersData, ridesData, commentsData } = require("../data/index")

const { amendTimestamp } = require("../utils/data-manipulation.js")

exports.seed = function (knex) {
  return knex.migrate
    .rollback()
    .then(() => {
      return knex.migrate.latest()
    })
    .then(() => {
      return knex("users").insert(usersData).returning("*")
    })
}
