import { Router } from "express";
import {
    changeUserCurrentPassword,
    logOutUser,
    loginUser,
    refreshAccessToken,
    registerUser,
} from "../controllers/user.controller.js";
import { upload } from "../middlewares/multer.middleware.js";
import { verifyJWT } from "../middlewares/auth.middleware.js";

const router = Router();

router.route("/register").post(
    upload.fields([
        {
            name: "avatar",
            maxCount: 1,
        },
        {
            name: "coverImage",
            maxCount: 1,
        },
    ]),
    registerUser
);

router.route("/login").post(loginUser);

//secuerd Rouetes
router.route("/logout").post(verifyJWT, logOutUser);
router.route("/refresh-token").get(refreshAccessToken);
router.route("/password-change").post(verifyJWT, changeUserCurrentPassword);

export default router;
