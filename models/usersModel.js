const connection = require("../db/connection")

exports.fetchUsers = () => {
  return connection("users").select("*")
}

exports.postUser = (newUser) => {
  return connection("users").insert(newUser).returning("*")
}

exports.fetchUserByUsername = (username) => {
  return connection("users")
    .where({ username })
    .then((user) => {
      if (user.length === 0) {
        return Promise.reject({ status: 404, msg: `${username} not found` })
      } else return user[0]
    })
}

exports.patchUserByUsername = (username, avatar_url, location, password) => {
  return connection("users")
    .where({ username })
    .update({ avatar_url, location, password })
    .returning("*")
    .then(([user]) => {
      if (!"location" in user) {
        return Promise.reject({ status: 404, msg: `${username} not found` })
      } else return user
    })

exports.deleteUserByUsername = (username) => {
  return connection("users")
    .where({ username })
    .del()
    .then(() => {
      if (!username) {
        return Promise.reject({ status: 404, msg: `${username} not found` })
      } else return { msg: `${username} has been successfully deleted` }
    })
}
