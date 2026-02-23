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
<<<<<<< HEAD
    },

    // Theme customization
    themeColors: {
      primary: { type: String, default: "#f472b6" },
      secondary: { type: String, default: "#c4b5fd" },
      accent: { type: String, default: "#86efac" }
    },

    // Logo URLs
    adminLogoUrl: String,
    userLogoUrl: String
=======
    }
>>>>>>> e9b0586b561afbb1060770286b8350347c0a78e6

  },
  { timestamps: true }
);

export default mongoose.model("Admin", adminSchema);