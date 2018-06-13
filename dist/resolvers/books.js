'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _mongodb = require('mongodb');

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; } // This is a (sample) collection of books we'll be able to query
// the GraphQL server for.  A more complete example might fetch
// from an existing data source like a REST API or database.


var MONGO_URL = 'mongodb://foodistsadmin:BitchesTr1p@ds153700.mlab.com:53700/heroku_dx326tsn';
var db_promise = _mongodb.MongoClient.connect(MONGO_URL);
// const Posts = db.collection('Posts');

var posts = [{
  title: 'BBQ Boi',
  author: 'Max Marchionda',
  picture: 'https://images.meredith.com/content/dam/bhg/Images/recipe/38/R156350.jpg.rendition.largest.jpg'
}, {
  title: 'Louisianna Night',
  author: 'Spene Sterling',
  picture: 'http://lifemadesimplebakes.com/2017/01/sausage-pepper-and-rice-skillet/'
}];

var resolvers = {
  Query: {
    posts: function () {
      var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee() {
        var posts;
        return regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                _context.next = 2;
                return db_promise.then(function (db) {
                  db.collection('Posts').find({}).toArray();
                });

              case 2:
                _context.t0 = prepare;
                posts = _context.sent.map(_context.t0);

                console.log(posts);
                return _context.abrupt('return', posts);

              case 6:
              case 'end':
                return _context.stop();
            }
          }
        }, _callee, undefined);
      }));

      function posts() {
        return _ref.apply(this, arguments);
      }

      return posts;
    }()
  }
};

exports.default = resolvers;