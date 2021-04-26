const connection = require("../db/connection")

exports.fetchRides = (  {sort_by, order, author, ride_type, experience_level, location } ) => {
	return connection.select( "rides.*" )
		.from( "rides" )
		.count( "comments.comment_id", { as: "comment_count " } )
		.leftJoin( "comments", "comments.ride_id", "rides.ride_id" )
		.groupBy( "rides.ride_id" )
		.orderBy( sort_by || "created_at", order || "desc" )
		.modify( query => {
			if ( author ) {
				query.where("rides.author", author)
			}
			if ( ride_type ) {
				query.where({ride_type})
			}
			if ( experience_level ) {
				query.where({experience_level})
			}
			if ( location ) {
				query.where({location})
			}
		})
		.returning( "*" )
		.then( rides => {
			return { rides, total_count: rides.length }
		})
}

exports.fetchRideById = (ride_id) => {
  return connection("rides")
    .where({ ride_id })
    .then((ride) => {
      if (ride.length === 0) {
        return Promise.reject({
          status: 404,
          msg: `Ride ID ${ride_id} not found`,
        })
      }
      return ride[0]
    })
}

exports.fetchRidesByUsername = ( username,  ) => {
	return connection( "rides" ).where( { username } ).then( ( rides ) => {
		return rides
	})
}

exports.postRide = (newRide) => {
  return connection("rides").insert(newRide).returning("*")
}

exports.patchRideById = (ride_id, votes) => {
  return connection("rides")
    .where({ ride_id })
    .increment({ votes } || 0)
    .returning("*")
    .then(([ride]) => {
      if (!"author" in ride) {
        return Promise.reject({
          status: 404,
          msg: `Ride ID ${ride_id} not found`,
        })
      } else return ride
    })

exports.deleteRideById = (ride_id) => {
  return connection("rides")
    .where({ ride_id })
    .del()
    .then(() => {
      if (!ride_id) {
        return Promise.reject({ status: 404, msg: `Ride ID ${ride} not found` })
      } else return { msg: `Ride ID ${ride_id} has been successfully deleted` }
    })
}
