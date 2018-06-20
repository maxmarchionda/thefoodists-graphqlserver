import { ApolloServer } from 'apollo-server';
import { ApolloEngine } from "apollo-engine";
import bodyParser from "body-parser";

import express from 'express';
import { graphqlExpress } from 'apollo-server-express';
import expressPlayground from 'graphql-playground-middleware-express';
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


    const app = express();

// bodyParser is needed just for POST.
    app.use('/graphql', bodyParser.json(), graphqlExpress({
      schema,
      tracing: true,
      cacheControl: true
    }));
    app.get('/', expressPlayground({ endpoint: '/graphql' }))

    const engine = new ApolloEngine({
      apiKey: process.env.ENGINE_API_KEY
    });

    // Call engine.listen instead of app.listen(port)
    const port = (process.env.PORT || 3000);
    engine.listen({
      port,
      expressApp: app,
    });
    console.log('GraphQL Server now running on', 'http://localhost:'+port);
    // const server = app.listen(process.env.PORT || 3000, function () {
    //   var port = server.address().port;
    //   console.log("App now running on port", port);
    // });


    // const server = new ApolloServer({
    //   port: PORT,
    //   schema,
    //   engine: true
    // });
    //
    // server.listen().then(({ url }) => {
    //   console.log(`🚀  Server ready at ${url}`);
    // });

  } catch (e) {
    console.log(e);
  }
}
