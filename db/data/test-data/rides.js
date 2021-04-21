/* 
ride_id - - - auto generated and assigned
route_data - - -will be pulled in from strava api via the strava id listed in user data - - -(added place holder text for time being)
user_id - - - do we need to reference this f we are referencing username?
joins - - - not sure what this column is for
attendees - - - not sure if we need an extra table for this (Attendee table has columns for user_ids/usernames && references the ride_id)??
*/

module.exports = [
	{
		author: "t0gden",
		ride_date: 1611824163389,
		route_data: "chester to manchester",
		ride_type: "road",
		title: "sunny road ride",
		description: "anyone want to join me on a loop from chester to manchester",
		experience_level: "advanced",
		created_at: 1611324163389,
		votes: 5,
	},
	{
		author: "raofRides",
		ride_date: 1612329163389,
		route_data: "Manchester",
		ride_type: "road",
		title: "Manchester loop",
		description: "anyone want to join me on a loop around manchester",
		experience_level: "intermediate",
		created_at: 1601324163389,
		votes: 0
	},
	{
		author: "rollingDan",
		ride_date: 1619324193389,
		route_data: "Sheffield hills",
		ride_type: "cross country",
		title: "gentle pedal outside sheffield",
		description: "anyone in the sheffield area want to join me on a loop?",
		experience_level: "beginner",
		created_at: 1601324163389,
		votes: -10
	},
]