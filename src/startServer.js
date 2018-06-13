import { ApolloServer } from 'apollo-server';
import bodyParser from "body-parser";
import { ApolloEngine } from "apollo-engine";
import typeDefs from "./schema";
import {MongoClient, ObjectId} from 'mongodb';
// import r from "./resolvers/books";

require('dotenv').config()
const MONGO_URL = 'mongodb://foodistsadmin:BitchesTr1p@ds153700.mlab.com:53700/heroku_dx326tsn';

const prepare = (o) => {
  o._id = o._id.toString();
  return o;
}

export const startServer = async () => {
  try {
    // const Posts = db.collection('Posts');
    const client = await MongoClient.connect(MONGO_URL);
    // console.log(client);
    var db = client.db();
    console.log(db);
    const Posts = db.collection('Posts');

    const posts = [
      {
        title: 'BBQ Boi',
        author: 'Max Marchionda',
        picture: 'https://images.meredith.com/content/dam/bhg/Images/recipe/38/R156350.jpg.rendition.largest.jpg',
      },
      {
        title: 'Louisianna Night',
        author: 'Spene Sterling',
        picture: 'http://lifemadesimplebakes.com/2017/01/sausage-pepper-and-rice-skillet/',
      },
    ];

    const resolvers = {
      Query: {
        posts: async () => {
          return (await Posts.find({}).toArray()).map(prepare)
        },
      }
    }

    if (!process.env.ENGINE_API_KEY) {
      throw new Error(
        "Please provide an API key for Apollo Engine in the environment variable ENGINE_API_KEY."
      );
    }
    const PORT = process.env.PORT || 3000;

    // In the most basic sense, the ApolloServer can be started
    // by passing type definitions (typeDefs) and the resolvers
    // responsible for fetching the data for those types.
    const server = new ApolloServer({
      typeDefs: typeDefs,
      resolvers: resolvers,
      engine: true
    });

    server.listen().then(({ url }) => {
      console.log(`🚀  Server ready at ${url}`);
    });
  } catch (e) {
    console.log(e);
  }
}
