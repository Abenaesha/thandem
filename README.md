## team thand-em

## TESTING

Basic endpoints for testing

```js
GET
- [ ] /api

GET
- [ ] /api/users
- [ ] /api/users/:username

POST
- [ ] /api/users

PATCH
- [ ] /api/users/:username

DELETE
- [ ] /api/users/:username

GET
- [ ] /api/rides
- [ ] /api/rides/:ride_id
- [ ] /api/users/:username/rides *

POST
- [ ] /api/rides

PATCH
- [ ] /api/rides/:ride_id

DELETE
- [ ] /api/rides/ride_id

GET
- [ ] /api/rides/:ride_id/comments

POST
- [ ] /api/rides/:ride_id/comments

PATCH
- [ ] /api/comments/comment_id

DELETE
- [ ] /api/comments/comment_id
```

```js
## Queries

GET

- [ ] /api/rides?order=asc
*defaults to desc and ordered by created_at

- [ ] /api/rides?sorted_by=joins*
*defaults to created_at 

- [ ] /api/rides?sorted_by=joins&order=asc

## Filters

GET

- [ ] /api/rides?author=raofRides

- [ ] /api/rides?ride_type=mountain

- [ ] /api/rides?exprience_level=advanced

- [ ] /api/rides?location=chester
```