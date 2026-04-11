const Category = require('../models/Category');

exports.getAllCategories = async (req, res) => {
  const categories = await Category.find({ isActive: true }).sort({ displayOrder: 1 });
  res.json({ success: true, data: categories });
};

exports.createCategory = async (req, res) => {
  const category = await Category.create(req.body);
  res.status(201).json({ success: true, data: category, message: 'Category created successfully' });
};

exports.updateCategory = async (req, res) => {
  const category = await Category.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
  if (!category) {
    res.status(404); throw new Error('Category not found');
  }
  res.json({ success: true, data: category, message: 'Category updated' });
};

exports.deleteCategory = async (req, res) => {
  const category = await Category.findByIdAndDelete(req.params.id);
  if (!category) {
    res.status(404); throw new Error('Category not found');
  }
  res.json({ success: true, message: 'Category deleted permanently' });
};
