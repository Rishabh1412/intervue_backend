const mongoose = require('mongoose');

const appQuestionSchema = new mongoose.Schema({
    question: {
        type: String,
        required: true
    },
    topics: {
        type: [String],
        default: []
    },
    level: {
        type: String,
        enum: ['Easy', 'Medium', 'Hard'],
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('AppQuestion', appQuestionSchema);
