const router = require('express').Router();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/User');

// Signup Route
router.post('/signup', async (req, res) => {
  try {
    const { username, email, password, role, secretKey } = req.body;

    // Check if user already exists
    let user = await User.findOne({ email });
    if (user) {
      return res.status(400).json({ message: 'User already exists' });
    }

    // Validate secret key for admin
    if (role === 'admin' && secretKey !== process.env.ADMIN_SECRET_KEY) {
      return res.status(400).json({ message: 'Invalid secret key' });
    }

    // Hash the password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    console.log('Hashed Password:', hashedPassword); // Debugging log

    // Create new user
    user = new User({ username, email, password: hashedPassword, role });
    await user.save();

    // Generate JWT token
    const payload = { user: { id: user.id, role: user.role } };
    const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '1h' });

    // Send token to the client
    res.json({ token });
  } catch (err) {
    console.error(err);
    res.status(500).send('Server error');
  }
});

// Login Route
router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;

    // Check if user exists
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    // Debugging logs
    console.log('Stored Hash:', user.password); // Debugging log
    console.log('Plain Password:', password); // Debugging log

    // Compare passwords
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    // Generate JWT token
    const payload = { user: { id: user.id, role: user.role } };
    const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '1h' });

    // Send token to the client
    res.json({ token });
  } catch (err) {
    console.error(err);
    res.status(500).send('Server error');
  }
});

module.exports = router;

