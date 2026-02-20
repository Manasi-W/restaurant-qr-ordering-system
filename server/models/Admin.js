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
    }

  },
  { timestamps: true }
);

export default mongoose.model("Admin", adminSchema);