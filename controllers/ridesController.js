const { fetchRides, fetchRideById } = require( "../models/ridesModel" )


exports.getRides = (req, res, next) => {
	fetchRides().then( ( rides ) => {
		res.status(200).send({rides})
	} )
		.catch( err => next( err ) )
}

exports.getRideById = (req, res, next) => {
	const { ride_id } = req.params
	fetchRideById( ride_id ).then( ride => {
		//console.log( ride )
		res.status(200).send({ride})
	} )
		.catch(err => next(err))
}