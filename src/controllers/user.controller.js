import { asyncHandler } from "../utils/asyncHandler.js";
import User from "../models/user.model.js";
import { checkEmptyOrNull } from "../utils/validations.js";
import { ApiError } from "../utils/ApiError.js";
import { uploadOnCloudinary } from "../utils/cloudinary.js";
import { ApiResponse } from "../utils/ApiResponse.js";

export const registerUser = asyncHandler(async (req, res) => {
    //Get User Details form req {username , email , password , ,fullName , avatar , coverImage :optional}
    const { fullName, username, email, password } = req.body;

    //Vaidation of all details  -- not empty
    if (checkEmptyOrNull([fullName, username, email, password])) {
        throw new ApiError(400, "All fields Are required");
    }

    //Check if User already exits
    const existedUser = await User.findOne({
        $or: [{ username }, { email }],
    });

    if (existedUser) {
        throw new ApiError(409, "User already exists");
    }

    //Check for coverImage:optional and avatar:required
    console.log(req?.files.avatar[0].path);
    const avatarImage = await req.files?.avatar?.[0]?.path;
    if (!avatarImage) {
        throw new ApiError(400, "Avatar is Required");
    }
    let coverImage;
    if (
        req.files &&
        Array.isArray(req.files.coverImage) &&
        req.files.coverImage.length > 0
    ) {
        coverImage = await req.files?.coverImage[0]?.path;
    }

    //upload to cloudinary , check avatar uploaded
    const uploadedAvatar = await uploadOnCloudinary(avatarImage);
    const uploadedCoverImage = await uploadOnCloudinary(coverImage);

    if (!uploadedAvatar) {
        throw new ApiError(500, "Avatar is Required");
    }

    //create User object
    const userObject = {
        username: username.toLowerCase(),
        email,
        password,
        fullName,
        avatar: uploadedAvatar.url,
        coverImage: uploadedCoverImage?.url || "",
    };

    const createdUser = await User.create(userObject);

    //check for user Creation
    //remove password and refreshToken form res
    const checkUser = await User.findById(createdUser._id).select(
        "-password -refreshToken"
    );
    if (!checkUser) {
        throw new ApiError(
            500,
            "Internal Server Error while registering the User"
        );
    }

    //return res
    return res
        .status(201)
        .json(new ApiResponse(200, "user created ", checkUser));
});
