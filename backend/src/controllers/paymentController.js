const asyncHandler = require('express-async-handler');
const Booking = require('../models/Booking');
const Payment = require('../models/Payment');

// @desc    Process EVC Plus Payment
// @route   POST /api/payments/evc
// @access  Private
const processPayment = asyncHandler(async (req, res) => {
    const { bookingId, phoneNumber } = req.body;

    const booking = await Booking.findById(bookingId);

    if (!booking) {
        res.status(404);
        throw new Error('Booking not found');
    }

    if (booking.status !== 'approved') {
        res.status(400);
        throw new Error('Booking not approved or already paid');
    }

    if (booking.isPaid) {
        res.status(400);
        throw new Error('Booking is already paid');
    }

    // MOCK Payment Gateway Logic
    const isSuccess = true; // Simulate successful payment
    const transactionId = `TXN_${Date.now()}`;

    if (isSuccess) {
        const payment = new Payment({
            booking: booking._id,
            user: req.user._id,
            amount: booking.totalPrice,
            phoneNumber,
            transactionId,
            status: 'success'
        });

        await payment.save();

        booking.isPaid = true;
        booking.paidAt = Date.now();
        booking.status = 'paid';
        await booking.save();

        res.json({
            message: 'Payment successful',
            transactionId,
            booking
        });
    } else {
        res.status(400);
        throw new Error('Payment failed');
    }
});

module.exports = { processPayment };
