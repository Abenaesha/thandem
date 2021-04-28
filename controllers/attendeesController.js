const {
	fetchAttendeesByRideId,
	postAttendeeByRideId,
	deleteAttendeeById,
	deleteAttendeeByUsername,
} = require("../models/attendeesModel")

exports.getAttendeesByRideId = (req, res, next) => {
	const { ride_id } = req.params
	fetchAttendeesByRideId(ride_id)
		.then((attendees) => {
			res.status(200).send({ attendees })
		})
		.catch((err) => next(err))
}

exports.insertAttendeeByRideId = (req, res, next) => {
	postAttendeeByRideId(req.body)
		.then(([newAttendee]) => {
			res.status(201).send({ newAttendee })
		})
		.catch((err) => next(err))
}

exports.removeAttendeeById = (req, res, next) => {
	const { attendee_id } = req.params
	deleteAttendeeById(attendee_id)
		.then((msg) => {
			res.status(200).send(msg)
		})
		.catch((err) => next(err))
}

exports.removeAttendeeByUsername = (req, res, next) => {
	const { ride_id, username } = req.params
	deleteAttendeeByUsername(ride_id, username)
		.then((msg) => {
			res.status(200).send(msg)
		})
		.catch((err) => next(err))
}
