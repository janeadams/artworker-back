import express from "express";
import cors from "cors";
import ProfileController from "./profile/profile-controller.js";
import ArtworkerController from "./artworker/art-controller.js";
import UsersController from "./users/users-controller.js";
import SessionController from "./session-controller.js";
import mongoose from "mongoose";
import session from "express-session";

mongoose.connect("mongodb://127.0.0.1:27017/artworker");

const app = express();

app.use(cors());
app.use(express.json());
app.use(
  session({
    secret: "process.env.SECRET",
    resave: false,
    cookie: { secure: false },
  })
);

app.get("/", function (req, res) {
  res.send("Hello World");
});

SessionController(app);
UsersController(app);
ProfileController(app);
ArtworkerController(app);

app.get("/hello/:message", function (req, res) {
  const message = req.params.message;
  res.send(`Hello ${message}`);
});

app.listen(4000);
