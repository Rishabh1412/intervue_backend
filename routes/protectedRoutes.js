const express = require('express');
const router=express.Router();
const authMiddleware = require('../middleware/auth');
const { generateQuestions, evaluateAnswer } = require('../controllers/aiController');


router.get('/userboard', authMiddleware, (req, res) => {
    res.json({ msg: 'Welcome to the user board', user: req.user });
});

router.post('/generate-questions', authMiddleware, generateQuestions);
router.post('/evaluate-answer', authMiddleware, evaluateAnswer);

module.exports = router;