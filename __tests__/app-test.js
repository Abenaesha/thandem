process.env.NODE_ENV = "test"
const request = require( "supertest" )
const app = require( "../app" )
const connection = require( "../db/connection" )

/* eslint-disable no-undef */
beforeEach( () => connection.seed.run())
afterAll( () => connection.destroy() )

describe( "/api", () => {
	describe( "GET - /users", () => {
		test( "200: returns an array of user objects", () => {
			return request( app )
				.get( "/api/users" )
				.expect( 200 )
				.then( ( {body: {users}} ) => {
					expect( Array.isArray( users ) ).toBe( true )
					users.forEach( user => {
						// console.log(user)
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
	// xdescribe("POST - /users", () => {
	// 	xtest("201: reposnds with 201 for a successful post user request", () => {
	// 		const input = {
	// 			username: "Dave3",
	// 			first_name: "Dave",
	// 			last_name: "NC",
	// 			email: "dave3@gmail.com",
	// 			password: "d3nc",
	// 			avatar_url: "http://clipart-library.com/images/8TEjdRMEc.png",
	// 			location: "Manchester",
	// 		}
	// 		return request( app )
	// 			.post( "/api/users" )
	// 			.send( input )
	// 			.expect(201)
	// 			.then( ( { body: {newUser} } ) => {
	// 				expect( newUser ).toMatchObject( {
	// 					username: "Dave3",
	// 					first_name: "Dave",
	// 					last_name: "NC",
	// 					email: "dave3@gmail.com",
	// 					password: "d3nc",
	// 					avatar_url: "http://clipart-library.com/images/8TEjdRMEc.png",
	// 					location: "Manchester",
	// 				})
	// 			})
	// 	})
		
	// })
	// describe("GET - /users/:username", () => {
	// 	test("200: return a successful request for username with correct details", () => {
	// 		return request( app )
	// 			.get( "/api/users/raofRide" )
	// 			.expect( 200 )
	// 			.then( ( { body } ) => {
	// 				console.log(body)
	// 				expect( body.user ).toMatchObject( {
	// 					username: "Dave3",
	// 					password: "d3nc",
	// 					email: "dave3@gmail.com",
	// 					avatar_url: "http://clipart-library.com/images/8TEjdRMEc.png",
	// 					first_name: "Dave",
	// 					last_name: "NC",
	// 					location: "Manchester",
	// 					routes_data: ""
	// 				})
	// 			})
	// 	})
		
	// })
	
	
})
