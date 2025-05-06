const mongoose = require('mongoose');
const { Schema, model } = mongoose;

const taskSchema = new Schema(
  {
    title: { type: String, required: true },
    description: { type: String, required: true },
    deadline: { type: Date, required: true },
    attachments: [{ type: String }],
    postedBy: { type: Schema.Types.ObjectId, ref: 'user' },
    doneBy: [
      {
        user: { type: Schema.Types.ObjectId, ref: 'user' },
        solution: { type: String },
        completedAt: { type: Date, default: Date.now },
      },
    ],
  },
  { timestamps: true }
);

const taskModel = new model('task', taskSchema);
module.exports = taskModel;
