const createServer = require('./createServer')
const startDB = require('./mongo/connect')
require('dotenv').config()

const server = createServer()
startDB()

server.start(
    {
        cors: {
            credentials: true,
            origin: 'http://localhost:7777'
        },
    }, ({ port }) => console.log(`Server started, listening on port ${port}.`)
)
