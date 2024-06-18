const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');

const router = express.Router();
const secretKey = 'your_secret_key';

router.post('/register', async (req, res) => {
  const { username, email, password } = req.body;

  try {
      const existingUser = await User.findOne({ email });
      if (existingUser) return res.status(401).json({ message: 'User already exists' });

      const hashedPassword = await bcrypt.hash(password, 10);
      const newUser = new User({ username, email, password: hashedPassword });

      await newUser.save();
      return res.status(200).json({ message: 'User registered successfully' });
  } catch (error) {
      res.status(500).json({ message: 'Server error' });
  }
});

router.post('/login', async (req, res) => {
    const { email, password } = req.body;

    try {
        const user = await User.findOne({ email });
        if (!user) return res.status(400).json({ message: 'User not found' });

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) return res.status(400).json({ message: 'Invalid credentials' });

        const token= jwt.sign({ id: user._id }, secretKey, { expiresIn: '2h' });
        res.status(200).json({ token, user: {id: user._id, username: user.username, email: user.email} });
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
});

module.exports = router;