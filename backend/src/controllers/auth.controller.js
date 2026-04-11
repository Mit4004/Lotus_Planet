const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const User = require('../models/User');

const generateToken = (id, email) => {
  return jwt.sign({ id, email }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRE || '7d',
  });
};

exports.adminLogin = async (req, res) => {
  const { email, password } = req.body;

  if (email === process.env.ADMIN_EMAIL && password === process.env.ADMIN_PASSWORD) {
    const token = generateToken('admin', email);
    return res.json({
      success: true,
      data: { id: 'admin', name: 'Admin', email, isAdmin: true, token },
      message: 'Admin login successful'
    });
  }
  
  res.status(401).json({ success: false, message: 'Invalid admin credentials' });
};

exports.registerUser = async (req, res) => {
  const { name, email, password, phone } = req.body;

  if (!name || !email || !password) {
    res.status(400); throw new Error('Please include all fields');
  }

  const userExists = await User.findOne({ email });
  if (userExists) {
    res.status(400); throw new Error('User already exists');
  }

  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);

  const user = await User.create({
    name, email, password: hashedPassword, phone
  });

  if (user) {
    res.status(201).json({
      success: true,
      data: {
        id: user._id, name: user.name, email: user.email, 
        isAdmin: user.isAdmin, token: generateToken(user._id, user.email)
      },
      message: 'Registration successful'
    });
  } else {
    res.status(400); throw new Error('Invalid user data');
  }
};

exports.loginUser = async (req, res) => {
  const { email, password } = req.body;

  // Check internal configurations for overarching Admin access first
  if (email === process.env.ADMIN_EMAIL && password === process.env.ADMIN_PASSWORD) {
    const token = generateToken('admin', email);
    return res.json({
      success: true,
      data: { id: 'admin', name: 'Admin', email, isAdmin: true, token },
      message: 'Admin login successful'
    });
  }

  // Fallback to searching Database for standard consumer accounts
  const user = await User.findOne({ email });

  if (user && (await bcrypt.compare(password, user.password))) {
    return res.json({
      success: true,
      data: {
        id: user._id, name: user.name, email: user.email, 
        isAdmin: user.isAdmin, token: generateToken(user._id, user.email)
      },
      message: 'Login successful'
    });
  } else {
    res.status(401); throw new Error('Invalid email or password');
  }
};

exports.getProfile = async (req, res) => {
  const user = await User.findById(req.user.id).select('-password');
  if (user) {
    res.json({ success: true, data: user });
  } else {
    res.status(404); throw new Error('User not found');
  }
};
