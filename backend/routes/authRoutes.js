const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const User = require('../models/userModel');
const salt = bcrypt.genSaltSync(10);

router.get('/', (req, res) => {
  res.redirect('/');
});

router.post('/register', async (req, res) => {
  const { name, username, role, email, password } = req.body;
  const newUser = await User.create({
    name,
    username,
    role,
    email,
    password: bcrypt.hashSync(password, salt),
  });
  const payload = {
    id: newUser._id,
    name: newUser.name,
    username: newUser.username,
    role: newUser.role,
    email: newUser.email,
  };

  jwt.sign(payload, process.env.JWT_SECRET, {}, (err, token) => {
    if (err) throw err;
    res.cookie('token', token).json(payload);
  });
});

router.get('/load', (req, res) => {
  const { token } = req.cookies;
  if (!token) {
    return res.status(401).json({ error: 'No token provided here' });
  }
  jwt.verify(token, process.env.JWT_SECRET, {}, (err, info) => {
    if (err) {
      return res.status(401).json({ error: 'Unauthorized' });
    }
    res.status(200).json(info);
  });
});

router.post('/logout', (req, res) => {
  res.clearCookie('token');
  res.status(200).json({ message: 'Logged out successfully' });
});

router.post('/login', async (req, res) => {
  const { username, password } = req.body;

  try {
    const user = await User.findOne({ username });
    if (!user) return res.status(400).json('Wrong Credentials');

    const passOk = bcrypt.compareSync(password, user.password);
    if (!passOk) return res.status(400).json('Wrong Credentials');

    const payload = {
      id: user._id,
      name: user.name,
      username: user.username,
      role: user.role,
      email: user.email,
    };

    jwt.sign(payload, process.env.JWT_SECRET, {}, (err, token) => {
      if (err) throw err;
      res.cookie('token', token).json(payload);
    });
  } catch (err) {
    console.error('Login error:', err);
    res.status(500).json('Internal Server Error');
  }
});

module.exports = router;
