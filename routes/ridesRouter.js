const {
  getRides,
  getRideById,
  insertRide,
  updateRideById,
  removeRideById,
} = require("../controllers/ridesController")
const { handle405s } = require("../controllers/errorHandling")

const ridesRouter = require("express").Router()

ridesRouter.route("/").get(getRides).post(insertRide).all(handle405s)

ridesRouter
  .route("/:ride_id")
  .get(getRideById)
  .patch(updateRideById)
  .delete(removeRideById)
  .all(handle405s)

module.exports = ridesRouter
