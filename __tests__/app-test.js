process.env.NODE_ENV = "test"
const request = require( "supertest" )
const app = require( "../app" )
const connection = require( "../db/connection" )

/* eslint-disable no-undef */
beforeEach(() => connection.seed.run(), 20000)
afterAll(() => connection.destroy())

describe( "/api", () => {
	describe( "GET - /users", () => {
		test( "200: returns an array of user objects", () => {
			return request( app )
				.get( "/api/users" )
				.expect( 200 )
				.then( ( { body: { users } } ) => {
					expect( Array.isArray( users ) ).toBe( true )
					users.forEach( user => {
						expect( user ).toEqual(
							expect.objectContaining( {
								username: expect.any( String ),
								avatar_url: expect.any( String ),
								first_name: expect.any( String ),
								last_name: expect.any( String ),
								email: expect.any( String ),
								password: expect.any( String ),
								location: expect.any( String ),
							} )
						)
					} )
				} )
		} )
	
	} )
	describe("POST - /users", () => {
		test("201: reposnds with 201 for a successful post user request", () => {
			const input = {
				username: "Dave3",
				first_name: "Dave",
				last_name: "NC",
				email: "dave3@gmail.com",
				password: "d3nc",
				avatar_url: "http://clipart-library.com/images/8TEjdRMEc.png",
				location: "Manchester",
				routes_data: null
			}
			return request( app )
				.post( "/api/users" )
				.send( input )
				.expect(201)
				.then( ( { body: {newUser} } ) => {
					expect( newUser ).toMatchObject( {
						username: "Dave3",
						first_name: "Dave",
						last_name: "NC",
						email: "dave3@gmail.com",
						password: "d3nc",
						avatar_url: "http://clipart-library.com/images/8TEjdRMEc.png",
						location: "Manchester",
						routes_data: null
					})
				})
		})
	})
	describe("GET - /users/:username", () => {
		test("200: return a successful request for username with correct details", () => {
			return request( app )
				.get( "/api/users/raofRides" )
				.expect( 200 )
				.then( ( { body: {user} } ) => {
					expect( user ).toMatchObject( {
						username: "raofRides",
						first_name: "Raof",
						last_name: "Benaesha",
						email: "example2@gmail.com",
						password: "abcde2",
						avatar_url: "http://clipart-library.com/images/yckAgeMRi.jpg",
						location: "Manchester",
					})
				})
		})
	})
	describe("PATCH - /users/:username", () => {
		test("200: PATCH - responds with an updated user avatar_url object", () => {
			return request( app )
				.patch( "/api/users/t0gden" )
				.send({avatar_url: "https://creazilla-store.fra1.digitaloceanspaces.com/cliparts/25896/blue-bike-clipart-md.png"})
				.expect( 200 )
				.then( ( { body: {user} } ) => {
					expect( user ).toEqual( {
						username: "t0gden",
						first_name: "Tom",
						last_name: "Ogden",
						email: "example1@gmail.com",
						password: "abcde1",
						avatar_url: "https://creazilla-store.fra1.digitaloceanspaces.com/cliparts/25896/blue-bike-clipart-md.png",
						location: "Chester",
						routes_data: null,
					})
				})
		})
		test("200: PATCH - responds with an updated user location object", () => {
			return request( app )
				.patch( "/api/users/t0gden" )
				.send({location: "Leeds"})
				.expect( 200 )
				.then( ( { body: {user} } ) => {
					expect( user ).toEqual( {
						username: "t0gden",
						first_name: "Tom",
						last_name: "Ogden",
						email: "example1@gmail.com",
						password: "abcde1",
						avatar_url: "http://clipart-library.com/images/8TEjdRMEc.png",
						location: "Leeds",
						routes_data: null,
					})
				})
		} )
		test("200: PATCH - responds with an updated user password object", () => {
			return request( app )
				.patch( "/api/users/t0gden" )
				.send({password: "1edcba"})
				.expect( 200 )
				.then( ( { body: {user} } ) => {
					expect( user ).toEqual( {
						username: "t0gden",
						first_name: "Tom",
						last_name: "Ogden",
						email: "example1@gmail.com",
						password: "1edcba",
						avatar_url: "http://clipart-library.com/images/8TEjdRMEc.png",
						location: "Chester",
						routes_data: null,
					})
				})
		} )
		test("200: PATCH - responds with an updated user multiple elements object", () => {
			return request( app )
				.patch( "/api/users/t0gden" )
				.send({password: "northcoders2021", location: "Manchester", avatar_url: "https://creazilla-store.fra1.digitaloceanspaces.com/cliparts/25896/blue-bike-clipart-md.png"})
				.expect( 200 )
				.then( ( { body: {user} } ) => {
					expect( user ).toEqual( {
						username: "t0gden",
						first_name: "Tom",
						last_name: "Ogden",
						email: "example1@gmail.com",
						password: "northcoders2021",
						avatar_url: "https://creazilla-store.fra1.digitaloceanspaces.com/cliparts/25896/blue-bike-clipart-md.png",
						location: "Manchester",
						routes_data: null,
					})
				})
		})
	})
	

})
