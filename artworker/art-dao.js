import axios from "axios";
import artworksModel from "./art-model.js";

const API_URL = "https://collectionapi.metmuseum.org/public/collection/v1";

export const getArtwork = async (objectId) => {
  console.log("getArtwork: " + objectId)
  try {
    const response = await axios.get(`${API_URL}/objects/${objectId}`);
    return response;
  } catch (error) {
    console.log(`Error on ${objectId}. Checking local database...`);
    try {
      const response = await findArtworkById(objectId);
      return response;
    }
    catch (error) {
      console.log(`Error on ${objectId}`);
    }
    return error;
  }
};

export const findAllArtworks = async () => {
  console.log("findAllArtworks")
  const artworks = await artworksModel.find();
  return artworks;
};

export const findArtworkById = async (id) => {
  console.log("findArtworkById: " + id)
  const artwork = await artworksModel.findById(id);
  return artwork;
};

export const deleteArtwork = async (id) => {
  console.log("deleteArtwork: " + id)
  const status = await artworksModel.deleteOne({ _id: id });
  return status;
};

export const createArtwork = async (id) => {
  console.log("createArtwork: " + id)
  const artwork = await getArtwork(id);
  const newArtwork = await artworksModel.create(artwork);
  return newArtwork;
};

export const updateArtwork = async (id, artwork) => {
  const status = await artworksModel.updateOne({ _id: id }, artwork);
  return status;
};
