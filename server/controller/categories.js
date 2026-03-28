const { toTitleCase } = require("../config/function");
const categoryModel = require("../models/categories");
const fs = require("fs");
const path = require("path");

const categoryImagePath = (filename) =>
  path.join(__dirname, "../public/uploads/categories/", filename);

class Category {
  async getAllCategory(req, res) {
    try {
      const Categories = await categoryModel.find({}).sort({ _id: -1 });
      return res.json({ Categories });
    } catch (err) {
      return res.status(500).json({ error: err.message });
    }
  }

  async postAddCategory(req, res) {
    let { cName, cDescription, cStatus } = req.body;
    const cImage = req.file ? req.file.filename : null;

    if (!cName || !cDescription || !cStatus || !cImage) {
      if (cImage) fs.unlink(categoryImagePath(cImage), () => {});
      return res.json({ error: "All fields are required" });
    }

    cName = toTitleCase(cName);
    try {
      const existing = await categoryModel.findOne({ cName });
      if (existing) {
        fs.unlink(categoryImagePath(cImage), () => {});
        return res.json({ error: "Category already exists" });
      }
      const newCategory = new categoryModel({ cName, cDescription, cStatus, cImage });
      await newCategory.save();
      return res.json({ success: "Category created successfully" });
    } catch (err) {
      return res.status(500).json({ error: err.message });
    }
  }

  async postEditCategory(req, res) {
    const { cId, cDescription, cStatus } = req.body;
    if (!cId || !cDescription || !cStatus) {
      return res.json({ error: "All fields are required" });
    }
    try {
      await categoryModel.findByIdAndUpdate(cId, { cDescription, cStatus, updatedAt: Date.now() });
      return res.json({ success: "Category updated successfully" });
    } catch (err) {
      return res.status(500).json({ error: err.message });
    }
  }

  async getDeleteCategory(req, res) {
    const { cId } = req.body;
    if (!cId) return res.json({ error: "All fields are required" });
    try {
      const category = await categoryModel.findById(cId);
      const deleted = await categoryModel.findByIdAndDelete(cId);
      if (deleted) {
        fs.unlink(categoryImagePath(category.cImage), (err) => {
          if (err) console.log(err);
        });
        return res.json({ success: "Category deleted successfully" });
      }
    } catch (err) {
      return res.status(500).json({ error: err.message });
    }
  }
}

const categoryController = new Category();
module.exports = categoryController;
