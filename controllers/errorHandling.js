exports.handle405s = (req, res) => {
	res.status(405).send({ msg: "Method not allowed!" })
}

exports.customErrorHandler = (err, req, res, next) => {
	if (err.status) {
		res.status(err.status).send({ msg: err.msg })
	} else next(err)
}

exports.psqlErrorHandler = (err, req, res, next) => {
	const psqlBadRequestCodes = ["22P02"]
	if (psqlBadRequestCodes.includes(err.code)) {
		res.status(400).send({
			msg: `Sorry but your request on path ${req.url} is a bad request`,
		})
	} else next(err)
}

exports.handle500s = (err, req, res) => {
	res.status(500).send({ msg: "Server Error" })
}
