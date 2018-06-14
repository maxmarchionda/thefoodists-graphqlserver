import mongoose from 'mongoose';
import { composeWithMongoose } from 'graphql-compose-mongoose';
import { schemaComposer } from 'graphql-compose';

export const startSchema = () => {
  try {
    // STEP 1: DEFINE MONGOOSE SCHEMA AND MODEL
    const PostSchema = new mongoose.Schema({
      title: String,
      author: String,
      picture: String
    });

    const PostModel = mongoose.model('Post', PostSchema);

    // STEP 2: CONVERT MONGOOSE MODEL TO GraphQL PIECES
    const customizationOptions = {}; // left it empty for simplicity, described below
    const PostTC = composeWithMongoose(PostModel, customizationOptions);

    // STEP 3: CREATE CRAZY GraphQL SCHEMA WITH ALL CRUD post OPERATIONS
    // via graphql-compose it will be much much easier, with less typing
    schemaComposer.rootQuery().addFields({
      postById: PostTC.getResolver('findById'),
      postByIds: PostTC.getResolver('findByIds'),
      postOne: PostTC.getResolver('findOne'),
      postMany: PostTC.getResolver('findMany'),
      postCount: PostTC.getResolver('count'),
      postConnection: PostTC.getResolver('connection'),
      postPagination: PostTC.getResolver('pagination'),
    });

    schemaComposer.rootMutation().addFields({
      postCreate: PostTC.getResolver('createOne'),
      postUpdateById: PostTC.getResolver('updateById'),
      postUpdateOne: PostTC.getResolver('updateOne'),
      postUpdateMany: PostTC.getResolver('updateMany'),
      postRemoveById: PostTC.getResolver('removeById'),
      postRemoveOne: PostTC.getResolver('removeOne'),
      postRemoveMany: PostTC.getResolver('removeMany'),
    });


  } catch (e) {
      console.log(e);
  }
  const graphqlSchema = schemaComposer.buildSchema();
  return graphqlSchema;
}
