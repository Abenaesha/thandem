const {
  fetchRides,
  fetchRideById,
  fetchRidesByUsername,
  postRide,
  patchRideById,
  deleteRideById,
} = require("../models/ridesModel")

exports.getRides = (req, res, next) => {
  fetchRides()
    .then((rides) => {
      res.status(200).send({ rides })
    })
    .catch((err) => next(err))
}

exports.getRideById = (req, res, next) => {
  const { ride_id } = req.params
  fetchRideById(ride_id)
    .then((ride) => {
      res.status(200).send({ ride })
    })
    .catch((err) => next(err))
}

exports.getRidesByUsername = (req, res, next) => {
  const { username } = req.params
  fetchRidesByUsername(username)
    .then((rides) => {
      console.log(rides)
      res.status(200).send({ rides })
    })
    .catch((err) => next(err))
}

exports.insertRide = (req, res, next) => {
  postRide(req.body)
    .then(([newRide]) => {
      res.status(201).send({ newRide })
    })
    .catch((err) => next(err))
}

exports.updateRideById = (req, res, next) => {
  const { ride_id } = req.params
  const { votes } = req.body
  patchRideById(ride_id, votes)
    .then((ride) => {
      res.status(200).send({ ride })
    })
    .catch((err) => next(err))
}

exports.removeRideById = (req, res, next) => {
  const { ride_id } = req.params
  deleteRideById(ride_id)
    .then((msg) => {
      res.status(200).send(msg)
    })
    .catch((err) => next(err))
}
