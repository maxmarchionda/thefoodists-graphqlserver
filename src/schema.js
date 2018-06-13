const { gql } = require('apollo-server');

export default gql`
type Post {
  title: String
  author: String
  picture: String
}

# The "Query" type is the root of all GraphQL queries.
# (A "Mutation" type will be covered later on.)
type Query {
  posts: [Post]
}
`
