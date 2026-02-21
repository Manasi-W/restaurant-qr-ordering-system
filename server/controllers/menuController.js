import Menu from "../models/Menu.js";

// CREATE menu item
export const createMenuItem = async (req, res) => {
  try {
    const { name, price, category, description } = req.body;

    if (!name || !price) {
      return res.status(400).json({ message: "Name and price required" });
    }

    const imageUrl = req.file ? `/uploads/${req.file.filename}` : "";

    const item = await Menu.create({
      admin: req.admin._id,
      name,
      price,
      category,
      description,
      imageUrl
    });

    res.status(201).json(item);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

// GET all menu items (for logged-in admin)
export const getMyMenu = async (req, res) => {
  try {
    const items = await Menu.find({ admin: req.admin._id });
    res.json(items);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

// UPDATE menu item
export const updateMenuItem = async (req, res) => {
  try {
    const item = await Menu.findOne({
      _id: req.params.id,
      admin: req.admin._id,
    });

    if (!item) {
      return res.status(404).json({ message: "Menu item not found" });
    }

    const updateData = { ...req.body };
    if (req.file) {
      updateData.imageUrl = `/uploads/${req.file.filename}`;
    }

    Object.assign(item, updateData);
    await item.save();

    res.json(item);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

// DELETE menu item
export const deleteMenuItem = async (req, res) => {
  try {
    const item = await Menu.findOneAndDelete({
      _id: req.params.id,
      admin: req.admin._id,
    });

    if (!item) {
      return res.status(404).json({ message: "Menu item not found" });
    }

    res.json({ message: "Menu item deleted" });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};
