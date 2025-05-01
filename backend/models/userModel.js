const mongoose = require('mongoose');
const { Schema, model } = mongoose;

const userSchema = new Schema({
  name: { type: String, required: true, unique: true },
  username: { type: String, required: true },
  role: { type: String, required: true },
  email: { type: String, required: true },
  password: { type: String, required: true },
});

const userModel = model('user', userSchema);
module.exports = userModel;
