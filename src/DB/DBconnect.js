import mongoose from "mongoose";

export async function DBconnect() {
    try {
        const connection = await mongoose.connect(process.env.MONGO_URI);
        console.log("🟢 Connected to MongoDB:");
        console.log("🟢 Database name: ", connection.connection.name);
    } catch (error) {
        console.log("🔴 Error happend :", error.message);
    }
}
