// import artworks from "./artworks.js";
import * as artworksDao from "./artworks-dao.js";

function ArtworkerController(app) {
  const findAllArtworks = async (req, res) => {
    const artworks = await artworksDao.findAllArtworks();
    res.send(artworks);
  };
  const findArtworkById = async (req, res) => {
    const id = req.params.id;
    // const artwork = artworks.find((artwork) => artwork.id === id);
    const artwork = await artworksDao.findArtworkById(id);
    res.send(artwork);
  };
  const deleteArtworkById = async (req, res) => {
    const id = req.params.id;
    // const artwork = artworks.find((artwork) => artwork.id === id);
    // const index = artworks.indexOf(artwork);
    // artworks.splice(index, 1);
    const status = await artworksDao.deleteArtwork(id);
    res.json(status);
  };
  const createArtwork = async (req, res) => {
    const artwork = req.body;
    // artworks.push({ ...artwork, id: new Date().getTime() });
    const newArtwork = await artworksDao.createArtwork(artwork);
    res.json(newArtwork);
  };
  const updateArtwork = async (req, res) => {
    const id = req.params.id;
    // const artwork = artworks.find((artwork) => artwork.id === id);
    // const index = artworks.indexOf(artwork);
    // artworks[index] = { ...artwork, ...req.body };
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
