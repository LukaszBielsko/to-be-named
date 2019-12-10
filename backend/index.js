const createServer = require('./createServer')

const server = createServer()

server.start(
    {
        cors: {
            credentials: true,
            origin: 'http://localhost:7777"'
        },
    }, ({port}) => console.log(`Server started, listening on port ${port}.`)
)