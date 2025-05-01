require('dotenv').config();
const express = require('express');
const app = express();
const cors = require('cors');
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const cookieParser = require('cookie-parser');

const User = require('./models/userModel');
const salt = bcrypt.genSaltSync(10);

app.use(cors({ origin: 'http://localhost:3000', credentials: true }));
app.use(express.json());
app.use(cookieParser());

mongoose
  .connect(process.env.MONGO_URL)
  .then((res) => console.log('connected to db'));

app.post('/register', async (req, res) => {
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
    res.cookie('token', token).json(newUser);
  });
});

app.get('/load', (req, res) => {
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

app.post('/logout', (req, res) => {
  res.clearCookie('token');
  res.status(200).json({ message: 'Logged out successfully' });
});

app.listen(4000);
