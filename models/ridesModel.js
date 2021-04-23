const connection = require("../db/connection")

exports.fetchRides = () => {
  return connection("rides").select("*")
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

exports.fetchRidesByUsername = (username) => {
  return connection("rides")
    .where({ username })
    .then((rides) => {
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
}

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
