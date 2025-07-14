const AppQuestion = require('../models/appQuestion');
const UserQuestion = require('../models/userQuestion');

exports.addAppQuestion = async (req, res) => {
  try {
    const { question, topics, level } = req.body;

    if (!question || !level) {
      return res.status(400).json({ error: 'Question and level are required.' });
    }

    const newQuestion = new AppQuestion({ question, topics, level });
    await newQuestion.save();

    res.status(201).json({ message: 'App question added successfully.', question: newQuestion });
  } catch (err) {
    console.error('Add App Question Error:', err);
    res.status(500).json({ error: 'Failed to add app question.' });
  }
};


exports.saveUserQuestion = async (req, res) => {
  try {
    const { question, topics, level } = req.body;
    const userId = req.user.id;
    
     // Assuming user ID is available in req.user
    if (!userId || !question || !level) {
      return res.status(400).json({ error: 'userId, question, and level are required.' });
    }

    const newQuestion = new UserQuestion({ userId, question, topics, level });
    await newQuestion.save();

    res.status(201).json({ message: 'User question saved.', question: newQuestion });
  } catch (err) {
    console.error('Save User Question Error:', err);
    res.status(500).json({ error: 'Failed to save user question.' });
  }
};


exports.deleteUserQuestion = async (req, res) => {
  try {
    const userId = req.user.id; // from JWT middleware
    
    if (!userId) {
      return res.status(401).json({ error: 'Unauthorized. User ID not found.' });
    }
    const { question } = req.body;

    if (!question) {
      return res.status(400).json({ error: 'Question text is required.' });
    }

    const deleted = await UserQuestion.findOneAndDelete({
      question,
      userId
    });

    if (!deleted) {
      return res.status(404).json({ error: 'Question not found or not owned by user.' });
    }

    res.status(200).json({ message: 'User question removed.' });
  } catch (err) {
    console.error('Delete User Question Error:', err);
    res.status(500).json({ error: 'Failed to delete user question.' });
  }
};

exports.getUserQuestions = async (req, res) => {
  try {
    const userId = req.user?.id;
    if (!userId) {
      return res.status(401).json({ error: "Unauthorized. User ID not found." });
    }

    const { level, topics } = req.query;
    const filter = { userId };

    if (level) {
      filter.level = level;
    }

    if (topics) {
      // Expects comma-separated topics in the query string: ?topics=React,CSS
      const topicList = topics.split(",").map((t) => t.trim());
      filter.topics = { $in: topicList };
    }

    const questions = await UserQuestion.find(filter).sort({ createdAt: -1 });

    return res.status(200).json({ questions });
  } catch (err) {
    console.error("Get User Questions Error:", err);
    return res.status(500).json({ error: "Failed to retrieve user questions." });
  }
};