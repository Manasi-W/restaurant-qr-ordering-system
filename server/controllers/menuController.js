import Menu from "../models/Menu.js";

// CREATE menu item
export const createMenuItem = async (req, res) => {
  try {
    const { name, price, category, description } = req.body;

    if (!name || !price) {
      return res.status(400).json({ message: "Name and price required" });
    }

<<<<<<< HEAD
    // FormData sends strings; parse price to number
    const priceNum = typeof price === "string" ? parseFloat(price) : price;
    if (isNaN(priceNum)) {
      return res.status(400).json({ message: "Invalid price" });
    }

    const imageUrl = req.file ? `/uploads/${req.file.filename}` : "";
    const adminId = req.admin?._id || req.admin?.id;

    if (!adminId) {
      return res.status(401).json({ message: "Admin not found" });
    }

    const item = await Menu.create({
      admin: adminId,
      name,
      price: priceNum,
      category: category || "General",
      description: description || "",
=======
    const imageUrl = req.file ? `/uploads/${req.file.filename}` : "";

    const item = await Menu.create({
      admin: req.admin._id,
      name,
      price,
      category,
      description,
>>>>>>> e9b0586b561afbb1060770286b8350347c0a78e6
      imageUrl
    });

    res.status(201).json(item);
  } catch (error) {
<<<<<<< HEAD
    console.error("Create menu item error:", error);
    res.status(500).json({ message: error.message || "Server error" });
=======
    res.status(500).json({ message: "Server error" });
>>>>>>> e9b0586b561afbb1060770286b8350347c0a78e6
  }
};

// GET all menu items (for logged-in admin)
export const getMyMenu = async (req, res) => {
  try {
<<<<<<< HEAD
    const adminId = req.admin?._id || req.admin?.id;
    if (!adminId) {
      return res.status(401).json({ message: "Admin not found" });
    }
    const items = await Menu.find({ admin: adminId });
    res.json(items);
  } catch (error) {
    console.error("Get menu error:", error);
=======
    const items = await Menu.find({ admin: req.admin._id });
    res.json(items);
  } catch (error) {
>>>>>>> e9b0586b561afbb1060770286b8350347c0a78e6
    res.status(500).json({ message: "Server error" });
  }
};

// UPDATE menu item
export const updateMenuItem = async (req, res) => {
  try {
<<<<<<< HEAD
    const adminId = req.admin?._id || req.admin?.id;
    const item = await Menu.findOne({
      _id: req.params.id,
      admin: adminId,
=======
    const item = await Menu.findOne({
      _id: req.params.id,
      admin: req.admin._id,
>>>>>>> e9b0586b561afbb1060770286b8350347c0a78e6
    });

    if (!item) {
      return res.status(404).json({ message: "Menu item not found" });
    }

<<<<<<< HEAD
    const { name, price, category, description } = req.body;
    if (name) item.name = name;
    if (price !== undefined) {
      const priceNum = typeof price === "string" ? parseFloat(price) : price;
      if (!isNaN(priceNum)) item.price = priceNum;
    }
    if (category) item.category = category;
    if (description !== undefined) item.description = description;
    if (req.file) {
      item.imageUrl = `/uploads/${req.file.filename}`;
    }

    await item.save();
    res.json(item);
  } catch (error) {
    console.error("Update menu item error:", error);
    res.status(500).json({ message: error.message || "Server error" });
=======
    const updateData = { ...req.body };
    if (req.file) {
      updateData.imageUrl = `/uploads/${req.file.filename}`;
    }

    Object.assign(item, updateData);
    await item.save();

    res.json(item);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
>>>>>>> e9b0586b561afbb1060770286b8350347c0a78e6
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
