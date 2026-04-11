const express = require('express');
const router = express.Router();
const { adminLogin, registerUser, loginUser, getProfile } = require('../controllers/auth.controller');
const { protect } = require('../middleware/auth.middleware');

router.post('/admin-login', adminLogin);
router.post('/register', registerUser);
router.post('/login', loginUser);
router.get('/profile', protect, getProfile);

module.exports = router;
