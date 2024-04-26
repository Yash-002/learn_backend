import { asyncHandler } from "../utils/asyncHandler.js";
import User from "../models/user.model.js";

const registerUser = asyncHandler(async (req, res) => {
    //Get User Details form req {username , email , password , ,fullName , avatar , coverImage :optional}
    //Vaidation of all details  -- not empty
    //Check if User already exits
    //Check for coverImage:optional and avatar:required
    //upload to cloudinary , check avatar uploaded
    //create User object
    //remove password and refreshToken form res
    //check for user Creation
    //return res
});

export { registerUser };
