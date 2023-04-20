import mongoose from "mongoose";
const artworksSchema = new mongoose.Schema(
  {
    title: String,
    artist: String,
  },
  { collection: "artworks" }
);
export default artworksSchema;
