const Booking = require('../models/Booking');
const Puppy = require('../models/Puppy');

// @desc    Get all bookings
// @route   GET /api/bookings
// @access  Protected
exports.getAllBookings = async (req, res) => {
    try {
        const bookings = await Booking.find()
            .populate('puppy', 'name gender price')
            .sort({ createdAt: -1 });

        res.status(200).json({
            success: true,
            count: bookings.length,
            data: bookings
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Server error',
            error: error.message
        });
    }
};

// @desc    Create new booking
// @route   POST /api/bookings
// @access  Public
exports.createBooking = async (req, res) => {
    try {
        const { puppy, puppyName, firstName, lastName, email, phone, location, experience, message } = req.body;

        // Create booking
        const booking = await Booking.create({
            puppy,
            puppyName,
            firstName,
            lastName,
            email,
            phone,
            location,
            experience,
            message
        });

        res.status(201).json({
            success: true,
            data: booking
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Server error',
            error: error.message
        });
    }
};

// @desc    Update booking status
// @route   PUT /api/bookings/:id
// @access  Protected
exports.updateBooking = async (req, res) => {
    try {
        let booking = await Booking.findById(req.params.id);

        if (!booking) {
            return res.status(404).json({
                success: false,
                message: 'Booking not found'
            });
        }

        booking = await Booking.findByIdAndUpdate(req.params.id, req.body, {
            new: true,
            runValidators: true
        });

        res.status(200).json({
            success: true,
            data: booking
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Server error',
            error: error.message
        });
    }
};

// @desc    Delete booking
// @route   DELETE /api/bookings/:id
// @access  Protected
exports.deleteBooking = async (req, res) => {
    try {
        const booking = await Booking.findById(req.params.id);

        if (!booking) {
            return res.status(404).json({
                success: false,
                message: 'Booking not found'
            });
        }

        await booking.deleteOne();

        res.status(200).json({
            success: true,
            message: 'Booking deleted successfully'
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Server error',
            error: error.message
        });
    }
};
