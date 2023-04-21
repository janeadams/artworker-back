import usersModel from "./users-model.js";

export const findAllUsers = async () => {
  console.log('findAllUsers')
  const users = await usersModel.find();
  return users;
};

export const findAllCurators = async () => {
  console.log('findAllCurators')
  const users = await usersModel.find({ role: "CURATOR" });
  return users;
};

export const findAllArtists = async () => {
  console.log('findAllArtists')
  const users = await usersModel.find({ role: "ARTIST" });
  return users;
};

export const findAllByRole = async (role) => {
  console.log("findAllByRole: " + role)
  const users = await usersModel.find({ role });
  return users;
};

export const findUserById = async (id) => {
  console.log("findUserById: " + id)
  const user = await usersModel.findById(id);
  return user;
};

export const findUserByUsername = async (username) => {
  console.log("findUserByUsername: " + username)
  const user = await usersModel.findOne({ username });
  return user;
};

export const findUserByCredentials = async (username, password) => {
  console.log("findUserByCredentials: " + username + " " + password)
  const user = await usersModel.findOne({ username, password });
  return user;
};

export const deleteUser = async (id) => {
  console.log("deleteUser: " + id)
  const status = await usersModel.deleteOne({ _id: id });
  return status;
};

export const createUser = async (user) => {
  console.log("createUser: " + user)
  const newUser = await usersModel.create(user);
  return newUser;
};

export const updateUser = async (id, user) => {
  console.log("updateUser: " + id + " " + user)
  const status = await usersModel.updateOne({ _id: id }, user);
  return status;
};
