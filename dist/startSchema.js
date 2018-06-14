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

    // STEP 3: CREATE CRAZY GraphQL SCHEMA WITH ALL CRUD USER OPERATIONS
    // via graphql-compose it will be much much easier, with less typing
    _graphqlCompose.schemaComposer.rootQuery().addFields({
      userById: PostTC.getResolver('findById'),
      userByIds: PostTC.getResolver('findByIds'),
      userOne: PostTC.getResolver('findOne'),
      userMany: PostTC.getResolver('findMany'),
      userCount: PostTC.getResolver('count'),
      userConnection: PostTC.getResolver('connection'),
      userPagination: PostTC.getResolver('pagination')
    });

    _graphqlCompose.schemaComposer.rootMutation().addFields({
      userCreate: PostTC.getResolver('createOne'),
      userUpdateById: PostTC.getResolver('updateById'),
      userUpdateOne: PostTC.getResolver('updateOne'),
      userUpdateMany: PostTC.getResolver('updateMany'),
      userRemoveById: PostTC.getResolver('removeById'),
      userRemoveOne: PostTC.getResolver('removeOne'),
      userRemoveMany: PostTC.getResolver('removeMany')
    });
  } catch (e) {
    console.log(e);
  }
  var graphqlSchema = _graphqlCompose.schemaComposer.buildSchema();
  return graphqlSchema;
};