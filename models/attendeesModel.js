const connection = require("../db/connection")

exports.fetchAttendeesByRideId = (ride_id) => {
	return connection("attendees").select("*").where({ ride_id })
}

exports.postAttendeeByRideId = (newAttendee) => {
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

exports.deleteAttendeeByUsername = (ride_id, username) => {
	console.log(ride_id, username, "inside model")
	return connection("attendees")
		.where({ ride_id }, "author", "=", username)
		.del()
		.then(() => {
			return {
				msg: `user ${username} has been successfully removed from ride id ${ride_id}`,
			}
		})
}
