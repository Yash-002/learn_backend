import dotenv from "dotenv";
import app from "./app.js";
import { DBconnect } from "./DB/DBconnect.js";
dotenv.config({ path: "./.env" });

DBconnect()
    .then(() => {
        app.listen(process.env.PORT || 8000, () => {
            console.log(
                `🏃🏼‍♀️‍➡️ Server is running on http://localhost:${process.env.PORT}`
            );
        });
    })
    .catch((error) => {
        console.log("🔴 Error happend :", error.message);
    });
