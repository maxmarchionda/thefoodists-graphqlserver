import { ApolloServer } from 'apollo-server';
import bodyParser from "body-parser";
import { ApolloEngine } from "apollo-engine";
import typeDefs from "./schema.graphql";
import resolvers from "./resolvers/books";

require('dotenv').config()

if (!process.env.ENGINE_API_KEY) {
  throw new Error(
    "Please provide an API key for Apollo Engine in the environment variable ENGINE_API_KEY."
  );
}
const PORT = process.env.PORT || 3000;

// In the most basic sense, the ApolloServer can be started
// by passing type definitions (typeDefs) and the resolvers
// responsible for fetching the data for those types.
const server = new ApolloServer({
  typeDefs: typeDefs,
  resolvers: resolvers,
  engine: true
});

// This `listen` method launches a web-server.  Existing apps
// can utilize middleware options, which we'll discuss later.
server.listen().then(({ url }) => {
  console.log(`🚀  Server ready at ${url}`);
});

//  apiKey: process.env.ENGINE_API_KEY,
