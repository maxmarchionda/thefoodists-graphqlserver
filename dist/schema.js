'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _templateObject = _taggedTemplateLiteral(['\ntype Post {\n  title: String\n  author: String\n  picture: String\n}\n\n# The "Query" type is the root of all GraphQL queries.\n# (A "Mutation" type will be covered later on.)\ntype Query {\n  posts: [Post]\n}\n'], ['\ntype Post {\n  title: String\n  author: String\n  picture: String\n}\n\n# The "Query" type is the root of all GraphQL queries.\n# (A "Mutation" type will be covered later on.)\ntype Query {\n  posts: [Post]\n}\n']);

function _taggedTemplateLiteral(strings, raw) { return Object.freeze(Object.defineProperties(strings, { raw: { value: Object.freeze(raw) } })); }

var _require = require('apollo-server'),
    gql = _require.gql;

exports.default = gql(_templateObject);