import mongoose from 'mongoose';
import Admin from './models/Admin.js';
import dotenv from 'dotenv';

dotenv.config();

async function checkAdmins() {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log("Connected to DB");

        const search = "Jenna";
        const admins = await Admin.find({
            $or: [
                { adminName: { $regex: search, $options: 'i' } },
                { restaurantName: { $regex: search, $options: 'i' } },
                { email: { $regex: search, $options: 'i' } }
            ]
        });

        console.log(`Found ${admins.length} admins matching "${search}":`);
        admins.forEach(a => {
            console.log(`- Name: ${a.adminName}, Email: ${a.email}, Restaurant: ${a.restaurantName}`);
        });

        const allAdmins = await Admin.find({}, 'email restaurantName');
        console.log("All existing accounts (email/restaurant):");
        allAdmins.forEach(a => {
            console.log(`- ${a.email} / ${a.restaurantName}`);
        });

        process.exit(0);
    } catch (err) {
        console.error(err);
        process.exit(1);
    }
}

checkAdmins();
