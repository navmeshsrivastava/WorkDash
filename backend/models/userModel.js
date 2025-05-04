const mongoose = require('mongoose');
const { Schema, model } = mongoose;

const userSchema = new Schema({
  name: { type: String, required: true },
  username: { type: String, required: true, unique: true },
  role: { type: String, required: true },
  email: { type: String, required: true },
  password: { type: String, required: true },
  tasksDone: [{ type: Schema.Types.ObjectId, ref: 'task' }],
  tasksPosted: [{ type: Schema.Types.ObjectId, ref: 'task' }],
});

const userModel = model('user', userSchema);
module.exports = userModel;
