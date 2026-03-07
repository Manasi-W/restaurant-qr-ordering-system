import mongoose from "mongoose";
import Admin from "./models/Admin.js";
import dotenv from "dotenv";

dotenv.config();

const ATLAS_URI = process.env.MONGO_URI;

const jennaData = {
    themeColors: { accent: "#65A30D", primary: "#166534", secondary: "#E7E5E4" },
    adminName: "Jenny",
    restaurantName: "Jenna's Kitchen",
    email: "admin@gmail.com",
    phone: "+91908754321",
    address: "123 Street",
    password: "$2b$10$0auIFREf/HTGUiUpdmwAn.SOLKgEzbQwlqRBYOx1kfTLlGB5rBa0m",
    tables: 5,
    userLogoUrl: "/uploads/logos/logo-1772383015855-userlogo.png",
    adminLogoUrl: "/uploads/logos/logo-1772381306560-logo.png"
};

async function migrate() {
    try {
        console.log("Connecting to ATLAS...");
        await mongoose.connect(ATLAS_URI);
        console.log("Connected to Atlas");

        const existing = await Admin.findOne({ email: jennaData.email });
        if (existing) {
            console.log("Account already exists on Atlas. Updating...");
            await Admin.updateOne({ email: jennaData.email }, jennaData);
        } else {
            console.log("Creating account on Atlas...");
            await Admin.create(jennaData);
        }

        console.log("Successfully migrated Jenna's Kitchen to Atlas!");
        await mongoose.disconnect();
    } catch (err) {
        console.error("Migration Error:", err.message);
    }
}

migrate();
