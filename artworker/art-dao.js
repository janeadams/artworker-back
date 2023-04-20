import artworksModel from "./art-model.js";

export const findAllArtworks = async () => {
  const artworks = await artworksModel.find();
  return artworks;
};

export const findArtworkById = async (id) => {
  const artwork = await artworksModel.findById(id);
  return artwork;
};

export const deleteArtwork = async (id) => {
  const status = await artworksModel.deleteOne({ _id: id });
  return status;
};

export const createArtwork = async (artwork) => {
  const newArtwork = await artworksModel.create(artwork);
  return newArtwork;
};

export const updateArtwork = async (id, artwork) => {
  const status = await artworksModel.updateOne({ _id: id }, artwork);
  return status;
};
