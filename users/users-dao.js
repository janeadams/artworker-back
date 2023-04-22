import usersModel from "./users-model.js";

export const findAllUsers = async () => {
  console.log('findAllUsers')
  try {
    const users = await usersModel.find();
    return users;
  } catch (err) {
    console.error(err);
    return [];
  }
};

export const findAllCurators = async () => {
  console.log('findAllCurators')
  try {
    const users = await usersModel.find({ role: "CURATOR" });
    return users;
  } catch (err) {
    console.error(err);
    return [];
  }
};

export const findAllArtists = async () => {
  console.log('findAllArtists')
  try {
    const users = await usersModel.find({ role: "ARTIST" });
    return users;
  } catch (err) {
    console.error(err);
    return [];
  }
};

export const findAllByRole = async (role) => {
  console.log("findAllByRole: " + role)
  try {
    const users = await usersModel.find({ role });
    return users;
  } catch (err) {
    console.error(err);
    return [];
  }
};

export const findUserById = async (id) => {
  console.log("findUserById: " + id)
  try {
    const user = await usersModel.findById(id);
    return user;
  } catch (err) {
    console.error(err);
    return null;
  }
};

export const findUserByUsername = async (username) => {
  console.log("findUserByUsername: " + username)
  try {
    const user = await usersModel.findOne({ username });
    return user;
  } catch (err) {
    console.error(err);
    return null;
  }
};

export const findUserByCredentials = async (username, password) => {
  console.log("findUserByCredentials: " + username + " " + password)
  try {
    const user = await usersModel.findOne({ username, password });
    return user;
  } catch (err) {
    console.error(err);
    return null;
  }
};

export const deleteUser = async (id) => {
  console.log("deleteUser: " + id)
  try {
    const status = await usersModel.deleteOne({ _id: id });
    return status;
  } catch (err) {
    console.error(err);
    return null;
  }
};

export const createUser = async (user) => {
  console.log("createUser: " + user)
  try {
    const newUser = await usersModel.create(user);
    return newUser;
  } catch (err) {
    console.error(err);
    return null;
  }
};

export const updateUser = async (id, user) => {
  console.log("updateUser: " + id + " " + user)
  try {
    const status = await usersModel.updateOne({ _id: id }, user);
    return status;
  } catch (err) {
    console.error(err);
    return null;
  }
};

export const findFollowersByFollowedId = async (followedId) => {
  console.log("findFollowersByFollowedId: " + followedId)
  try {
    const users = await usersModel.find({ followedId });
    return users;
  } catch (err) {
    console.error(err);
    return [];
  }
}

export const findFolloweesByFollowerId = async (followerId) => {
  console.log("findFolloweesByFollowerId: " + followerId)
  try {
    const users = await usersModel.find({ followerId });
    return users;
  } catch (err) {
    console.error(err);
    return [];
  }
}