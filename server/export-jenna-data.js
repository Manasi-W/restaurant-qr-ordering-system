import mongoose from "mongoose";
import Admin from "./models/Admin.js";
import Menu from "./models/Menu.js";
import Order from "./models/Order.js";
import dotenv from "dotenv";

dotenv.config();

const ATLAS_URI = process.env.MONGO_URI;
const LOCAL_URI = "mongodb://localhost:27017/restaurant-ordering";

async function exportData() {
    try {
        console.log("Connecting to LOCAL DB...");
        await mongoose.connect(LOCAL_URI);

        const admin = await Admin.findOne({ restaurantName: "Jenna's Kitchen" });
        if (!admin) {
            console.log("Jenna's Kitchen not found locally.");
            process.exit(0);
        }
        const oldAdminId = admin._id;

        const menus = await Menu.find({ admin: oldAdminId });
        const orders = await Order.find({ restaurant: "Jenna's Kitchen" });

        console.log("DATA_START");
        console.log(JSON.stringify({
            oldAdminId,
            menus,
            orders
        }));
        console.log("DATA_END");

        await mongoose.disconnect();
    } catch (err) {
        console.error("Export Error:", err.message);
    }
}

exportData();
