const mongoose = require('mongoose');

const contentSchema = new mongoose.Schema({
    type: {
        type: String,
        enum: ['blog', 'faq'],
        required: true
    },
    title: {
        type: String,
        required: [true, 'Please provide title'],
        trim: true
    },
    content: {
        type: String,
        required: [true, 'Please provide content']
    },
    author: {
        type: String,
        default: 'Kami Kennels Team'
    },
    published: {
        type: Boolean,
        default: false
    }
}, {
    timestamps: true
});

module.exports = mongoose.model('Content', contentSchema);
