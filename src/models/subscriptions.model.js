import mongoose from "mongoose";

const subscriptionsSchema = new mongoose.Schema(
    {
        subscriber: {
            type: mongoose.Schema.Types.ObjectId,

            ref: "User",
        },
        channel: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
        },
    },
    { timestamps: true }
);

const Subscription = mongoose.model("Subscription", subscriptionsSchema);

export default Subscription;
