## team thand-em

## TESTING

Basic endpoints for testing

```js
GET
/api

GET
/api/users
/api/users/:username

POST
/api/users

PATCH
/api/users/:username

DELETE
/api/users/:username

GET
/api/rides
/api/rides/:ride_id
/api/users/:username/rides *

POST
/api/rides

PATCH
/api/rides/:ride_id

DELETE
/api/rides/ride_id

GET
/api/comments/comment_id
/api/rides/:ride_id/comments

POST
/api/rides/:ride_id/comments

PATCH
/api/comments/comment_id

DELETE
/api/comments/comment_id
```