const express = require('express');
const router=express.Router();
const authMiddleware = require('../middleware/auth');


router.get('/userboard', authMiddleware, (req, res) => {
    res.json({ msg: 'Welcome to the user board', user: req.user });
});

module.exports = router;