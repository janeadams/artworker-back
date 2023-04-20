import mongoose from "mongoose";
const artworksSchema = new mongoose.Schema(
  {
    text: String,
    editing: Boolean,
  },
  { collection: "artworks" }
);
export default artworksSchema;
