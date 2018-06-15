'use strict';

var _mongoose = require('mongoose');

var _mongoose2 = _interopRequireDefault(_mongoose);

var _startServer = require('./startServer');

var _startSchema = require('./startSchema');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

require("babel-core/register");
require("babel-polyfill");
require('dotenv').config();

var MONGO_URL = process.env.MONGO_URL;

if (!process.env.MONGO_URL) {
  throw new Error("PLease provide a mongo URL for db connection in MONGO_URL.");
}

_mongoose2.default.connect(MONGO_URL);
_mongoose2.default.connection.on('error', function () {
  throw new Error('Error connecting to MongoDB');
});

_mongoose2.default.connection.on('connected', function () {
  var schema = (0, _startSchema.startSchema)();
  (0, _startServer.startServer)(schema);
});