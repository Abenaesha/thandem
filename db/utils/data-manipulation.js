exports.amendTimestamp = (data) => {
	const amendedInfo = data.map( ( { ...info } ) => {
		const unixTimestamp = info.created_at
		info.created_at = new Date( unixTimestamp )
		return info
	} )
	return amendedInfo
}

exports.amendRideDate = (data) => {
	const amendedInfo = data.map( ( { ...info } ) => {
		const unixTimestamp = info.created_at
		info.created_at = new Date( unixTimestamp )
		const unixRideTime = info.ride_date
		info.ride_date = new Date(unixRideTime)
		return info
	} )
	return amendedInfo
}


