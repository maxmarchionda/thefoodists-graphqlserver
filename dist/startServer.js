"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.startServer = undefined;

var _apolloServer = require("apollo-server");

var _apolloEngine = require("apollo-engine");

var _bodyParser = require("body-parser");

var _bodyParser2 = _interopRequireDefault(_bodyParser);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

require("babel-core/register");
require("babel-polyfill");
require('dotenv').config();

if (!process.env.ENGINE_API_KEY) {
  throw new Error("Please provide an API key for Apollo Engine in the environment variable ENGINE_API_KEY.");
} else if (!process.env.PORT) {
  console.log("WARN -- using default port --");
}

var PORT = process.env.PORT || 4000;

var startServer = exports.startServer = function () {
  var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(schema) {
    var server;
    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            try {
              server = new _apolloServer.ApolloServer({
                schema: schema,
                engine: true
              });


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