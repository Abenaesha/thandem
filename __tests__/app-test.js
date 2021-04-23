process.env.NODE_ENV = "test"
const request = require("supertest")
const app = require("../app")
const connection = require("../db/connection")

/* eslint-disable no-undef */
beforeEach(() => connection.seed.run(), 20000)
afterAll(() => connection.destroy())

describe("/api", () => {
  describe("/api/users", () => {
    describe("GET - /users", () => {
      test("200: returns an array of user objects", () => {
        return request(app)
          .get("/api/users")
          .expect(200)
          .then(({ body: { users } }) => {
            expect(Array.isArray(users)).toBe(true)
            users.forEach((user) => {
              expect(user).toEqual(
                expect.objectContaining({
                  username: expect.any(String),
                  avatar_url: expect.any(String),
                  first_name: expect.any(String),
                  last_name: expect.any(String),
                  email: expect.any(String),
                  password: expect.any(String),
                  location: expect.any(String),
                  bike_type: expect.any(String),
                  rider_level: expect.any(String),
                })
              )
            })
          })
      })
    })
    describe("POST - /users", () => {
      test("201: responds with 201 for a successful post user request", () => {
        const input = {
          username: "Dave3",
          first_name: "Dave",
          last_name: "NC",
          email: "dave3@gmail.com",
          password: "d3nc",
          avatar_url: "http://clipart-library.com/images/8TEjdRMEc.png",
          location: "Manchester",
          routes_data: null,
          bike_type: "Mountain Bike",
          rider_level: "Beginner",
        }
        return request(app)
          .post("/api/users")
          .send(input)
          .expect(201)
          .then(({ body: { newUser } }) => {
            expect(newUser).toMatchObject({
              username: "Dave3",
              first_name: "Dave",
              last_name: "NC",
              email: "dave3@gmail.com",
              password: "d3nc",
              avatar_url: "http://clipart-library.com/images/8TEjdRMEc.png",
              location: "Manchester",
              routes_data: null,
              bike_type: "Mountain Bike",
              rider_level: "Beginner",
            })
          })
      })
      test("405: responds with status 405 for invalid methods", () => {
        const notAllowedMethods = ["patch", "put", "delete"]
        const methodPromises = notAllowedMethods.map((method) => {
          return request(app)
            [method]("/api/users")
            .expect(405)
            .then(({ body: { msg } }) => {
              expect(msg).toBe("Method not allowed!")
            })
        })
        return Promise.all(methodPromises)
      })
    })
    describe("GET - /users/:username", () => {
      test("200: return a successful request for username with correct details", () => {
        return request(app)
          .get("/api/users/raofRides")
          .expect(200)
          .then(({ body: { user } }) => {
            expect(user).toMatchObject({
              username: "raofRides",
              first_name: "Raof",
              last_name: "Benaesha",
              email: "example2@gmail.com",
              password: "abcde2",
              avatar_url: "http://clipart-library.com/images/yckAgeMRi.jpg",
              location: "Manchester",
              bike_type: "Road",
              rider_level: "Beginner",
            })
          })
      })
    })
    describe("PATCH - /users/:username", () => {
      test("200: PATCH - responds with an updated user avatar_url object", () => {
        return request(app)
          .patch("/api/users/t0gden")
          .send({
            avatar_url:
              "https://creazilla-store.fra1.digitaloceanspaces.com/cliparts/25896/blue-bike-clipart-md.png",
          })
          .expect(200)
          .then(({ body: { user } }) => {
            expect(user).toEqual({
              username: "t0gden",
              first_name: "Tom",
              last_name: "Ogden",
              email: "example1@gmail.com",
              password: "abcde1",
              avatar_url:
                "https://creazilla-store.fra1.digitaloceanspaces.com/cliparts/25896/blue-bike-clipart-md.png",
              location: "Chester",
              routes_data: null,
              bike_type: "All",
              rider_level: "Intermediate",
            })
          })
      })
      test("200: PATCH - responds with an updated user location object", () => {
        return request(app)
          .patch("/api/users/t0gden")
          .send({ location: "Leeds" })
          .expect(200)
          .then(({ body: { user } }) => {
            expect(user).toEqual({
              username: "t0gden",
              first_name: "Tom",
              last_name: "Ogden",
              email: "example1@gmail.com",
              password: "abcde1",
              avatar_url: "http://clipart-library.com/images/8TEjdRMEc.png",
              location: "Leeds",
              routes_data: null,
              bike_type: "All",
              rider_level: "Intermediate",
            })
          })
      })
      test("200: PATCH - responds with an updated user password object", () => {
        return request(app)
          .patch("/api/users/t0gden")
          .send({ password: "1edcba" })
          .expect(200)
          .then(({ body: { user } }) => {
            expect(user).toEqual({
              username: "t0gden",
              first_name: "Tom",
              last_name: "Ogden",
              email: "example1@gmail.com",
              password: "1edcba",
              avatar_url: "http://clipart-library.com/images/8TEjdRMEc.png",
              location: "Chester",
              routes_data: null,
              bike_type: "All",
              rider_level: "Intermediate",
            })
          })
      })
      test("200: PATCH - responds with an updated user multiple elements object", () => {
        return request(app)
          .patch("/api/users/t0gden")
          .send({
            password: "northcoders2021",
            location: "Manchester",
            avatar_url:
              "https://creazilla-store.fra1.digitaloceanspaces.com/cliparts/25896/blue-bike-clipart-md.png",
          })
          .expect(200)
          .then(({ body: { user } }) => {
            expect(user).toEqual({
              username: "t0gden",
              first_name: "Tom",
              last_name: "Ogden",
              email: "example1@gmail.com",
              password: "northcoders2021",
              avatar_url:
                "https://creazilla-store.fra1.digitaloceanspaces.com/cliparts/25896/blue-bike-clipart-md.png",
              location: "Manchester",
              routes_data: null,
              bike_type: "All",
              rider_level: "Intermediate",
            })
          })
      })
      //   test("STATUS 400: client tries to PATCH user with details that doesn't match schema requirements", () => {
      //     return request(app)
      //       .patch("/api/users/t0gden")
      //       .send({
      //         location: 5,
      //       })
      //       .expect(400)
      //       .then(({ body }) => {
      //         expect(body.msg).toBe(
      //           "Sorry but your request on path /api/users/t0gden is a bad request"
      //         )
      //       })
      //   })
    })
    describe("DELETE - /users/:username", () => {
      test("200: DELETE - responds with a message for successful delete request by username", () => {
        return request(app)
          .delete("/api/users/rollingDan")
          .expect(200)
          .then(({ body: { msg } }) => {
            expect(msg).toBe("rollingDan has been successfully deleted")
          })
      })
    })
    test("405: responds with status 405 for invalid methods", () => {
      const notAllowedMethods = ["post", "put"]
      const methodPromises = notAllowedMethods.map((method) => {
        return request(app)
          [method]("/api/users/:username")
          .expect(405)
          .then(({ body: { msg } }) => {
            expect(msg).toBe("Method not allowed!")
          })
      })
      return Promise.all(methodPromises)
    })
    test("STATUS 404: client enters username that doesn't exist", () => {
      return request(app)
        .get("/api/users/barry_from_eastenders")
        .expect(404)
        .then(({ body }) => {
          expect(body.msg).toBe("barry_from_eastenders not found")
        })
    })
  })
  describe("/api/rides", () => {
    describe("GET - /rides", () => {
      test("200: GET - returns all rides", () => {
        return request(app)
          .get("/api/rides")
          .expect(200)
          .then(({ body: { rides } }) => {
            expect(Array.isArray(rides)).toBe(true)
            rides.forEach((ride) => {
              expect(ride).toEqual(
                expect.objectContaining({
                  ride_id: expect.any(Number),
                  author: expect.any(String),
                  ride_date: expect.any(String),
                  route_data: expect.any(String),
                  ride_type: expect.any(String),
                  title: expect.any(String),
                  description: expect.any(String),
                  experience_level: expect.any(String),
                  created_at: expect.any(String),
                  votes: expect.any(Number),
                })
              )
            })
          })
      })
      test("405: responds with status 405 for invalid methods", () => {
        const notAllowedMethods = ["patch", "put", "delete"]
        const methodPromises = notAllowedMethods.map((method) => {
          return request(app)
            [method]("/api/rides")
            .expect(405)
            .then(({ body: { msg } }) => {
              expect(msg).toBe("Method not allowed!")
            })
        })
        return Promise.all(methodPromises)
      })
    })
    describe("GET - /rides/:ride_id", () => {
      test("200: GET - returns a successful request for ride_id with correct object", () => {
        return request(app)
          .get("/api/rides/3")
          .expect(200)
          .then(({ body: { ride } }) => {
            expect(ride).toMatchObject({
              ride_id: 3,
              author: "rollingDan",
              ride_date: "2021-04-25T04:16:33.389Z",
              route_data: "Sheffield hills",
              ride_type: "cross country",
              title: "gentle pedal outside sheffield",
              description:
                "anyone in the sheffield area want to join me on a loop?",
              experience_level: "beginner",
              created_at: "2020-09-28T20:16:03.389Z",
              votes: -10,
            })
          })
      })
      test("405: responds with status 405 for invalid methods", () => {
        const notAllowedMethods = ["post", "put"]
        const methodPromises = notAllowedMethods.map((method) => {
          return request(app)
            [method]("/api/rides/:ride_id")
            .expect(405)
            .then(({ body: { msg } }) => {
              expect(msg).toBe("Method not allowed!")
            })
        })
        return Promise.all(methodPromises)
      })
      test("STATUS 404: client enters ride_id that doesn't exist", () => {
        return request(app)
          .get("/api/rides/450")
          .expect(404)
          .then(({ body }) => {
            expect(body.msg).toBe("Ride ID 450 not found")
          })
      })
    })
    xdescribe("GET - /users/:username/rides", () => {
      test("200: GET - returns a array of ride object by username", () => {
        return request(app)
          .get("/api/users/rollingDan/rides")
          .expect(200)
          .then(({ body: { rides } }) => {
            expect(rides).toHaveLength(2)
            rides.forEach((ride) => {
              expect(ride).objectContaining({
                ride_id: expect.any(Number),
                author: expect.any(String),
                ride_date: expect.any(String),
                route_data: expect.any(String),
                ride_type: expect.any(String),
                title: expect.any(String),
                description: expect.any(String),
                experience_level: expect.any(String),
                created_at: expect.any(String),
                votes: expect.any(Number),
              })
            })
          })
      })
    })
    describe("POST - /ride", () => {
      test("201: POST - returns an object with new ride", () => {
        const input = {
          author: "t0gden",
          ride_date: new Date(1619324193389),
          route_data: "Wales hills",
          ride_type: "mountain",
          title: "evening ride",
          description: "amazing bike adventure in Wales",
          experience_level: "advanced",
          created_at: new Date(),
          votes: 0,
        }
        return request(app)
          .post("/api/rides")
          .send(input)
          .expect(201)
          .then(({ body: { newRide } }) => {
            expect(newRide).toEqual({
              ride_id: 5,
              author: "t0gden",
              ride_date: "2021-04-25T04:16:33.389Z",
              route_data: "Wales hills",
              ride_type: "mountain",
              title: "evening ride",
              description: "amazing bike adventure in Wales",
              experience_level: "advanced",
              created_at: expect.any(String),
              votes: 0,
            })
          })
      })
    })
    describe("PATCH - /api/rides/:ride_id", () => {
      test("200: PATCH - responds with an updated ride object", () => {
        return request(app)
          .patch("/api/rides/2")
          .send({ votes: 99 })
          .expect(200)
          .then(({ body: { ride } }) => {
            expect(ride).toEqual({
              ride_id: 2,
              author: "raofRides",
              ride_date: "2021-02-03T05:12:43.389Z",
              route_data: "Manchester",
              ride_type: "road",
              title: "Manchester loop",
              description: "anyone want to join me on a loop around manchester",
              experience_level: "intermediate",
              created_at: "2020-09-28T20:16:03.389Z",
              votes: 99,
            })
          })
      })
    })
    test("STATUS 404: client enters ride_id that doesn't exist", () => {
      return request(app)
        .get("/api/rides/450")
        .expect(404)
        .then(({ body }) => {
          expect(body.msg).toBe("Ride ID 450 not found")
        })
    })
    describe("DELETE - / api/rides/:ride_id", () => {
      test("200: DELETE - responds with a message for successful delete request by ride id", () => {
        return request(app)
          .delete("/api/rides/3")
          .expect(200)
          .then(({ body: { msg } }) => {
            expect(msg).toBe("Ride ID 3 has been successfully deleted")
          })
      })
    })
    test("STATUS 404: client enters ride_id that doesn't exist", () => {
      return request(app)
        .get("/api/rides/450")
        .expect(404)
        .then(({ body }) => {
          expect(body.msg).toBe("Ride ID 450 not found")
        })
    })
    test("STATUS 400: client enters ride_id that doesn't match schema requirements", () => {
      return request(app)
        .get("/api/rides/bike_ride2")
        .expect(400)
        .then(({ body }) => {
          expect(body.msg).toBe(
            "Sorry but your request on path /api/rides/bike_ride2 is a bad request"
          )
        })
    })
  })
})
