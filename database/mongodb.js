import mongoose from "mongoose";
import { DB_URI } from "../config/env.js";

if (!DB_URI) {
    throw error("mongodb URI is missing")
}

const connectToDatabase = async () => {
    try {
        await mongoose.connect(DB_URI);
        console.log("connected to database");
    } catch (error) {
        console.error("error connecting to database", error);
        process.exit(1);
    }
}

export default connectToDatabase;