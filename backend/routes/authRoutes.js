const express = require('express');
const router = express.Router();
const verifyToken = require('../middlewares/verfyToken');
const authController = require('../controllers/authControllers');

router.get('/', (req, res) => {
  res.redirect('/');
});

router.post('/register', authController.register);
router.post('/login', authController.login);
router.post('/logout', authController.logout);
router.get('/load', verifyToken, authController.loadUser);

module.exports = router;
