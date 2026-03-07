import mongoose from "mongoose";
import Admin from "./models/Admin.js";
import Menu from "./models/Menu.js";
import Order from "./models/Order.js";
import dotenv from "dotenv";

dotenv.config();

const ATLAS_URI = process.env.MONGO_URI;

async function verify() {
    try {
        await mongoose.connect(ATLAS_URI);
        const admin = await Admin.findOne({ restaurantName: "Jenna's Kitchen" });
        if (!admin) {
            console.log("Admin not found on Atlas.");
            process.exit(1);
        }

        const menuCount = await Menu.countDocuments({ admin: admin._id });
        const orderCount = await Order.countDocuments({ restaurant: "Jenna's Kitchen" });

        console.log(`Verification for ${admin.restaurantName} (ID: ${admin._id}):`);
        console.log(`- Menu items on Atlas: ${menuCount}`);
        console.log(`- Orders on Atlas: ${orderCount}`);

        await mongoose.disconnect();
    } catch (err) {
        console.error("Verification Error:", err.message);
    }
}

verify();
