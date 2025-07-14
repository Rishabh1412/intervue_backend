const express = require('express');
const router = express.Router();
const {
  register,
  verifyOTP,
  login,
  logout
} = require('../controllers/authController');
const { addAppQuestion } = require('../controllers/questionController');

router.post('/register', register);
router.post('/verify-otp', verifyOTP);
router.post('/login', login);
router.post('/logout', logout);

router.post('/add-question', addAppQuestion);

module.exports = router;
