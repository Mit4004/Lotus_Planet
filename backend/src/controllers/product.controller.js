const Product = require('../models/Product');

exports.getAllProducts = async (req, res) => {
  const { category, search, difficulty, minPrice, maxPrice, page = 1, limit = 10, sort } = req.query;
  let query = { visibility: 'Active' };

  if (req.user && req.user.isAdmin) {
    query = {}; 
  }

  if (search) {
    query.name = { $regex: search, $options: 'i' };
  }
  if (category) {
    query.category = category;
  }
  if (difficulty) {
    query.difficulty = difficulty;
  }
  if (minPrice || maxPrice) {
    query.basePrice = {};
    if (minPrice) query.basePrice.$gte = Number(minPrice);
    if (maxPrice) query.basePrice.$lte = Number(maxPrice);
  }

  let sortDef = { createdAt: -1 };
  if (sort === 'price_asc') sortDef = { basePrice: 1 };
  else if (sort === 'price_desc') sortDef = { basePrice: -1 };
  else if (sort === 'popular') sortDef = { purchases: -1, views: -1 };

  const products = await Product.find(query)
    .populate('category', 'name slug')
    .sort(sortDef)
    .limit(limit * 1)
    .skip((page - 1) * limit)
    .exec();

  const count = await Product.countDocuments(query);

  res.json({
    success: true,
    data: products,
    totalPages: Math.ceil(count / limit),
    currentPage: Number(page),
    totalCount: count
  });
};

exports.getProductBySlug = async (req, res) => {
  const product = await Product.findOne({ slug: req.params.slug }).populate('category', 'name slug');
  if (!product) {
    res.status(404); throw new Error('Product not found');
  }

  product.views += 1;
  await product.save();

  res.json({ success: true, data: product });
};

exports.createProduct = async (req, res) => {
  const product = await Product.create(req.body);
  res.status(201).json({ success: true, data: product, message: 'Product created securely' });
};

exports.updateProduct = async (req, res) => {
  const product = await Product.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
  if (!product) {
    res.status(404); throw new Error('Product not found');
  }
  res.json({ success: true, data: product, message: 'Product updated successfully' });
};

exports.deleteProduct = async (req, res) => {
  const product = await Product.findByIdAndUpdate(req.params.id, { visibility: 'Hidden' });
  if (!product) {
    res.status(404); throw new Error('Product not found');
  }
  res.json({ success: true, message: 'Product hidden successfully' });
};

exports.trackCartAdd = async (req, res) => {
  const product = await Product.findById(req.params.id);
  if (product) {
    product.cartAdds += 1;
    await product.save();
    return res.json({ success: true, message: 'Cart add tracked' });
  }
  res.status(404); throw new Error('Product not found');
};
