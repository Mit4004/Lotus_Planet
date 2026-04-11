const express = require('express');
const router = express.Router();
const { getAllProducts, getProductBySlug, createProduct, updateProduct, deleteProduct, trackCartAdd } = require('../controllers/product.controller');
const { protect } = require('../middleware/auth.middleware');
const { admin } = require('../middleware/admin.middleware');

router.route('/')
  .get(getAllProducts)
  .post(protect, admin, createProduct);

router.post('/:id/track-cart', trackCartAdd);

router.route('/:id')
  .put(protect, admin, updateProduct)
  .delete(protect, admin, deleteProduct);

// Placed specific string matchers above wildcard IDs safely
router.get('/slug/:slug', getProductBySlug);

module.exports = router;
