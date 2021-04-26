/* eslint-disable no-mixed-spaces-and-tabs */

// const knex = require("knex")
// const dbConfig = require( "../knexfile" )

// const connection = knex(dbConfig)

// module.exports = connection

const ENV = process.env.NODE_ENV || "development"
const knex = require("knex")

const dbConfig =
  ENV === "production"
  	? { 
  		client: "pg", 
  		connection: {
  			user: process.env.DB_USER,
  			host: process.env.DB_HOST,
  			database: process.env.DB_DATABASE,
  			password: process.env.DB_PASSWORD,
  			port: process.env.DB_PORT,
  		} 
  	}
  	: require( "../knexfile" )
    
module.exports = knex(dbConfig)