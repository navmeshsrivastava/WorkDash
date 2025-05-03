require('dotenv').config();
const express = require('express');
const app = express();
const cors = require('cors');
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const cookieParser = require('cookie-parser');

const User = require('./models/userModel');
const Task = require('./models/taskModel');
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
    res.cookie('token', token).json(payload);
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

app.post('/login', async (req, res) => {
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

app.post('/task', (req, res) => {
  const { token } = req.cookies;

  if (!token) {
    return res.status(401).json({ error: 'No token provided' });
  }

  const { title, description, deadline } = req.body;

  if (!title || !description || !deadline) {
    return res.status(400).json({ error: 'Missing required fields' });
  }

  jwt.verify(token, process.env.JWT_SECRET, {}, async (err, info) => {
    if (err) {
      return res.status(401).json({ error: 'Unauthorized' });
    }

    const task = await Task.create({
      title,
      description,
      deadline,
      manager: info.id,
    });

    res.send(task);
  });
});

app.get('/task', async (req, res) => {
  try {
    const tasks = await Task.find()
      .sort({ createdAt: -1 })
      .populate('manager', 'name role email');
    res.status(200).json(tasks);
  } catch (error) {
    console.error('Failed to fetch tasks:', error);
    res.status(500).json({ error: 'Failed to fetch tasks' });
  }
});

app.get('/task/:taskId', async (req, res) => {
  const { taskId } = req.params;

  if (!mongoose.Types.ObjectId.isValid(taskId)) {
    return res.status(400).json({ error: 'Invalid task ID' });
  }

  try {
    const task = await Task.findById(taskId).populate(
      'manager',
      'name role email'
    );
    if (!task) return res.status(404).json({ error: 'Task not found' });

    res.status(200).json(task);
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
});
// Visit Logout function

app.listen(4000);
