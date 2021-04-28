const connection = require("../db/connection")

exports.fetchAttendeesByRideId = (ride_id) => {
	return connection("attendees").select("*").where({ ride_id })
}

exports.postAttendeeByRideId = (ride_id, { attendee, name }) => {
	const newAttendee = {
		attendee: attendee,
		name: name,
		ride_id: ride_id,
	}

	return connection("attendees").insert(newAttendee).returning("*")
}

exports.deleteAttendeeById = (attendee_id) => {
	return connection("attendees")
		.where({ attendee_id })
		.del()
		.then(() => {
			return {
				msg: `Attendee with id ${attendee_id} has been successfully deleted`,
			}
		})
}

exports.deleteAttendeeByUsername = ( ride_id, username ) => {
	return connection("attendees")
		.where({ "ride_id": ride_id, "attendee": username })
		.del()
		.then(() => {
			return {
				msg: `user ${username} has been successfully removed from ride id ${ride_id}`,
			}
		})
}
