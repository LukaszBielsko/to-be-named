const jwt = require('jsonwebtoken');
const cookieParser = require('cookie-parser');

const createServer = require('./createServer');
// const startDB = require('./mongo/connect')
require('dotenv').config();

const server = createServer();
// startDB()

server.express.use(cookieParser());

server.express.use((req, res, next) => {
  console.log('MIDDLEWARE');
  const { token } = req.cookies;
  console.log({ token });
  if (token) {
    const { userId } = jwt.verify(token, process.env.APP_SECRET);
    console.log('token: ', token);
    console.log('userId: ', userId);
    /*      
      why this is sticked to request
      im handling a request here
      im in the middle between request and response
      so how this is possible to stick it on request?
      request is being made by the client         
      ***
      as per AJ answer
        it’s not being sent to the user. It’s added to the request object. And that can
      be accessed in any middelware that runs after that.
        -- so Im modifying request locally here, and this modified request is available
      for any middleware after this one. 
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
