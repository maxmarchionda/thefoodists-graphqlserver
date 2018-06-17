import { ApolloServer } from 'apollo-server';
import { ApolloEngine } from "apollo-engine";
import bodyParser from "body-parser";
// require("babel-core/register");
require("babel-polyfill");
require('dotenv').config();

if (!process.env.ENGINE_API_KEY) {
  throw new Error(
    "Please provide an API key for Apollo Engine in the environment variable ENGINE_API_KEY."
  );
} else if (!process.env.PORT) {
  console.log("WARN -- using default port --");
}

const PORT = process.env.PORT || 3000;

export const startServer = async (schema) => {
  try {

    const server = new ApolloServer({
      port: PORT,
      schema,
      engine: true
    });

    server.listen().then(({ url }) => {
      console.log(`🚀  Server ready at ${url}`);
    });

  } catch (e) {
    console.log(e);
  }
}
