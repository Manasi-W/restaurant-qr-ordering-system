import mongoose from "mongoose";
import dotenv from "dotenv";
import path from "path";
import { fileURLToPath } from "url";
import Admin from "./models/Admin.js";

dotenv.config();

const check = async () => {
    try {
        console.log("--- DIAGNOSTICS ---");
        console.log("MONGO_URI:", process.env.MONGO_URI ? "Defined" : "MISSING");
        console.log("JWT_SECRET:", process.env.JWT_SECRET ? "Defined" : "MISSING");
        console.log("NODE_ENV:", process.env.NODE_ENV);

        await mongoose.connect(process.env.MONGO_URI);
        console.log("MongoDB Connection: SUCCESS");

        const admins = await Admin.find({}, "email restaurantName");
        console.log("Registered Admins Count:", admins.length);
        if (admins.length > 0) {
            console.log("Registered Emails:", admins.map(a => a.email).join(", "));
        }

        process.exit(0);
    } catch (err) {
        console.error("DIAGNOSTICS FAILED:", err);
        process.exit(1);
    }
};

check();
