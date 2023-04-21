import { findUserById } from "./../users/users-dao.js";

function ProfileController(app) {
  app.get("/profile/:id", async function (req, res) {
    try {
      const userId = req.params.id;
      const user = await findUserById(userId);
      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }
      const profile = {
        username: user.username,
        firstName: user.firstName,
        lastName: user.lastName,
        likes: user.likes,
      };
      res.json(profile);
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: "Server error" });
    }
  });
  app.get("/profile", function (req, res) {
    res.send("Profiles");
  });
  app.get("/login", function (req, res) {
    res.send("Login");
  });
  app.get("/register", function (req, res) {
    res.send("Register");
  });
}

export default ProfileController;
