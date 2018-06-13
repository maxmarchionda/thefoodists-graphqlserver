"use strict";

var _apolloServer = require("apollo-server");

var _bodyParser = require("body-parser");

var _bodyParser2 = _interopRequireDefault(_bodyParser);

var _apolloEngine = require("apollo-engine");

var _schema = require("./schema");

var _schema2 = _interopRequireDefault(_schema);

var _books = require("./resolvers/books");

var _books2 = _interopRequireDefault(_books);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

require('dotenv').config();
require("babel-core/register");
require("babel-polyfill");

if (!process.env.ENGINE_API_KEY) {
  throw new Error("Please provide an API key for Apollo Engine in the environment variable ENGINE_API_KEY.");
}
var PORT = process.env.PORT || 3000;

// In the most basic sense, the ApolloServer can be started
// by passing type definitions (typeDefs) and the resolvers
// responsible for fetching the data for those types.
var server = new _apolloServer.ApolloServer({
  typeDefs: _schema2.default,
  resolvers: _books2.default,
  engine: true
});

// This `listen` method launches a web-server.  Existing apps
// can utilize middleware options, which we'll discuss later.
server.listen().then(function (_ref) {
  var url = _ref.url;

  console.log("\uD83D\uDE80  Server ready at " + url);
});

//  apiKey: process.env.ENGINE_API_KEY,