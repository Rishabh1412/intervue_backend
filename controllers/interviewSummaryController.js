const InterviewSummary = require('../models/interviewSummary');
const mongoose = require('mongoose');

exports.saveInterviewSummary = async (req, res) => {
  try {
    const { role, level, interviewType, language, evaluations } = req.body;

    const userId = req.user.id; // Assuming authentication middleware sets `req.user`

    if (!evaluations || evaluations.length === 0) {
      return res.status(400).json({ message: "No evaluations provided" });
    }

    const totalScore = evaluations.reduce((acc, curr) => acc + curr.score, 0);
    const overallScore = Math.round(totalScore / evaluations.length);

    const summary = new InterviewSummary({
      userId,
      role,
      level,
      interviewType,
      language,
      evaluations,
      overallScore,
    });

    await summary.save();

    res.status(201).json({ message: "Interview summary saved", summary });
  } catch (error) {
    console.error("Error saving interview summary:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};


exports.getUserInterviewSummaries = async (req, res) => {
  try {
    const userId = req.user._id;

    const summaries = await InterviewSummary.find({ userId }).sort({ createdAt: -1 });

    res.status(200).json({ summaries });
  } catch (error) {
    console.error("Error fetching interview summaries:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};
