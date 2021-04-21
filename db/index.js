const { Client } = require( "pg" )

const client = new Client(
	require("./dbConfig")
)
client.connect()

client.query( "SELECT * FROM rides;", ( err, res ) => {
	err ? console.log(err, "ERROR") : console.log(res)
} )

// psql    --host=thandem5.c0w8otlrrch5.us-east-2.rds.amazonaws.com    --port=5432    --username=teamthandem5    --password    --dbname=test