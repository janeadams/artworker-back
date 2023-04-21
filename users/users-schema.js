import mongoose from "mongoose";
const Schema = mongoose.Schema;

const userSchema = new Schema({
  username: String,
  password: String,
  firstName: String,
  lastName: String,
  role: { type: String, default: "CURATOR", enum: ["CURATOR", "ARTIST"] },
  likes: [{ type: String }],
},
{
  collection: "users",
  validateBeforeSave: false
});

export default userSchema;

