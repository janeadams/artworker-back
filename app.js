import express from "express";
import cors from "cors";
import TodosController from "./todos/todos-controller.js";
import MathController from "./math/math-controller.js";
import ProfileController from "./profile/profile-controller.js";
import ArtworkerController from "./artworker/artworker-controller.js";
import UsersController from "./users/users-controller.js";
import AlbumsController from "./albums/albums-controller.js";
import SessionController from "./session-controller.js";
import LikesController from "./likes/likes-controller.js";
import mongoose from "mongoose";
import session from "express-session";

mongoose.connect("mongodb://127.0.0.1:27017/artworker");

const app = express();
app.use(
  cors({
    credentials: true,
    origin: "http://localhost:3000",
  })
);
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

LikesController(app);
SessionController(app);
AlbumsController(app);
UsersController(app);
MathController(app);
ProfileController(app);
TodosController(app);
ArtworkerController(app);

app.get("/hello/:message", function (req, res) {
  const message = req.params.message;
  res.send(`Hello ${message}`);
});

app.listen(4000);
