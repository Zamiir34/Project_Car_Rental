const asyncHandler = require('express-async-handler');
const Booking = require('../models/Booking');
const Car = require('../models/Car');
const User = require('../models/User');

// @desc    Create new booking
// @route   POST /api/bookings
// @access  Private
const createBooking = asyncHandler(async (req, res) => {
    const { carId, startDate, endDate, totalPrice, drivingLicense, idCard } = req.body;

    const user = await User.findById(req.user._id);

    if (drivingLicense) user.drivingLicense = drivingLicense;
    if (idCard) user.idCard = idCard;

    if (drivingLicense || idCard) {
        await user.save();
    }

    if (!user.drivingLicense || !user.idCard) {
        res.status(400);
        throw new Error('Driving license and ID card are required for booking');
    }

    // Check for overlap
    const overlappingBooking = await Booking.findOne({
        car: carId,
        status: { $nin: ['cancelled', 'rejected'] }, // Only active bookings
        $or: [
            { startDate: { $lte: new Date(endDate) }, endDate: { $gte: new Date(startDate) } }
        ]
    });

    if (overlappingBooking) {
        res.status(400);
        throw new Error('Car is already booked for these dates');
    }

    const booking = new Booking({
        user: req.user._id,
        car: carId,
        startDate,
        endDate,
        totalPrice,
    });

    const createdBooking = await booking.save();
    res.status(201).json(createdBooking);
});

// @desc    Get logged in user bookings
// @route   GET /api/bookings/mybookings
// @access  Private
const getMyBookings = asyncHandler(async (req, res) => {
    const bookings = await Booking.find({ user: req.user._id }).populate('car');
    res.json(bookings);
});

// @desc    Get all bookings
// @route   GET /api/bookings
// @access  Private/Admin
const getAllBookings = asyncHandler(async (req, res) => {
    const bookings = await Booking.find({}).populate('user', 'id name email').populate('car');
    res.json(bookings);
});

// @desc    Update booking status (Admin only)
// @route   PUT /api/bookings/:id
// @access  Private/Admin
const updateBookingStatus = asyncHandler(async (req, res) => {
    const { status } = req.body;
    const booking = await Booking.findById(req.params.id);

    if (booking) {
        // Enforce valid state transitions if needed
        booking.status = status;
        const updatedBooking = await booking.save();
        res.json(updatedBooking);
    } else {
        res.status(404);
        throw new Error('Booking not found');
    }
});

module.exports = { createBooking, getMyBookings, getAllBookings, updateBookingStatus };
