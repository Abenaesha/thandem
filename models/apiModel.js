const fs = require("fs")
// eslint-disable-next-line no-unused-vars
const json = require("../endpoints.json")

exports.fetchAllEndpoints = () => {
	return new Promise((res, rej) => {
		fs.readFile( "endpoints.json", "utf8", ( err, data ) => {
			err ? rej(err) 
				: res(JSON.parse(data))
		})
	})
}