import { asyncHandler } from "../utils/asyncHandler.js";
import User from "../models/user.model.js";
import { checkEmptyOrNull } from "../utils/validations.js";
import { ApiError } from "../utils/ApiError.js";

const registerUser = asyncHandler(async (req, res) => {
    //Get User Details form req {username , email , password , ,fullName , avatar , coverImage :optional}

    const { fullName, username, email, password } = req.body;

    //Vaidation of all details  -- not empty
    if (checkEmptyOrNull([fullName, username, email, password])) {
        throw new ApiError(400, "All fields Are required");
    }

    //Check if User already exits
    //Check for coverImage:optional and avatar:required
    //upload to cloudinary , check avatar uploaded
    //create User object
    //remove password and refreshToken form res
    //check for user Creation
    //return res
});

export { registerUser };
