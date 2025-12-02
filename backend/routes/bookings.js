const express = require('express');
const router = express.Router();
const {
    getAllBookings,
    createBooking,
    updateBooking,
    deleteBooking
} = require('../controllers/bookingController');
const { protect } = require('../middleware/auth');

router.route('/')
    .get(protect, getAllBookings)
    .post(createBooking);

router.route('/:id')
    .put(protect, updateBooking)
    .delete(protect, deleteBooking);

module.exports = router;
