import mongoose from "mongoose";

const artworksSchema = new mongoose.Schema(
  {},
  { strict: false, collection: "artworks" }
);

export default artworksSchema;
