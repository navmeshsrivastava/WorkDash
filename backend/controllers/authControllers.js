const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/userModel');

const salt = bcrypt.genSaltSync(10);
const jwtSecret = process.env.JWT_SECRET;

const createToken = (payload) => {
  return jwt.sign(payload, jwtSecret, {});
};

exports.register = async (req, res) => {
  const { name, username, role, email, password } = req.body;

  try {
    const hashedPassword = bcrypt.hashSync(password, salt);
    const newUser = await User.create({
      name,
      username,
      role,
      email,
      password: hashedPassword,
    });

    const payload = {
      id: newUser._id,
      name: newUser.name,
      username: newUser.username,
      role: newUser.role,
      email: newUser.email,
    };

    const token = createToken(payload);
    res
      .cookie('token', token, {
        httpOnly: true,
        secure: true,
        sameSite: 'None',
        maxAge: 24 * 60 * 60 * 1000,
      })
      .json(payload);
  } catch (err) {
    console.error('Registration error:', err);
    res.status(500).json({ error: 'Registration failed' });
  }
};

exports.login = async (req, res) => {
  const { username, password } = req.body;

  try {
    const user = await User.findOne({ username });
    if (!user) return res.status(400).json({ error: 'Wrong credentials' });

    const passOk = bcrypt.compareSync(password, user.password);
    if (!passOk) return res.status(400).json({ error: 'Wrong credentials' });

    const payload = {
      id: user._id,
      name: user.name,
      username: user.username,
      role: user.role,
      email: user.email,
    };

    const token = createToken(payload);
    res
      .cookie('token', token, {
        httpOnly: true,
        secure: true,
        sameSite: 'None',
        maxAge: 24 * 60 * 60 * 1000,
      })
      .json(payload);
  } catch (err) {
    console.error('Login error:', err);
    res.status(500).json({ error: 'Internal server error' });
  }
};

exports.logout = (req, res) => {
  res.clearCookie('token');
  res.status(200).json({ message: 'Logged out successfully' });
};

exports.loadUser = (req, res) => {
  if (!req.user?.id) {
    return res.status(401).json({ error: 'Invalid or expired token' });
  }

  res.status(200).json(req.user);
};
