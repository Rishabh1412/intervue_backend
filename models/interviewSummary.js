const mongoose = require('mongoose');

const questionEvaluationSchema = new mongoose.Schema({
  question: {
    type: String,
    required: true
  },
  userAnswer: {
    type: String,
    required: true
  },
  score: {
    type: Number,
    min: 1,
    max: 10,
    required: true
  },
  feedback: {
    type: String,
    required: true
  },
  suggestion: {
    type: String,
    required: true
  }
}, { _id: false });

const interviewSummarySchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  role: {
    type: String,
    required: true
  },
  level: {
    type: String,
    enum: ['Junior', 'Mid', 'Senior'],
    required: true
  },
  interviewType: {
    type: String, // e.g. "DSA", "System Design", etc.
    required: true
  },
  language: {
    type: String, // e.g. "JavaScript", "Python", etc.
    required: true
  },
  evaluations: {
    type: [questionEvaluationSchema],
    validate: v => Array.isArray(v) && v.length > 0
  },
  overallScore: {
    type: Number,
    min: 1,
    max: 10,
    required: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('InterviewSummary', interviewSummarySchema);
