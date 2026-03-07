import mongoose from "mongoose";
import Admin from "./models/Admin.js";
import Menu from "./models/Menu.js";
import Order from "./models/Order.js";
import dotenv from "dotenv";

dotenv.config();

const ATLAS_URI = process.env.MONGO_URI;
const LOCAL_URI = "mongodb://localhost:27017/restaurant-ordering";

async function migrateData() {
    try {
        console.log("Connecting to LOCAL DB...");
        const localConn = await mongoose.createConnection(LOCAL_URI).asPromise();
        const LocalAdmin = localConn.model("Admin", Admin.schema);
        const LocalMenu = localConn.model("Menu", Menu.schema);
        const LocalOrder = localConn.model("Order", Order.schema);

        console.log("Connecting to ATLAS DB...");
        const atlasConn = await mongoose.createConnection(ATLAS_URI).asPromise();
        const AtlasAdmin = atlasConn.model("Admin", Admin.schema);
        const AtlasMenu = atlasConn.model("Menu", Menu.schema);
        const AtlasOrder = atlasConn.model("Order", Order.schema);

        // 1. Get Jenna's Kitchen Admin from both
        const localJenna = await LocalAdmin.findOne({ restaurantName: "Jenna's Kitchen" });
        const atlasJenna = await AtlasAdmin.findOne({ restaurantName: "Jenna's Kitchen" });

        if (!localJenna || !atlasJenna) {
            console.error("Could not find Jenna's Kitchen in one of the databases.");
            process.exit(1);
        }

        console.log(`Local ID: ${localJenna._id}, Atlas ID: ${atlasJenna._id}`);

        // 2. Migrate Menu
        const localMenus = await LocalMenu.find({ admin: localJenna._id });
        console.log(`Found ${localMenus.length} menu items locally.`);

        for (const menu of localMenus) {
            const menuData = menu.toObject();
            delete menuData._id; // Let Atlas generate new IDs or keeping them is fine if they don't clash
            menuData.admin = atlasJenna._id; // Update to new Admin ID

            // Simple check to avoid duplicates by name
            const exists = await AtlasMenu.findOne({ name: menuData.name, admin: atlasJenna._id });
            if (!exists) {
                await AtlasMenu.create(menuData);
                console.log(`Migrated menu item: ${menuData.name}`);
            } else {
                console.log(`Menu item already exists: ${menuData.name}`);
            }
        }

        // 3. Migrate Orders
        const localOrders = await LocalOrder.find({ restaurant: "Jenna's Kitchen" });
        console.log(`Found ${localOrders.length} orders locally.`);

        for (const order of localOrders) {
            const orderData = order.toObject();
            // Keep same _id if possible to maintain history consistency, or check if already exists
            const exists = await AtlasOrder.findById(orderData._id);
            if (!exists) {
                await AtlasOrder.create(orderData);
                console.log(`Migrated order: ${orderData._id}`);
            } else {
                console.log(`Order already exists: ${orderData._id}`);
            }
        }

        console.log("Migration completed successfully!");
        await localConn.close();
        await atlasConn.close();
    } catch (err) {
        console.error("Migration Error:", err);
    }
}

migrateData();
