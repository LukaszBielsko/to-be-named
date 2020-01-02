const jwt = require('jsonwebtoken');
const createServer = require('./createServer');
// const startDB = require('./mongo/connect')
require('dotenv').config();
const cookieParser = require('cookie-parser');

const server = createServer();
// startDB()

server.express.use(cookieParser());

server.express.use((req, res, next) => {
  const { jwtToken } = req.cookies;
  if (jwtToken) {
    const { userId } = jwt.verify(jwtToken, process.env.APP_SECRET);
    /* TODO why this is sticked to request
            im handling a request here
            im in the middle between request and response
            so how this is possible to stick it on request?
            request is being made by the client    
        */
    req.userId = userId;
  }
  next();
});

server.start(
  {
    cors: {
      credentials: true,
      origin: 'http://localhost:7777',
    },
  },
  ({ port }) => console.log(`Server started, listening on port ${port}.`)
);
