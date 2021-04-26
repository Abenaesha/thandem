exports.handle405s = (req, res, next) => {
  console.log("in 405s")
  res.status(405).send({ msg: "Method not allowed!" })
}

exports.customErrorHandler = (err, req, res, next) => {
  console.log(err)
  console.log("in custom error handler")
  if (err.status) {
    res.status(err.status).send({ msg: err.msg })
  } else next(err)
}

exports.psqlErrorHandler = (err, req, res, next) => {
  console.log(req.url, "** in psql handler **")
  const psqlBadRequestCodes = ["22P02"]
  if (psqlBadRequestCodes.includes(err.code)) {
    res.status(400).send({
      msg: `Sorry but your request on path ${req.url} is a bad request`,
    })
  } else next(err)
}

exports.handle500s = (err, req, res, next) => {
  res.status(500).send({ msg: "Server Error" })
}