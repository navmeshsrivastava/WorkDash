require('dotenv').config();
const express = require('express');
const app = express();
const cors = require('cors');
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');

const authRoutes = require('./routes/authRoutes');
const taskRoutes = require('./routes/taskRoutes');

const allowedOrigins = [
  'http://localhost:3000',
  'https://workdash-project.onrender.com',
];

app.use(
  cors({
    origin: allowedOrigins,
    credentials: true,
  })
);

app.use(express.json());
app.use(cookieParser());

mongoose
  .connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log('Connected to DB'))
  .catch((err) => console.error('Failed to connect to DB:', err));

app.get('/', (req, res) => {
  res.status(200).send('Server is running');
});

app.use('/auth', authRoutes);
app.use('/task', taskRoutes);

app.listen(4000, () => {
  console.log('Server running on port 4000');
});
