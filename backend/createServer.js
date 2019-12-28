const { GraphQLServer } = require('graphql-yoga')

const db = require('./mongo/connect')() //startDB
const Mutation = require('./resolvers/Mutation')
const Query = require('./resolvers/Query')

function createServer() {
  return new GraphQLServer({
    typeDefs: './schema.graphql',
    resolvers: {
      Mutation,
      Query
    },
    resolverValidationOptions: {
      requireResolversForResolveType: false
    },
    /* TODO no idea what is it really */
    context: req => ({ ...req, db })
  })
}

module.exports = createServer
