## Launch Docker DB:
``sh api-db.sh build``
### Environment variables:
`HOST_URL` - host URL \
`APP_PORT` - port of server application \
`PROXY_PORT` - sets a proxy port for a database. If not set, uses a default 55432.\
`DB_NAME` - name of a database \
`DB_USER` - database username \
`DB_PASS` - database password

## Launch server:
``npm run dev``

#### Troubleshooting:
``npm run kill`` - kills a process that occupies port $APP_PORT or 4321. \
Sometimes it is needed to set environment variables again. 

## Routes:

### GET

`/test` - check server (returns `{ "message": "ping" }`) \
`/users` - lists all people in a table \
`/users/id` - returns a person with id = id

### POST
`/users` - (request body is a JSON `{ "name": ..., "phone": "x-xxx-xxx-xx-xx" }`) - adds a user

### PUT
`/users/id` - (request body is a JSON `{ "name": ..., "phone": "x-xxx-xxx-xx-xx" }`) - adds a user with id = id

### DELETE
`/users/id` - removes a user with id = id
