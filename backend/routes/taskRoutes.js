const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const mongoose = require('mongoose');

const User = require('../models/userModel');
const Task = require('../models/taskModel');

const multer = require('multer');
const { storage } = require('../utils/cloudinary');
const verifyToken = require('../middlewares/verfyToken');
const upload = multer({ storage });

router.get('/', async (req, res) => {
  try {
    const tasks = await Task.find()
      .sort({ createdAt: -1 })
      .populate('postedBy', 'name role email _id');
    res.status(200).json(tasks);
  } catch (error) {
    console.error('Failed to fetch tasks:', error);
    res.status(500).json({ error: 'Failed to fetch tasks' });
  }
});

router.post(
  '/',
  verifyToken,
  upload.array('attachments', 3),
  async (req, res) => {
    if (req.user.role === 'employee') {
      return res.status(401).json({ error: 'Unauthorized' });
    }
    const { title, description, deadline } = req.body;
    const attachmentUrls = req.files.map((file) => file.path);

    if (!title || !description || !deadline) {
      return res.status(400).json({ error: 'Missing required fields' });
    }

    const task = await Task.create({
      title,
      description,
      deadline,
      attachments: attachmentUrls,
      postedBy: req.user.id,
    });

    const user = await User.findById(req.user.id);
    user.tasksPosted.push(task._id);
    await user.save();

    res.send(task);
  }
);

router.get('/:taskId', async (req, res) => {
  const { taskId } = req.params;

  if (!mongoose.Types.ObjectId.isValid(taskId)) {
    return res.status(400).json({ error: 'Invalid task ID' });
  }

  try {
    const task = await Task.findById(taskId).populate(
      'postedBy',
      'name role email _id'
    );
    if (!task) return res.status(404).json({ error: 'Task not found' });

    res.status(200).json(task);
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
});

router.get('/:taskId/edit', async (req, res) => {
  try {
    const taskId = req.params.taskId;
    const userId = req.query.userId;

    const task = await Task.findById(taskId);

    if (!task) {
      return res.status(404).json({ error: 'Task not found' });
    }

    const doneByUser = task.doneBy.find(
      (done) => done.user.toString() === userId
    );

    if (!doneByUser) {
      return res.status(401).json({ failed: "You haven't completed the task" });
    }

    const taskObj = task.toObject();

    taskObj.doneBy = doneByUser;

    return res.status(200).json(taskObj);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
});

router.post('/:taskId', verifyToken, async (req, res) => {
  const { taskId } = req.params;
  const { solution } = req.body;

  if (!solution) {
    return res.status(400).json({ error: 'Solution is required' });
  }

  try {
    const task = await Task.findById(taskId);
    if (!task) return res.status(404).json({ error: 'Task not found' });

    const userId = req.user.id;

    if (task.postedBy.toString() === userId) {
      return res
        .status(400)
        .json({ error: 'Task owner cannot do their own task' });
    }

    const alreadyDone = task.doneBy.some(
      (entry) => entry.user.toString() === userId
    );
    if (alreadyDone) {
      return res
        .status(400)
        .json({ error: 'Task already submitted by this user' });
    }

    task.doneBy.push({ user: userId, solution, completedAt: new Date() });
    await task.save();
    await User.findByIdAndUpdate(userId, { $push: { tasksDone: taskId } });

    res.status(200).json({
      message: 'Task submitted successfully',
      doneBy: task.doneBy,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
});

router.put('/:taskId', verifyToken, async (req, res) => {
  try {
    const { taskId } = req.params;
    const { solution } = req.body;

    if (!solution) {
      return res.status(400).json({ error: 'Solution is required' });
    }

    const task = await Task.findById(taskId);
    if (!task) {
      return res.status(404).json({ error: 'Task not found' });
    }

    const userId = req.user.id;

    const doneEntry = task.doneBy.find(
      (entry) => entry.user.toString() === userId
    );

    if (!doneEntry) {
      return res.status(404).json({ error: "You haven't completed this task" });
    }

    doneEntry.solution = solution;
    await task.save();

    res.json({ success: true, updatedEntry: doneEntry });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
});

router.delete('/undo/:taskId', verifyToken, async (req, res) => {
  try {
    const { taskId } = req.params;
    const userId = req.user.id;

    await Task.findByIdAndUpdate(taskId, {
      $pull: { doneBy: { user: userId } },
    });
    await User.findByIdAndUpdate(userId, {
      $pull: { tasksDone: taskId },
    });

    res.status(200).json({ success: 'Task Undo Completed' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

router.delete('/:taskId', verifyToken, async (req, res) => {
  try {
    const { taskId } = req.params;
    const task = await Task.findById(taskId);

    if (!task) {
      return res.status(404).json({ error: 'No such task exists' });
    }

    if (req.user.id !== task.postedBy.toString()) {
      return res.status(401).json({ error: 'Unauthorized' });
    }

    await User.findByIdAndUpdate(req.user.id, {
      $pull: { tasksPosted: taskId },
    });

    await Promise.all(
      task.doneBy.map((doneBy) => {
        return User.findByIdAndUpdate(doneBy.user, {
          $pull: { tasksDone: taskId },
        });
      })
    );

    await Task.findByIdAndDelete(taskId);

    res.status(200).json({ success: 'Task deleted successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

router.get('/created/:userId', async (req, res) => {
  try {
    const { userId } = req.params;

    const user = await User.findById(userId).populate({
      path: 'tasksPosted',
      options: { sort: { createdAt: -1 } },
      populate: {
        path: 'doneBy.user',
        model: 'user',
        select: 'name email',
      },
    });

    res.json({ tasksPosted: user.tasksPosted });
  } catch (error) {
    console.error('Error fetching tasks:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

router.get('/visited/:userId', async (req, res) => {
  try {
    const { userId } = req.params;

    const user = await User.findById(userId).populate({
      path: 'tasksDone',
      options: { sort: { createdAt: -1 } },
    });

    const tasksVisited = user.tasksDone.map((task) => {
      const doneByUser = task.doneBy.find(
        (done) => done.user.toString() === userId
      );

      if (doneByUser) {
        return {
          ...task.toObject(),
          doneBy: doneByUser,
        };
      }

      return task;
    });
    res.status(200).json({ tasksVisited });
  } catch (error) {
    console.error('Error fetching tasks:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;
