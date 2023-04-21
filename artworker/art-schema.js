// In Mongoose, a schema is a blueprint for the structure of a document in a MongoDB collection. It defines the shape of the documents, including the field names, data types, and validation rules.

import mongoose from "mongoose";

const artworksSchema = new mongoose.Schema(
  {},
  { strict: false, collection: "artworks", validateBeforeSave: false }
);

export default artworksSchema;
