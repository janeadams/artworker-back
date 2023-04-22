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
  console.log("createArtwork: " + (req.body.objectID ? req.body.objectID : 'objectID not passed in!'));

  const { objectID, title, artistDisplayName, medium, dimensions, primaryImage, primaryImageSmall } = req.body;

  const isUserCreated = !req.body.objectID;

  if (isUserCreated) {
    console.log("creating new artwork: " + title)

  }

  // Validate the input data

  if (!title || !artistDisplayName || !medium) {
    return res.status(400).json({ error: 'Invalid input data' });
  }

  // Normalize the data before checking for duplicates
  const normalizedArtwork = {
    objectID: objectID ? objectID.toString().trim().toLowerCase() : new ObjectId(),
    title: title ? title.trim().toLowerCase() : '',
    artistDisplayName: artistDisplayName ? artistDisplayName.trim().toLowerCase() : '',
    medium: medium ? medium.trim().toLowerCase() : '',
    dimensions: dimensions ? dimensions.toString().trim().toLowerCase() : '',
    primaryImage: primaryImage ? primaryImage.trim().toLowerCase() : '',
    primaryImageSmall: primaryImageSmall ? primaryImageSmall.trim().toLowerCase() : primaryImage,
    // Add other fields as necessary
  };

  console.log(normalizedArtwork);

  const existingArtwork = await artworksModel.findOne(normalizedArtwork);

  if (existingArtwork) {
    console.log(`Found ${existingArtwork.objectID} in the database`)
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
      if (isUserCreated) {
        console.log("saved new artwork:")
        console.log(savedArtwork)
    
      }
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