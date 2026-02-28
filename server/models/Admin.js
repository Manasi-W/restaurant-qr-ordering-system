import mongoose from "mongoose";

const adminSchema = new mongoose.Schema(
  {
    adminName: String,

    restaurantName: {
      type: String,
      required: true,
      unique: true
    },

    email: {
      type: String,
      unique: true
    },

    phone: String,
    address: String,
    password: String,

    tables: {
      type: Number,
      default: 0
    },
    // Theme customization
    themeColors: {
      primary: { type: String, default: "#166534" },
      secondary: { type: String, default: "#E7E5E4" },
      accent: { type: String, default: "#65A30D" }
    },
    // Logo URLs
    adminLogoUrl: String,
    userLogoUrl: String

  },
  { timestamps: true }
);

export default mongoose.model("Admin", adminSchema);