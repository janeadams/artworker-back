import mongoose from "mongoose";
const usersSchema = new mongoose.Schema(
  {
    username: { type: String, unique: true, required: true },
    password: { type: String, required: true },
    firstName: String,
    lastName: String,
    role: { type: String, default: "CURATOR", enum: ["CURATOR", "ARTIST"] },
    likes: Array
  },
  {
    collection: "users",
  }
);
export default usersSchema;
