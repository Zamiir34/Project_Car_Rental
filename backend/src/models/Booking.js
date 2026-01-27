const mongoose = require('mongoose');

const bookingSchema = mongoose.Schema({
    user: { type: mongoose.Schema.Types.ObjectId, required: true, ref: 'User' },
    car: { type: mongoose.Schema.Types.ObjectId, required: true, ref: 'Car' },
    startDate: { type: Date, required: true },
    endDate: { type: Date, required: true },
    totalPrice: { type: Number, required: true },
    status: { type: String, enum: ['pending', 'approved', 'rejected', 'paid', 'cancelled'], default: 'pending' },
    isPaid: { type: Boolean, default: false },
    paidAt: { type: Date },
}, {
    timestamps: true,
});

const Booking = mongoose.model('Booking', bookingSchema);
module.exports = Booking;
