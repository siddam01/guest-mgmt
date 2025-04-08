const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const router = express.Router();

// Mock database (replace with MongoDB later)
let users = [];

// Register
router.post('/register', async (req, res) => {
  const { email, password, role } = req.body;
  const hashedPassword = await bcrypt.hash(password, 10);
  users.push({ email, password: hashedPassword, role });
  res.status(201).send('User created');
});

// Login
router.post('/login', async (req, res) => {
  const user = users.find(u => u.email === req.body.email);
  if (user && await bcrypt.compare(req.body.password, user.password)) {
    const token = jwt.sign({ email: user.email }, 'your_secret_key');
    res.json({ token });
  } else {
    res.status(401).send('Invalid credentials');
  }
});

module.exports = router;