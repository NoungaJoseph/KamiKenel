const mongoose = require('mongoose');

const puppySchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Please provide puppy name'],
        trim: true
    },
    gender: {
        type: String,
        required: [true, 'Please specify gender'],
        enum: ['Male', 'Female']
    },
    age: {
        type: String,
        required: [true, 'Please provide age']
    },
    price: {
        type: Number,
        required: [true, 'Please provide price']
    },
    status: {
        type: String,
        enum: ['Available', 'Reserved', 'Sold'],
        default: 'Available'
    },
    images: [{
        type: String  // Cloudinary URLs
    }],
    description: {
        type: String,
        default: ''
    },
    father: {
        name: String,
        image: String,
        description: String
    },
    mother: {
        name: String,
        image: String,
        description: String
    }
}, {
    timestamps: true
});

module.exports = mongoose.model('Puppy', puppySchema);
