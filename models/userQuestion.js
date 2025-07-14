const mongoose = require('mongoose');

const userQuestionSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User', // Optional: Reference to User model
        required: true
    },
    question: {
        type: String,
        required: true
    },
    topics: {
        type: [String], // Array of topic names or IDs
        default: []
    },
    level: {
        type: String,
        enum: ['Easy', 'Medium', 'Hard'], // You can customize these
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
}, { timestamps: true });

module.exports = mongoose.model('UserQuestion', userQuestionSchema);
