import mongoose from 'mongoose';
import { startServer } from './startServer';
import { startSchema } from './startSchema';

require("babel-core/register");
require("babel-polyfill");
require('dotenv').config();

const MONGO_URL = process.env.MONGO_URL;

if (!process.env.MONGO_URL) {
  throw new Error(
    "PLease provide a mongo URL for db connection in MONGO_URL."
  );
}

mongoose.connect(MONGO_URL);
mongoose.connection.on('error', function(){throw new Error('Error connecting to MongoDB')});

mongoose.connection.on('connected', function(){
  const schema = startSchema();
  startServer(schema);
});
