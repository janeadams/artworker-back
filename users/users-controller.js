import * as usersDao from "./users-dao.js";
import * as artworkDao from "../artworker/art-dao.js";

function UsersController(app) {
  const findAllUsers = async (req, res) => {
    const users = await usersDao.findAllUsers();
    res.send(users);
  };
  const deleteUserById = async (req, res) => {
    const id = req.params.id;
    const status = await usersDao.deleteUser(id);
    res.json(status);
  };
  const getUserById = async (req, res) => {
    console.log("getUserById: " + req.params)
    const id = req.params.id;
    const status = await usersDao.findUserById(id);
    res.json(status);
  };
  const createUser = async (req, res) => {
    const user = await usersDao.createUser(req.body);
    res.json(user);
  };
  const updateUser = async (req, res) => {
    const id = req.params.id;
    const updatedUser = req.body;
    const status = await usersDao.updateUser(id, updatedUser);
    if (status.ok) {
      const user = await usersDao.findUserById(id);
      res.json(user);
    } else {
      res.sendStatus(500);
    }
  };  
  const login = async (req, res) => {
    const user = req.body;
    console.log(user);
    const foundUser = await usersDao.findUserByCredentials(
      req.body.username,
      req.body.password
    );
    console.log(foundUser);
    if (foundUser) {
      req.session["currentUser"] = foundUser;
      res.send(foundUser);
    } else {
      res.sendStatus(404);
    }
  };
  const logout = async (req, res) => {
    req.session.destroy();
    res.sendStatus(204);
  };
  const profile = async (req, res) => {
    const currentUser = req.session["currentUser"];
    if (currentUser) {
      res.send(currentUser);
    } else {
      res.sendStatus(404);
    }
  };
  const register = async (req, res) => {
    const user = req.body;
    const foundUser = await usersDao.findUserByUsername(req.body.username);
    if (foundUser) {
      res.sendStatus(409);
    } else {
      const newUser = await usersDao.createUser(user);
      req.session["currentUser"] = newUser;
      res.json(newUser);
    }
  };

  const updateUserLikes = async (req, res) => {
    console.log("updateUserLikes")
    console.log(req.params)
    const userId = req.params.id;
    console.log(userId)
    const artworkId = req.params.artworkId;
    console.log(artworkId)
  
    try {
      const user = await usersDao.findUserById(userId);
      console.log(user)
  
      if (!user) {
        return res.status(404).json({ error: 'User not found' });
      }
  
      if (user.likes.includes(artworkId)) {
        return res.status(400).json({ error: 'Artwork already liked' });
      }
  
      user.likes.push(artworkId);
      await user.save();
  
      res.json(user);
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: 'Server error' });
    }
  };
  

  const getUserLikes = async (req, res) => {
    console.log("getUserLikes")
    console.log(req.params)
    const userId = req.params.id;
    const user = await usersDao.findUserById(userId);
    console.log(user)
    const likes = user.likes;
    res.json(likes);
  };

  app.post("/api/users/login", login);
  app.post("/api/users/logout", logout);
  app.get("/api/users/profile", profile);
  app.post("/api/users/register", register);
  app.get("/api/users", findAllUsers);
  app.get("/api/users/:id", getUserById);
  app.delete("/api/users/:id", deleteUserById);
  app.post("/api/users", createUser);
  app.put("/api/users/:id", updateUser);
  app.post("/api/users/:id/likes/:artworkId", updateUserLikes);
  app.get("/api/users/:id/likes", getUserLikes);
}

export default UsersController;
