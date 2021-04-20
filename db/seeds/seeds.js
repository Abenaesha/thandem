const { usersData, ridesData, commentsData } = require("../data/index")
//console.log(ridesData)
const { amendTimestamp, amendRideDate } = require("../utils/data-manipulation.js")

exports.seed = function (knex) {
	return knex.migrate
		.rollback()
		.then(() => {
			return knex.migrate.latest()
		})
		.then( () => {
			return knex("users").insert(usersData).returning("*")
		} )
		.then( () => {
			const correctedTimestamp = amendRideDate( ridesData )
			return knex("rides").insert(correctedTimestamp).returning("*")
		} )
		.then( () => {
			const correctedTimestamp = amendTimestamp( commentsData )
			return knex("comments").insert(correctedTimestamp)
		})
}
