const { Client } = require( "pg" )


const client = new Client(
	require("./dbConfig")
)
client.connect()


client.query( "SELECT * FROM hello;", ( err, res ) => {
	err ? console.log(err, "ERROR") : console.log(res)
})