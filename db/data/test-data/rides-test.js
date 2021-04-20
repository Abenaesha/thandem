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
    user_id: 1,
    ride_date: 12 / 05 / 2021,
    route_data: "chester to manchester",
    ride_type: "road",
    title: "sunny road ride",
    description: "anyone want to join me on a loop from chester to manchester",
    experience_level: "advanced",
  },
  {
    author: "RaofRides",
    user_id: 2,
    ride_date: 13 / 05 / 2021,
    route_data: "Manchester",
    ride_type: "road",
    title: "Manchester loop",
    description: "anyone want to join me on a loop around manchester",
    experience_level: "intermediate",
  },
  {
    author: "RolllingDan",
    user_id: 3,
    ride_date: 11 / 05 / 2021,
    route_data: "Sheffield hills",
    ride_type: "cross country",
    title: "gentle pedal outside sheffield",
    description: "anyone in the sheffield area want to join me on a loop?",
    experience_level: "beginner",
  },
]