"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.startServer = undefined;

var _apolloServer = require("apollo-server");

var _bodyParser = require("body-parser");

var _bodyParser2 = _interopRequireDefault(_bodyParser);

var _apolloEngine = require("apollo-engine");

var _mongodb = require("mongodb");

var _graphqlTools = require("graphql-tools");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }
// import schema from "./schemamongoose";


// import r from "./resolvers/books";
require("babel-core/register");
require("babel-polyfill");
require('dotenv').config();

if (!process.env.ENGINE_API_KEY) {
  throw new Error("Please provide an API key for Apollo Engine in the environment variable ENGINE_API_KEY.");
} else if (!process.env.PORT) {
  console.log("WARN -- using default port --");
}

var PORT = process.env.PORT || 3000;

var prepare = function prepare(o) {
  o._id = o._id.toString();
  return o;
};

var startServer = exports.startServer = function () {
  var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(schema) {
    var server;
    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            try {

              // const client = await MongoClient.connect(MONGO_URL);


              server = new _apolloServer.ApolloServer({
                schema: schema,
                // typeDefs: typeDefs,
                // resolvers: resolvers,
                engine: true
              });

              // var db = client.db();
              // const Posts = db.collection('Posts');

              // const resolvers = {
              //   Query: {
              //     posts: async () => {
              //       return (await Posts.find({}).toArray()).map(prepare)
              //     },
              //   }
              // }


              server.listen().then(function (_ref2) {
                var url = _ref2.url;

                console.log("\uD83D\uDE80  Server ready at " + url);
              });
            } catch (e) {
              console.log(e);
            }

          case 1:
          case "end":
            return _context.stop();
        }
      }
    }, _callee, undefined);
  }));

  return function startServer(_x) {
    return _ref.apply(this, arguments);
  };
}();