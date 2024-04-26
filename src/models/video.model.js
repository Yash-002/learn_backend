import mongoose from "mongoose";
import mongoosePaginate from "mongoose-paginate-v2";

const videoSchema = new mongoose.Schema(
    {
        videoFile: {
            type: String,
            required: [true, "Video file is required"],
        },
        thumbnail: {
            type: String,
            required: true,
        },
        owner: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true,
        },
        title: {
            type: String,
            required: true,
        },
        description: {
            type: String,
            required: true,
        },
        duration: {
            type: Number,
            required: true,
        },
        views: {
            type: Number,
            required: true,
            default: 0,
        },
        isPublished: {
            type: Boolean,
            required: true,
            default: true,
        },
    },
    { timestamps: true }
);
videoSchema.plugin(mongoosePaginate);

export const Video = mongoose.model("Video", videoSchema);
