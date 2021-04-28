process.env.NODE_ENV = "test"
const request = require("supertest")
const app = require("../app")
const connection = require("../db/connection")

/* eslint-disable no-undef */
beforeEach(() => connection.seed.run(), 20000)
afterAll(() => connection.destroy())

/* eslint-disable no-unexpected-multiline */

describe("/api", () => {
  describe("GET", () => {
    it("200: GET - responds with all the existing endpoints of the API", () => {
      return request(app)
        .get("/api")
        .expect(200)
        .then(({ body }) => {
          expect(body).toMatchObject({
            endpoints: {
              "GET - /api": {
                description:
                  "responds with a json object displaying all the existing endpoints of the API server",
              },
              "GET - /api/users": expect.any(Object),
              "POST - /api/users": expect.any(Object),
              "GET - /api/users/:username": expect.any(Object),
              "PATCH - /api/users/:username": expect.any(Object),
              "DELETE - /api/users/:username": expect.any(Object),
              "GET - /api/rides": expect.any(Object),
              "POST - /api/rides": expect.any(Object),
              "GET - /api/rides/:ride_id": expect.any(Object),
              "PATCH - /api/rides/:ride_id": expect.any(Object),
              "DELETE - /api/rides/:ride_id": expect.any(Object),
              "GET - /api/rides/:ride_id/attendees": expect.any(Object),
              "POST - /api/rides/:ride_id/attendees": expect.any(Object),
              "DELETE - /api/attendees/:attendee_id": expect.any(Object),
              "GET - /api/rides/:ride_id/comments": expect.any(Object),
              "POST - /api/rides/:ride_id/comments": expect.any(Object),
              "PATCH - /api/comments/comment_id": expect.any(Object),
              "DELETE - /api/comments/:comment_id": expect.any(Object),
            },
          })
        })
    })
  })
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
                  routes_data: expect.any(String),
                })
              )
            })
          })
      })
    })
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
          bike_type: "Mountain Bike",
          rider_level: "Beginner",
          routes_data: "null",
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
              routes_data: "null",
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
              routes_data: "routes",
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
              routes_data: "routes",
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
              routes_data: "routes",
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
              routes_data: "routes",
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
              routes_data: "routes",
              bike_type: "All",
              rider_level: "Intermediate",
            })
          })
      })
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
                joins: expect.any(Number),
                location: expect.any(String),
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
  describe("Queries", () => {
    test("200: GET - sort_by queries default to created_at", () => {
      return request(app)
        .get("/api/rides?order=asc")
        .expect(200)
        .then(({ body: { rides } }) => {
          expect(rides).toBeSortedBy("created_at", {
            coerce: true,
          })
        })
    })
    test("200: GET - order queries defaults to descending unless specified", () => {
      return request(app)
        .get("/api/rides?sort_by=joins")
        .expect(200)
        .then(({ body: { rides } }) => {
          expect(rides).toBeSortedBy("joins", {
            descending: true,
          })
        })
    })
    test("200: GET - order queries defaults to descending unless specified", () => {
      return request(app)
        .get("/api/rides?sort_by=joins&order=asc")
        .expect(200)
        .then(({ body: { rides } }) => {
          expect(rides).toBeSortedBy("joins")
        })
    })
    test("200: filters the results of rides by author", () => {
      return request(app)
        .get("/api/rides?author=raofRides")
        .expect(200)
        .then(({ body: { rides } }) => {
          expect(rides).toHaveLength(1)
          expect(Array.isArray(rides)).toBe(true)
          rides.forEach((ride) => {
            expect(ride.author).toBe("raofRides")
          })
        })
    })
    test("200: filters the results of rides by author & ride_type", () => {
      return request(app)
        .get("/api/rides?author=raofRides&ride_type=road")
        .expect(200)
        .then(({ body: { rides } }) => {
          expect(rides).toHaveLength(1)
          expect(Array.isArray(rides)).toBe(true)
          rides.forEach((ride) => {
            expect(ride.author).toBe("raofRides")
            expect(ride.ride_type).toBe("road")
          })
        })
    })
    test("200: filters the results of rides by author & experience_level", () => {
      return request(app)
        .get("/api/rides?author=rollingDan&experience_level=beginner")
        .expect(200)
        .then(({ body: { rides } }) => {
          expect(rides).toHaveLength(1)
          expect(Array.isArray(rides)).toBe(true)
          rides.forEach((ride) => {
            expect(ride.author).toBe("rollingDan")
            expect(ride.experience_level).toBe("beginner")
          })
        })
    })
    test("200: filters the results of rides by author & experience_level", () => {
      return request(app)
        .get(
          "/api/rides?author=rollingDan&experience_level=beginner&location=Sheffield"
        )
        .expect(200)
        .then(({ body: { rides } }) => {
          expect(rides).toHaveLength(1)
          expect(Array.isArray(rides)).toBe(true)
          rides.forEach((ride) => {
            expect(ride.author).toBe("rollingDan")
            expect(ride.experience_level).toBe("beginner")
            expect(ride.location).toBe("Sheffield")
          })
        })
    })
    test("200: filters the results of rides by ride_type", () => {
      return request(app)
        .get("/api/rides?ride_type=road")
        .expect(200)
        .then(({ body: { rides } }) => {
          expect(rides).toHaveLength(3)
          expect(Array.isArray(rides)).toBe(true)
          rides.forEach((ride) => {
            expect(ride.ride_type).toBe("road")
          })
        })
    })
    test("200: filters the results of rides by experience_level", () => {
      return request(app)
        .get("/api/rides?experience_level=beginner")
        .expect(200)
        .then(({ body: { rides } }) => {
          expect(rides).toHaveLength(1)
          expect(Array.isArray(rides)).toBe(true)
          rides.forEach((ride) => {
            expect(ride.experience_level).toBe("beginner")
          })
        })
    })
    test("200: filters the results of rides by ride_type & experience_level", () => {
      return request(app)
        .get("/api/rides?ride_type=cross%20country&experience_level=beginner")
        .expect(200)
        .then(({ body: { rides } }) => {
          expect(rides).toHaveLength(1)
          rides.forEach((ride) => {
            expect(ride.ride_type).toBe("cross country")
            expect(ride.experience_level).toBe("beginner")
            expect(ride).toHaveProperty(
              "author",
              "description",
              "joins",
              "title",
              "ride_date",
              "route_data"
            )
          })
        })
    })
    test("200: filters the results of rides by location", () => {
      return request(app)
        .get("/api/rides?location=Manchester")
        .expect(200)
        .then(({ body: { rides } }) => {
          expect(rides).toHaveLength(1)
          expect(Array.isArray(rides)).toBe(true)
          rides.forEach((ride) => {
            expect(ride.location).toBe("Manchester")
          })
        })
    })
    test("200: filters the results of rides by location & experience_level", () => {
      return request(app)
        .get("/api/rides?location=Manchester&experience_level=intermediate")
        .expect(200)
        .then(({ body: { rides } }) => {
          expect(rides).toHaveLength(1)
          expect(Array.isArray(rides)).toBe(true)
          rides.forEach((ride) => {
            expect(ride.location).toBe("Manchester")
            expect(ride.experience_level).toBe("intermediate")
          })
        })
    })
    test("200: filters the results of rides by location & experience_level", () => {
      return request(app)
        .get("/api/rides?location=Sheffield&ride_type=road")
        .expect(200)
        .then(({ body: { rides } }) => {
          expect(rides).toHaveLength(1)
          expect(Array.isArray(rides)).toBe(true)
          rides.forEach((ride) => {
            expect(ride.location).toBe("Sheffield")
            expect(ride.experience_level).toBe("intermediate")
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
      joins: 0,
      location: "Chester",
      distanceInKm: "20",
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
          joins: 0,
          location: "Chester",
          distanceInKm: "20",
        })
      })
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
          joins: 10,
          location: "Sheffield",
          distanceInKm: "30",
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
describe("PATCH - /api/rides/:ride_id", () => {
  test("200: PATCH - responds with an updated ride object", () => {
    return request(app)
      .patch("/api/rides/2")
      .send({ joins: 1 })
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
          joins: 1,
          location: "Manchester",
          distanceInKm: "50",
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
describe("DELETE - / api/rides/ride_id", () => {
  test("200: DELETE - responds with a message for successful delete request by ride id", () => {
    return request(app)
      .delete("/api/rides/3")
      .expect(200)
      .then(({ body: { msg } }) => {
        expect(msg).toBe("3 has been successfully deleted")
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
describe("/attendees", () => {
  describe("GET - /rides/ride_id/attendees", () => {
    test("200: GET - returns a list of attendees in a ride", () => {
      return request(app)
        .get("/api/rides/1/attendees")
        .expect(200)
        .then(({ body: { attendees } }) => {
          expect(attendees).toHaveLength(2)
          attendees.forEach((attendee) => {
            expect(attendee).toEqual(
              expect.objectContaining({
                attendee_id: expect.any(Number),
                attendee: expect.any(String),
                ride_id: expect.any(Number),
                name: expect.any(String),
              })
            )
          })
        })
    })
  })
  describe("POST - /rides/ride_id/attendees", () => {
    test("should ", () => {
      const input = {
        attendee: "rollingDan",
        name: "Dan",
      }
      return request(app)
        .post("/api/rides/3/attendees")
        .send(input)
        .expect(201)
        .then(({ body: { newAttendee } }) => {
          expect(newAttendee).toMatchObject({
            attendee_id: 3,
            attendee: "rollingDan",
            ride_id: 3,
            name: "Dan",
          })
        })
    })
  })
  describe("DELETE - /attendees/attendee_id", () => {
    test("200: DELETE - responds with a message for a successful delete request for a valid attendee id", () => {
      return request(app)
        .delete("/api/attendees/1")
        .expect(200)
        .then(({ body: { msg } }) => {
          expect(msg).toBe("Attendee with id 1 has been successfully deleted")
        })
    })
  })
  describe('DELETE - rides/ride_id/attendees/username"', () => {
    test("200: Delete - Responds with a message for a successful delete request for a valid ride_id & attendee name", () => {
      return request(app)
        .delete("/api/rides/1/attendees/t0gden")
        .expect(200)
        .then(({ body: { msg } }) => {
          expect(msg).toBe(
            "user t0gden has been successfully removed from ride id 1"
          )
        })
    })
  })
})
describe("/comments", () => {
  describe("GET - /rides/ride_id/comments", () => {
    test("200: GET - returns all comments in a ride", () => {
      return request(app)
        .get("/api/rides/1/comments")
        .expect(200)
        .then(({ body: { comments } }) => {
          expect(comments).toHaveLength(2)
          comments.forEach((comment) => {
            expect(comment).toEqual(
              expect.objectContaining({
                comment_id: expect.any(Number),
                author: expect.any(String),
                ride_id: expect.any(Number),
                votes: expect.any(Number),
                created_at: expect.any(String),
                body: expect.any(String),
              })
            )
          })
        })
    })
  })
  describe("POST - /rides/ride_id/comments", () => {
    test("201: POST - responds with 201 for successful request with new comment", () => {
      const input = {
        body: "NEW - Do not forget to commit regularly!",
        username: "t0gden",
      }
      return request(app)
        .post("/api/rides/3/comments")
        .send(input)
        .expect(201)
        .then(({ body: { newComment } }) => {
          expect(newComment).toMatchObject({
            comment_id: 5,
            body: "NEW - Do not forget to commit regularly!",
            ride_id: 3,
            author: "t0gden",
            votes: 0,
            created_at: expect.any(String),
          })
        })
    })
  })
  describe("PATCH - /comments/comment_id", () => {
    test("200: PATCH - returns an object of updated comment with an updated body for a valid comment id", () => {
      const input = {
        body: "Let's go guys!",
      }
      return request(app)
        .patch("/api/comments/4")
        .send(input)
        .expect(200)
        .then(({ body: { comment } }) => {
          expect(comment).toHaveProperty("author")
          expect(comment).toHaveProperty("ride_id")
          expect(comment).toHaveProperty("votes")
          expect(comment).toEqual({
            comment_id: 4,
            author: "t0gden",
            ride_id: 2,
            votes: 1,
            body: "Let's go guys!",
            created_at: expect.any(String),
          })
        })
    })
  })
  describe("DELETE - /comments/comment_id", () => {
    test("200: DELETE - responds with a message for a successful delete request for a valid comment id", () => {
      return request(app)
        .delete("/api/comments/1")
        .expect(200)
        .then(({ body: { msg } }) => {
          expect(msg).toBe("Comment with id 1 has been successfully deleted")
        })
    })
  })
})
