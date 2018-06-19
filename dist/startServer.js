"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.startServer = undefined;

var _apolloServer = require("apollo-server");

var _apolloEngine = require("apollo-engine");

var _bodyParser = require("body-parser");

var _bodyParser2 = _interopRequireDefault(_bodyParser);

var _express = require("express");

var _express2 = _interopRequireDefault(_express);

var _apolloServerExpress = require("apollo-server-express");

var _http = require("http");

var _http2 = _interopRequireDefault(_http);

var _https = require("https");

var _https2 = _interopRequireDefault(_https);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

// require("babel-core/register");
require("babel-polyfill");
require('dotenv').config();

if (!process.env.ENGINE_API_KEY) {
  throw new Error("Please provide an API key for Apollo Engine in the environment variable ENGINE_API_KEY.");
} else if (!process.env.PORT) {
  console.log("WARN -- using default port --");
}

var PORT = process.env.PORT || 3000;

var startServer = exports.startServer = function () {
  var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(schema) {
    var app, server;
    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            try {
              app = (0, _express2.default)();

              // bodyParser is needed just for POST.

              app.use('/graphql', _bodyParser2.default.json(), (0, _apolloServerExpress.graphqlExpress)({ schema: schema }));
              app.get('/graphiql', (0, _apolloServerExpress.graphiqlExpress)({ endpointURL: '/graphql' })); // if you want GraphiQL enabled
              server = app.listen(process.env.PORT || 3000, function () {
                var port = server.address().port;
                console.log("App now running on port", port);
              });

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