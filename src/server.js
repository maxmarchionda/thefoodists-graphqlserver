import mongoose from 'mongoose';
import { startServer } from './startServer';
import { startSchema } from './startSchema';

require("babel-core/register");
require("babel-polyfill");
require('dotenv').config();

const MONGODB_URI = process.env.MONGODB_URI;

if (!process.env.MONGODB_URI) {
  throw new Error(
    "PLease provide a mongo URL for db connection in MONGO_URL."
  );
}

mongoose.connect(MONGODB_URI);
mongoose.connection.on('error', function(){throw new Error('Error connecting to MongoDB')});

mongoose.connection.on('connected', function(){
  const schema = startSchema();
  startServer(schema);
});
