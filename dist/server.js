"use strict";

var _templateObject = _taggedTemplateLiteral(["\n  # Comments in GraphQL are defined with the hash (#) symbol.\n\n  # This \"Book\" type can be used in other type declarations.\n  type Book {\n    title: String\n    author: String\n  }\n\n  # The \"Query\" type is the root of all GraphQL queries.\n  # (A \"Mutation\" type will be covered later on.)\n  type Query {\n    books: [Book]\n  }\n"], ["\n  # Comments in GraphQL are defined with the hash (#) symbol.\n\n  # This \"Book\" type can be used in other type declarations.\n  type Book {\n    title: String\n    author: String\n  }\n\n  # The \"Query\" type is the root of all GraphQL queries.\n  # (A \"Mutation\" type will be covered later on.)\n  type Query {\n    books: [Book]\n  }\n"]);

function _taggedTemplateLiteral(strings, raw) { return Object.freeze(Object.defineProperties(strings, { raw: { value: Object.freeze(raw) } })); }

var _require = require('apollo-server'),
    ApolloServer = _require.ApolloServer,
    gql = _require.gql;

var bodyParser = require("body-parser");

var _require2 = require("apollo-engine"),
    ApolloEngine = _require2.ApolloEngine;

var _require3 = require("./schema"),
    schema = _require3.schema;

require('dotenv').config();

if (!process.env.ENGINE_API_KEY) {
  throw new Error("Please provide an API key for Apollo Engine in the environment variable ENGINE_API_KEY.");
}
var PORT = process.env.PORT || 3000;

// This is a (sample) collection of books we'll be able to query
// the GraphQL server for.  A more complete example might fetch
// from an existing data source like a REST API or database.
var _books = [{
  title: 'Harry Potter and the Chamber of Secrets',
  author: 'J.K. Rowling'
}, {
  title: 'Jurassic Park',
  author: 'Michael Crichton'
}];

// Type definitions define the "shape" of your data and specify
// which ways the data can be fetched from the GraphQL server.
var typeDefs = gql(_templateObject);

// Resolvers define the technique for fetching the types in the
// schema.  We'll retrieve books from the "books" array above.
var resolvers = {
  Query: {
    books: function books() {
      return _books;
    }
  }
};

// In the most basic sense, the ApolloServer can be started
// by passing type definitions (typeDefs) and the resolvers
// responsible for fetching the data for those types.
var server = new ApolloServer({
  typeDefs: typeDefs,
  resolvers: resolvers,
  engine: true
});

// This `listen` method launches a web-server.  Existing apps
// can utilize middleware options, which we'll discuss later.
server.listen().then(function (_ref) {
  var url = _ref.url;

  console.log("\uD83D\uDE80  Server ready at " + url);
});

//  apiKey: process.env.ENGINE_API_KEY,