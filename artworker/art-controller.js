import * as artworksDao from "./art-dao.js";
import artworksModel from "./art-model.js";
import { ObjectId } from 'mongodb';

function ArtworkerController(app) {
  const findAllArtworks = async (req, res) => {
    console.log('findAllArtworks')
    const artworks = await artworksDao.findAllArtworks();
    res.send(artworks);
  };

  const findArtworkById = async (req, res) => {
    console.log('findArtworkById')
    const id = req.params.id;
    console.log(id)
    const artwork = await artworksDao.findArtworkById(id);
    res.send(artwork);
  };
  
  const deleteArtworkById = async (req, res) => {
    console.log('deleteArtworkById')
    console.log(req.params.id)
    const id = req.params.id;
    const status = await artworksDao.deleteArtwork(id);
    res.json(status);
  };

const createArtwork = async (req, res) => {
  console.log("createArtwork: " + req.body.objectID);

  // Validate the input data
  const { title, artistDisplayName, medium } = req.body;
  if (!title || !artistDisplayName || !medium) {
    return res.status(400).json({ error: 'Invalid input data' });
  }

  // Normalize the data before checking for duplicates
  const normalizedArtwork = {
    title: title.trim().toLowerCase(),
    artistDisplayName: artistDisplayName.trim().toLowerCase(),
    medium: medium.trim().toLowerCase(),
    // Add other fields as necessary
  };

  const existingArtwork = await artworksModel.findOne(normalizedArtwork);
  console.log("existingArtwork. Checking:");
  console.log(normalizedArtwork);

  if (existingArtwork) {
    // Artwork already exists in the database, return an error response
    return res.status(409).json({ error: 'Artwork already exists in the database' });
  } else {
    // Artwork does not exist in the database, create a new artwork document
    try {
      const newArtwork = new artworksModel({
        ...req.body,
        _id: new ObjectId(),
      });
      const savedArtwork = await newArtwork.save();
      return res.json(savedArtwork);
    } catch (error) {
      console.error(error);
      return res.status(500).json({ error: 'Error saving artwork' });
    }
  }
};

  
  
  const updateArtwork = async (req, res) => {
    console.log('updateArtwork')
    console.log(req.params.id)
    const id = req.params.id;
    const status = await artworksDao.updateArtwork(id, req.body);
    res.json(status);
  };
  
  app.get("/api/artworks", findAllArtworks);
  app.get("/api/artworks/:id", findArtworkById);
  app.delete("/api/artworks/:id", deleteArtworkById);
  app.post("/api/artworks", createArtwork);
  app.put("/api/artworks/:id", updateArtwork);
}

export default ArtworkerController;