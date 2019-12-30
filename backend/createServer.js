const { GraphQLServer } = require('graphql-yoga')

//startDB - some funny business here 
const db = require('./mongo/connect')()
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
    /* TODO no idea what is it really
      this is graphql execution stuff
      read the docs, man, read the docs
    */
    context: req => ({ ...req, db })
  })
}

module.exports = createServer
