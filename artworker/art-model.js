import mongoose from "mongoose";

const artworkSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    artist: { type: String, required: true },
    year: Number,
    description: String,
    image: String,
  },
  {
    collection: "artworks",
  }
);

const artworksModel = mongoose.model("artworks", artworkSchema);

export default artworksModel;