const ENV = process.env.NODE_ENV || "development"

const testData = require( "./test-data/index" )
const devData = require( "./dev-data/index" )

const dataObj = {
	test: testData,
	development: devData,
}

module.exports = dataObj[ENV]