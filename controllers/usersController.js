const {
  fetchUsers,
  postUser,
  fetchUserByUsername,
  patchUserByUsername,
  deleteUserByUsername,
} = require("../models/usersModel")

exports.getUsers = (req, res, next) => {
  fetchUsers()
    .then((users) => {
      res.status(200).send({ users })
    })
    .catch((err) => next(err))
}

exports.insertUser = (req, res, next) => {
  postUser(req.body)
    .then(([newUser]) => {
      res.status(201).send({ newUser })
    })
    .catch((err) => {
      next(err)
    })
}

exports.getUserByUsername = (req, res, next) => {
  const { username } = req.params
  fetchUserByUsername(username)
    .then((user) => {
      res.status(200).send({ user })
    })
    .catch((err) => {
      next(err)
    })
}

exports.updateUserByUsername = (req, res, next) => {
  const { username } = req.params
  const { avatar_url, location, password } = req.body
  patchUserByUsername(username, avatar_url, location, password)
    .then((user) => {
      res.status(200).send({ user })
    })
    .catch((err) => {
      next(err)
    })
}
exports.removeUserByUsername = (req, res, next) => {
  const { username } = req.params
  deleteUserByUsername(username)
    .then((msg) => {
      res.status(200).send(msg)
    })
    .catch((err) => {
      next(err)
    })
}
