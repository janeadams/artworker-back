// A model is a constructor function that represents a collection of documents and provides an interface for interacting with the database. A model is created by compiling a schema, and is responsible for creating, updating, deleting, and querying documents in the database.

// The code defines a Mongoose schema for artworks and then creates a Mongoose model using the schema. The model is then exported as the default export of the module, which can be imported and used in other parts of the codebase.

import mongoose from "mongoose";

const artworkSchema = new mongoose.Schema(
  {},
  { strict: false, collection: "artworks" }
);

const artworksModel = mongoose.model("artworks", artworkSchema);

export default artworksModel;