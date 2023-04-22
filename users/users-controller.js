import * as usersDao from "./users-dao.js";
import mongoose from "mongoose";

function UsersController(app) {
  const findAllUsers = async (req, res) => {
    console.log("findAllUsers")
    try {
      const users = await usersDao.findAllUsers();
      console.log(users)
      res.send(users);
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: "Server error" });
    }
  };
  const deleteUserById = async (req, res) => {
    console.log("deleteUserById")
    try {
      const id = req.params.id;
      console.log('id: ' + id)
      const status = await usersDao.deleteUser(id);
      res.json(status);
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: "Server error" });
    }
  };
  const getUserById = async (req, res) => {
    console.log("getUserById")
    try {
      const id = req.params.id;
      console.log('id: ' + id)
      const status = await usersDao.findUserById(id);
      res.json(status);
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: "Server error" });
    }
    console.log()
  };
  const createUser = async (req, res) => {
    console.log("createUser")
    try {
      const user = await usersDao.createUser(req.body);
      res.json(user);
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: "Server error" });
    }
    console.log()
  };
  const updateUser = async (req, res) => {
    console.log("updateUser")
    try {
      const id = req.params.id;
      console.log('id: ' + id)
      const updatedUser = req.body;
      const status = await usersDao.updateUser(id, updatedUser);
      if (status.ok) {
        const user = await usersDao.findUserById(id);
        res.json(user);
      } else {
        res.sendStatus(500);
      }
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: "Server error" });
    }
  };  
  const login = async (req, res) => {
    console.log("login")
    try {
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
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: "Server error" });
    }
    console.log()
  };
  const logout = async (req, res) => {
    console.log("logout")
    try {
      req.session.destroy();
      res.sendStatus(204);
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: "Server error" });
    }
    console.log()
  };
  const profile = async (req, res) => {
    console.log("profile")
    try {
      console.log("users-controller -> profile");
      const currentUser = req.session["currentUser"];
      console.log(`currentUser : ${currentUser}`);
      if (currentUser) {
        res.send(currentUser);
      } else {
        res.sendStatus(404);
      }
    } catch (err) {
      console.error(err);
      console.log("req.params:")
      console.log(req.params)
      res.status(500).json({ error: "Server error" });
    }
    console.log()
  };
  const register = async (req, res) => {
    console.log('register')
    const user = req.body;
    console.log(user)
    try {
      const foundUser = await usersDao.findUserByUsername(req.body.username);
      if (foundUser) {
        return res.sendStatus(409);
      }
      const newUser = await usersDao.createUser(user);
      req.session["currentUser"] = newUser;
      res.json(newUser);
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: 'Server error' });
    }
    console.log()
  };
  
  const addUserLike = async (req, res) => {
    console.log("addUserLike");
    console.log(req.params);
    const userId = req.params.id;
    console.log("userId: " + userId);
    const artworkId = req.params.artworkId;
    console.log("artworkId: " + artworkId);
  
    try {

      const user = mongoose.Types.ObjectId.isValid(userId) ? await usersDao.findUserById(userId) : null;
  
      if (!user) {
        console.log(`User ${userId} not found`)
        return res.status(404).json({ error: 'User not found' });
      }
      else {
        if (user.likes.includes(artworkId)) {
          console.log("Artwork already liked")
          return res.status(400).json({ error: 'Artwork already liked' });
        }
        user.likes.push(artworkId);
        await user.save();
        console.log("user.likes: " + user.likes)
        res.json(user);
      }
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: 'Server error' });
    }
    console.log()
  };
  
  const removeUserLike = async (req, res) => {
    console.log("removeUserLike");
    const userId = req.params.id;
    console.log("userId: " + userId)
    const artworkId = req.params.artworkId;
    console.log("artworkId: " + artworkId)
    try {
      const user = await usersDao.findUserById(userId);
      if (!user) {
        return res.status(404).json({ error: 'User not found' });
      }
      if (!user.likes.includes(artworkId)) {
        return res.status(400).json({ error: 'Artwork not liked' });
      }
      user.likes = user.likes.filter((like) => like !== artworkId);
      await user.save();
      res.json(user);
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: 'Server error' });
    }
    console.log()
  };
  
  
  const getUserFollowers = async (req, res) => {
    console.log("getUserFollowers");
    const followed = req.params.id;
    //console.log(`followed: ${followed}`);
  
    try {
      const followerUsers = await usersDao.findFollowersByFollowedId(followed);
      res.json(followerUsers);
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: 'Server error' });
    }
    console.log()
  };

  const getUserLikes = async (req, res) => {
    console.log("getUserLikes")
    console.log("req.params:")
    console.log(req.params)
    const userId = req.params.id;
    try {
      const user = await usersDao.findUserById(userId);
      if (!user) {
        console.log("User not found")
        return res.status(404).json({ error: 'User not found' });
      }
      const likes = user.likes;
      console.log("user.likes: " + user.likes)
      res.json(likes);
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: 'Server error' });
    }
    console.log()
  };
  
  const followUser = async (req, res) => {
    console.log("followUser")
    const followerId = req.params.followerId;
    const followedId = req.params.followedId;
    try {
      const followerUser = await usersDao.findUserById(followerId);
      const followedUser = await usersDao.findUserById(followedId);
      if (!followerUser || !followedUser) {
        console.log("User not found")
        return res.status(404).json({ error: 'User not found' });
      }
      await usersDao.followUser(followerId, followedId);
      res.sendStatus(200);
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: 'Server error' });
    }
    console.log()
  };
  
  const unfollowUser = async (req, res) => {
    console.log("unfollowUser")
    const followerId = req.params.followerId;
    const followedId = req.params.followedId;
    try {
      const followerUser = await usersDao.findUserById(followerId);
      const followedUser = await usersDao.findUserById(followedId);
      if (!followerUser || !followedUser) {
        console.log("User not found")
        return res.status(404).json({ error: 'User not found' });
      }
      await usersDao.unfollowUser(followerId, followedId);
      res.sendStatus(200);
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: 'Server error' });
    }
    console.log()
  };
  
  const getUserFollowees = async (req, res) => {
    console.log("getUserFollowees");
    const followerId = req.params.id;
    try {
      const followees = await usersDao.findFolloweesByFollowerId(followerId);
      res.json(followees);
    } catch (error) {
      console.error(error);
      res.sendStatus(500);
    }
    console.log()
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
  app.post("/api/users/:id/likes/:artworkId", addUserLike);
  app.post("/api/users/:id/dislikes/:artworkId", removeUserLike);
  app.get("/api/users/:id/likes", getUserLikes);
  app.post("/api/users/:followerId/follows/:followedId", followUser);
  app.delete("/api/users/:followerId/follows/:followedId", unfollowUser);
  app.get("/api/users/:id/followees", getUserFollowees);
  app.get("/api/users/:id/followers", getUserFollowers);
}

export default UsersController;