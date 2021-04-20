/* eslint-disable no-undef */
const { amendTimestamp, amendRideDate } = require( "../db/utils/data-manipulation" )


describe( "amendTimestamp", () => {
	it( "return empty array when passed empty array", () => {
		expect( amendTimestamp( [] ) ).toEqual( [] )
	} )
	it( "mendTimeStamp with single object", () => {
		const input = [
			{
				author: "Hannah123",
				ride_id: 1,
				votes: 10,
				body: "would love to join but busy this day, maybe next time!",
				created_at: 1671324163389,
			},
		]
		expect( amendTimestamp( input ) ).toEqual( [
			{
				author: "Hannah123",
				ride_id: 1,
				votes: 10,
				body: "would love to join but busy this day, maybe next time!",
				created_at: new Date( 1671324163389 ),
			},
		] )
	} )
	it( "works on multiple array elements", () => {
		const input = [
			{
				author: "Hannah123",
				ride_id: 1,
				votes: 10,
				body: "would love to join but busy this day, maybe next time!",
				created_at: 1671324163389,
			},
			{
				author: "RaofRides",
				ride_id: 1,
				votes: 3,
				body: "cant make it this time im afraid as i am tutoring :-)",
				created_at: 1691324169389,
			},
		]
		expect( amendTimestamp( input ) ).toEqual( [
			{
				author: "Hannah123",
				ride_id: 1,
				votes: 10,
				body: "would love to join but busy this day, maybe next time!",
				created_at: new Date( 1671324163389 ),
			},
			{
				author: "RaofRides",
				ride_id: 1,
				votes: 3,
				body: "cant make it this time im afraid as i am tutoring :-)",
				created_at: new Date( 1691324169389 ),
			},
		] )
	} )
	it( "does not mutate the original array", () => {
		const input = [
			{
				author: "RaofRides",
				ride_id: 1,
				votes: 3,
				body: "cant make it this time im afraid as i am tutoring :-)",
				created_at: new Date( 1691324169389 ),
			},
		]
		amendTimestamp( input )
		expect( input ).toEqual( [
			{
				author: "RaofRides",
				ride_id: 1,
				votes: 3,
				body: "cant make it this time im afraid as i am tutoring :-)",
				created_at: new Date( 1691324169389 ),
			},
		] )
	} )

} )

describe("amendRideDate", () => {
	it( "return empty array when passed empty array", () => {
		expect( amendRideDate( [] ) ).toEqual( [] )
	} )
	it( "mendRideDate with single object", () => {
		const input1 = [
			{
				author: "RaofRides",
				user_id: 2,
				ride_date: 1612324193389,
				route_data: "Manchester",
				ride_type: "road",
				title: "Manchester loop",
				description: "anyone want to join me on a loop around manchester",
				experience_level: "intermediate",
				created_at: 1601324163389,
				votes: 0
			},
		]
		expect( amendRideDate( input1 ) ).toEqual( [
			{
				author: "RaofRides",
				user_id: 2,
				ride_date: new Date(1612324193389),
				route_data: "Manchester",
				ride_type: "road",
				title: "Manchester loop",
				description: "anyone want to join me on a loop around manchester",
				experience_level: "intermediate",
				created_at: new Date(1601324163389),
				votes: 0
			},
		] )
	} )
	it( "works on multiple array elements", () => {
		const input1 = [
			{
				author: "t0gden",
				user_id: 1,
				ride_date: 1612324163389,
				route_data: "chester to manchester",
				ride_type: "road",
				title: "sunny road ride",
				description: "anyone want to join me on a loop from chester to manchester",
				experience_level: "advanced",
				created_at: 1611324563389,
				votes: 5
			},
			{
				author: "RaofRides",
				user_id: 2,
				ride_date: 1612324193389,
				route_data: "Manchester",
				ride_type: "road",
				title: "Manchester loop",
				description: "anyone want to join me on a loop around manchester",
				experience_level: "intermediate",
				created_at: 1601324163389,
				votes: 0
			},
		]
		expect( amendRideDate( input1 ) ).toEqual( [
			{
				author: "t0gden",
				user_id: 1,
				ride_date: new Date( 1612324163389 ),
				route_data: "chester to manchester",
				ride_type: "road",
				title: "sunny road ride",
				description: "anyone want to join me on a loop from chester to manchester",
				experience_level: "advanced",
				created_at: new Date(1611324563389),
				votes: 5
			},
			{
				author: "RaofRides",
				user_id: 2,
				ride_date: new Date( 1612324193389 ),
				route_data: "Manchester",
				ride_type: "road",
				title: "Manchester loop",
				description: "anyone want to join me on a loop around manchester",
				experience_level: "intermediate",
				created_at: new Date( 1601324163389 ),
				votes: 0
			},
		] )
	} )
	it( "does not mutate the original array", () => {
		const input1 = [
			{
				author: "RaofRides",
				user_id: 2,
				ride_date: new Date(1612324193389),
				route_data: "Manchester",
				ride_type: "road",
				title: "Manchester loop",
				description: "anyone want to join me on a loop around manchester",
				experience_level: "intermediate",
				created_at: new Date(1601324163389),
				votes: 0
			},
		]
		amendRideDate( input1 )
		expect( input1 ).toEqual( [
			{
				author: "RaofRides",
				user_id: 2,
				ride_date: new Date( 1612324193389 ),
				route_data: "Manchester",
				ride_type: "road",
				title: "Manchester loop",
				description: "anyone want to join me on a loop around manchester",
				experience_level: "intermediate",
				created_at: new Date( 1601324163389 ),
				votes: 0
			},
		] )
	} )
})
