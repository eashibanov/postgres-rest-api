## Launch Docker DB:

``sh api-db.sh build``

``sh api-db start``

### Environment variables:
`PROXY_PORT` - sets a proxy port for a database. If not set, uses a default 55432.

## Launch server:
``npm run dev``

## Routes:

### GET

`/test` - check server (returns `{ "message": "ping" }`)

`/users` - lists all people in a table

`/users/id` - returns a person with id = id

### POST

`/users` (request body is a JSON `{ "name": ..., "phone": "x-xxx-xxx-xx-xx" }`) - adds a user

### PUT

`/users/id`, (request body is a JSON `{ "name": ..., "phone": "x-xxx-xxx-xx-xx" }`) - adds a user with id = id

### DELETE

`/users/id` - removes a user with id = id
