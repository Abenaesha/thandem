const usersRouter = require("express").Router()
const { handle405s } = require("../controllers/errorHandling")
const { getRidesByUsername } = require("../controllers/ridesController")
const {
  getUsers,
  insertUser,
  getUserByUsername,
  updateUserByUsername,
  removeUserByUsername,
} = require("../controllers/usersController")

usersRouter.route("/").get(getUsers).post(insertUser).all(handle405s)

usersRouter
  .route("/:username")
  .get(getUserByUsername)
  .patch(updateUserByUsername)
  .delete(removeUserByUsername)
  .all(handle405s)

usersRouter.route("/:username/rides").get(getRidesByUsername).all(handle405s)

module.exports = usersRouter
