import { v2 as cloudinary } from "cloudinary";
import { configDotenv } from "dotenv";
configDotenv({ path: ".env" });

import fs from "fs";

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
});

const uploadOnCloudinary = async (LocalFilePath) => {
    try {
        if (!LocalFilePath) return null;
        // Upload file on cloudinary

        const result = await cloudinary.uploader.upload(LocalFilePath, {
            resource_type: "auto",
        });
        console.log("File uploaded", result.url);
        fs.unlinkSync(LocalFilePath);
        return result;
    } catch (error) {
        fs.unlinkSync(LocalFilePath);
        console.error("Error in uploading file on cloudinary", error);
        return null;
    }
};

export { uploadOnCloudinary };
