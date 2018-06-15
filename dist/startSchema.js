'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.startSchema = undefined;

var _mongoose = require('mongoose');

var _mongoose2 = _interopRequireDefault(_mongoose);

var _graphqlComposeMongoose = require('graphql-compose-mongoose');

var _graphqlCompose = require('graphql-compose');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var startSchema = exports.startSchema = function startSchema() {
  try {
    // STEP 1: DEFINE MONGOOSE SCHEMA AND MODEL
    var PostSchema = new _mongoose2.default.Schema({
      title: String,
      author: String,
      picture: String
    });

    var PostModel = _mongoose2.default.model('Post', PostSchema);

    // STEP 2: CONVERT MONGOOSE MODEL TO GraphQL PIECES
    var customizationOptions = {}; // left it empty for simplicity, described below
    var PostTC = (0, _graphqlComposeMongoose.composeWithMongoose)(PostModel, customizationOptions);

    // STEP 3: CREATE CRAZY GraphQL SCHEMA WITH ALL CRUD post OPERATIONS
    // via graphql-compose it will be much much easier, with less typing
    _graphqlCompose.schemaComposer.rootQuery().addFields({
      postById: PostTC.getResolver('findById'),
      postByIds: PostTC.getResolver('findByIds'),
      postOne: PostTC.getResolver('findOne'),
      postMany: PostTC.getResolver('findMany'),
      postCount: PostTC.getResolver('count'),
      postConnection: PostTC.getResolver('connection'),
      postPagination: PostTC.getResolver('pagination')
    });

    _graphqlCompose.schemaComposer.rootMutation().addFields({
      postCreate: PostTC.getResolver('createOne'),
      postUpdateById: PostTC.getResolver('updateById'),
      postUpdateOne: PostTC.getResolver('updateOne'),
      postUpdateMany: PostTC.getResolver('updateMany'),
      postRemoveById: PostTC.getResolver('removeById'),
      postRemoveOne: PostTC.getResolver('removeOne'),
      postRemoveMany: PostTC.getResolver('removeMany')
    });
  } catch (e) {
    console.log(e);
  }
  var graphqlSchema = _graphqlCompose.schemaComposer.buildSchema();
  return graphqlSchema;
};