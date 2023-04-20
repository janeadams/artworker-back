import * as artworksDao from "./art-dao.js";
import { addLike } from "./likes-dao.js";

function ArtworkerController(app) {
  const findAllArtworks = async (req, res) => {
    const artworks = await artworksDao.findAllArtworks();
    res.send(artworks);
  };

  const updateUserLikes = async (userId, artworkId) => {
    const updatedUser = await addLike(userId, artworkId);
  };

  const findArtworkById = async (req, res) => {
    const id = req.params.id;
    const artwork = await artworksDao.findArtworkById(id);
    res.send(artwork);
  };
  const deleteArtworkById = async (req, res) => {
    const id = req.params.id;
    const status = await artworksDao.deleteArtwork(id);
    res.json(status);
  };
  const createArtwork = async (req, res) => {
    const artwork = req.body;
    const newArtwork = await artworksDao.createArtwork(artwork);
    res.json(newArtwork);
  };
  const updateArtwork = async (req, res) => {
    const id = req.params.id;
    const status = await artworksDao.updateArtwork(id, req.body);
    res.json(status);
  };
  app.get("/api/artworks", findAllArtworks);
  app.get("/api/artworks/:id", findArtworkById);
  app.delete("/api/artworks/:id", deleteArtworkById);
  app.post("/api/artworks", createArtwork);
  app.put("/api/artworks/:id", updateArtwork);
  app.post("/api/users/:uid/likes/:aid", updateUserLikes);
}

export default ArtworkerController;
