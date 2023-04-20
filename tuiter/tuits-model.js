import mongoose from "mongoose";
import artworksSchema from "./artworks-schema.js";
const artworksModel = mongoose.model("artworks", artworksSchema);
export default artworksModel;
