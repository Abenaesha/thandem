process.env.NODE_ENV = "test"
const request = require( "supertest" )
const app = require( "../app" )
const connection = require( "../db/connection" )
/* eslint-disable no-undef */
beforeEach( () => connection.seed.run())
afterAll( () => connection.destroy() )

describe( "/api", () => {
	describe( "users", () => {
		test( "GET - 200: returns an array of user objects", () => {
			return request( app )
				.get( "/api/users" )
				.expect( 200 )
				.then( ( {body: {users}} ) => {
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
	
	})
	
})
