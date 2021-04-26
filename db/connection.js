/* eslint-disable no-mixed-spaces-and-tabs */

// const knex = require("knex")
// const dbConfig = require( "../knexfile" )

// const connection = knex(dbConfig)

// module.exports = connection
console.log(process.env, "ENV")
const ENV = process.env.NODE_ENV || "development"
const knex = require("knex")

const dbConfig =
  ENV === "production"
  	? { 
  		client: "pg", 
  		connection: {
  			user: process.env.USER,
  			host: process.env.HOST,
  			database: process.env.DATABASE,
  			password: process.env.PASSWORD,
  			port: process.env.PORT,
  		} 
  	}
  	: require( "../knexfile" )
    
module.exports = knex(dbConfig)