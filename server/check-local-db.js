import mongoose from "mongoose";
import Admin from "./models/Admin.js";
import dotenv from "dotenv";

dotenv.config();

const LOCAL_URI = "mongodb://localhost:27017/restaurant-ordering";

async function checkLocal() {
    try {
        await mongoose.connect(LOCAL_URI);
        const jenna = await Admin.findOne({ restaurantName: /Jenna/i });
        if (jenna) {
            console.log("JENNA_DATA_START");
            console.log(JSON.stringify(jenna));
            console.log("JENNA_DATA_END");
        } else {
            console.log("Jenna not found in local DB");
        }
        await mongoose.disconnect();
    } catch (err) {
        console.error("Error:", err.message);
    }
}

checkLocal();
