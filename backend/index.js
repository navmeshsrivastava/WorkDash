require('dotenv').config();
const express = require('express');
const app = express();
const cors = require('cors');
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const cookieParser = require('cookie-parser');

const User = require('./models/userModel');
const Task = require('./models/taskModel');

const multer = require('multer');
const { storage } = require('./utils/cloudinary');
const upload = multer({ storage });

const authRoutes = require('./routes/authRoutes');
const taskRoutes = require('./routes/taskRoutes');

app.use(cors({ origin: 'http://localhost:3000', credentials: true }));
app.use(express.json());
app.use(cookieParser());

mongoose
  .connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log('Connected to DB'))
  .catch((err) => console.error('Failed to connect to DB:', err));

app.use('/auth', authRoutes);
app.use('/task', taskRoutes);

app.listen(4000);
