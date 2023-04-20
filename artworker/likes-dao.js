import {findUserById} from "../users/users-dao.js";

export const addLike = async (userId, artworkId) => {
    const user = await findUserById(userId);
    console.log(user)
  
    // Push the new artworkId to the likes array
    user.likes.push(artworkId);
  
    // Save the updated user document to the database
    const updatedUser = await user.save();
  
    return updatedUser;
  };