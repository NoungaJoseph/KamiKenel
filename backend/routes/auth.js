const express = require('express');
const router = express.Router();
const { login, register, verifyToken } = require('../controllers/authController');
const { protect } = require('../middleware/auth');

router.post('/login', login);
router.post('/register', protect, register);
router.get('/verify', protect, verifyToken);

module.exports = router;
