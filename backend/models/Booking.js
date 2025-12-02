const mongoose = require('mongoose');

const bookingSchema = new mongoose.Schema({
    puppy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Puppy'
    },
    puppyName: {
        type: String,
        required: true
    },
    firstName: {
        type: String,
        required: [true, 'Please provide first name']
    },
    lastName: {
        type: String,
        required: [true, 'Please provide last name']
    },
    email: {
        type: String,
        required: [true, 'Please provide email'],
        match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Please provide a valid email']
    },
    phone: {
        type: String,
        required: [true, 'Please provide phone number']
    },
    location: {
        type: String,
        required: [true, 'Please provide location']
    },
    experience: {
        type: String,
        required: [true, 'Please provide experience level']
    },
    message: {
        type: String,
        required: [true, 'Please provide a message']
    },
    status: {
        type: String,
        enum: ['Pending', 'Approved', 'Rejected'],
        default: 'Pending'
    }
}, {
    timestamps: true
});

module.exports = mongoose.model('Booking', bookingSchema);
