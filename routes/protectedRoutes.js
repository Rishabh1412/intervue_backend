const express = require('express');
const router=express.Router();
const authMiddleware = require('../middleware/auth');
const { generateQuestions, evaluateAnswer } = require('../controllers/aiController');
const { saveUserQuestion, deleteUserQuestion, getUserQuestions } = require('../controllers/questionController');
const { getUser } = require('../controllers/userController');
const { saveInterviewSummary, getUserInterviewSummaries } = require('../controllers/interviewSummaryController');


router.get('/userboard', authMiddleware, (req, res) => {
    res.json({ msg: 'Welcome to the user board', user: req.user });
});
router.get('/user', authMiddleware, getUser);

router.post('/generate-questions', authMiddleware, generateQuestions);
router.post('/evaluate-answer', authMiddleware, evaluateAnswer);

router.post('/add-user-question', authMiddleware, saveUserQuestion);
router.delete('/delete-user-question', authMiddleware, deleteUserQuestion);
router.get('/get-user-questions', authMiddleware, getUserQuestions);

router.post('/interview-summary',authMiddleware, saveInterviewSummary);
router.get('/interview-summary',authMiddleware, getUserInterviewSummaries);

module.exports = router;