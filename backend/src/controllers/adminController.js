const asyncHandler = require('express-async-handler');
const User = require('../models/User');
const Car = require('../models/Car');
const Booking = require('../models/Booking');

// @desc    Get system statistics
// @route   GET /api/admin/stats
// @access  Private/Admin
const getStats = asyncHandler(async (req, res) => {
    const totalUsers = await User.countDocuments();
    const totalCars = await Car.countDocuments();
    const totalBookings = await Booking.countDocuments();

    // Calculate total revenue from approved bookings
    const revenueResult = await Booking.aggregate([
        { $match: { status: { $in: ['approved', 'paid'] } } }, // Include 'paid' bookings
        { $group: { _id: null, total: { $sum: '$totalPrice' } } }
    ]);
    const totalRevenue = revenueResult[0] ? revenueResult[0].total : 0;

    // Booking status distribution
    const bookingStatusCounts = await Booking.aggregate([
        { $group: { _id: '$status', count: { $sum: 1 } } }
    ]);

    // Monthly bookings (last 12 months)
    const monthlyBookings = await Booking.aggregate([
        {
            $group: {
                _id: { $month: '$startDate' },
                count: { $sum: 1 },
                revenue: { $sum: '$totalPrice' }
            }
        },
        { $sort: { _id: 1 } }
    ]);

    res.json({
        totalUsers,
        totalCars,
        totalBookings,
        totalRevenue,
        bookingStatusCounts,
        monthlyBookings
    });
});

module.exports = { getStats };
