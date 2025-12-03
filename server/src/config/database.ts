import mongoose from "mongoose"
import Log from "@/utils/logger.js";
import dotenv from "dotenv";

dotenv.config();

const createDbConnection = async () => {
    try {
        const mongose = mongoose;
        const mongoUri = process.env.MONGO_URI || "";
        await mongose.connect(mongoUri);
        console.log("Database connected successfully");
    } catch (error) {
        Log.error("Database connection error: ", error);
        process.exit(1);
    }
}

export default createDbConnection;