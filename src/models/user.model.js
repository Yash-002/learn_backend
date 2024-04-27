import mongoose from "mongoose";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

const userSchema = new mongoose.Schema(
    {
        username: {
            type: String,
            required: [true, "Username is required"],
            lowercase: true,
            unique: [true, "Username is already taken"],
            trim: true,
            index: true,
        },
        email: {
            type: String,
            required: [true, "Email is required"],
            lowercase: true,
            unique: [true, "Email is already registered"],
        },
        fullName: {
            type: String,
            required: [true, "Full name is required"],
            index: true,
            trim: true,
        },
        avatar: {
            type: String,
            required: true,
        },
        coverImage: {
            type: String,
            required: false,
        },
        password: {
            type: String,
            required: [true, "Password is required"],
        },
        refreshToken: {
            type: String,
        },
        watchHistory: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: "Video",
            },
        ],
    },
    { timestamps: true }
);

userSchema.pre("save", async function (next) {
    if (!this.isModified("password")) return next();
    this.password = await bcrypt.hash(this.password, 10);
    next();
});

userSchema.methods.passwordCheck = async function (password) {
    const result = await bcrypt.compare(password, this.password);
    return result;
};

userSchema.methods.genrateAccessToken = function () {
    const token = {
        id: this._id,
        username: this.username,
        email: this.email,
    };
    const result = jwt.sign(token, process.env.JWT_SECRET, {
        expiresIn: process.env.JWT_SECRET_EXPIRE,
    });
    return result;
};
userSchema.methods.genrateRefreshToken = function () {
    const token = {
        _id: this._id,
    };
    const result = jwt.sign(token, process.env.JWT_SECRET, {
        expiresIn: process.env.REFRESH_SECRET_EXPIRE,
    });
    return result;
};

const User = mongoose.model("User", userSchema);

export default User;
