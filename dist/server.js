'use strict';

var _mongoose = require('mongoose');

var _mongoose2 = _interopRequireDefault(_mongoose);

var _startServer = require('./startServer');

var _startSchema = require('./startSchema');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

require("babel-core/register");
require("babel-polyfill");
require('dotenv').config();

var MONGODB_URI = process.env.MONGODB_URI;

if (!process.env.MONGODB_URI) {
  throw new Error("PLease provide a mongo URL for db connection in MONGODB_URI.");
}

_mongoose2.default.connect(MONGODB_URI);
_mongoose2.default.connection.on('error', function () {
  throw new Error('Error connecting to MongoDB');
});

_mongoose2.default.connection.on('connected', function () {
  var schema = (0, _startSchema.startSchema)();
  (0, _startServer.startServer)(schema);
});