const express = require('express');
const router = express.Router();
const verifyToken = require('../middlewares/verfyToken');
const multer = require('multer');
const { storage } = require('../utils/cloudinary');
const upload = multer({ storage });

const taskController = require('../controllers/taskControllers');

router.get('/', taskController.getAllTasks);
router.post(
  '/',
  verifyToken,
  upload.array('attachments', 3),
  taskController.createTask
);
router.get('/:taskId', taskController.getTaskById);
router.get('/:taskId/edit', taskController.getTaskForEdit);
router.post('/:taskId', verifyToken, taskController.submitTaskSolution);
router.put('/:taskId', verifyToken, taskController.updateTaskSolution);
router.delete('/undo/:taskId', verifyToken, taskController.undoTaskSubmission);
router.delete('/:taskId', verifyToken, taskController.deleteTask);
router.get('/created/:userId', taskController.getTasksCreatedByUser);
router.get('/visited/:userId', taskController.getTasksDoneByUser);

module.exports = router;
