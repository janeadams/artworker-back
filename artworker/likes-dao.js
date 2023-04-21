import {findUserById} from "../users/users-dao.js";

export const addLike = async (userId, artworkId) => {
  try {
    const user = await findUserById(userId);
    console.log(user)

    // If user.likes is not an array, set it to an empty array
    if (!Array.isArray(user.likes)) {
      user.likes = [];
    }

    // Push the new artworkId to the likes array
    user.likes.push(artworkId);

    // Save the updated user document to the database
    const updatedUser = await user.save();

    return updatedUser;
  } catch (err) {
    console.error(err);
    return null;
  }
};

export const removeLike = async (userId, artworkId) => {
  try {
    const user = await findUserById(userId);
    console.log(user);

    // If user.likes is not an array, return the original user document
    if (!Array.isArray(user.likes)) {
      return user;
    }

    // Remove the artworkId from the likes array
    user.likes = user.likes.filter((likedArtworkId) => likedArtworkId !== artworkId);

    // Save the updated user document to the database
    const updatedUser = await user.save();

    return updatedUser;
  } catch (err) {
    console.error(err);
    return null;
  }
};