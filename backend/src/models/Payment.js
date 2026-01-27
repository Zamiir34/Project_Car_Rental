const mongoose = require('mongoose');

const paymentSchema = mongoose.Schema({
    booking: { type: mongoose.Schema.Types.ObjectId, required: true, ref: 'Booking' },
    user: { type: mongoose.Schema.Types.ObjectId, required: true, ref: 'User' },
    amount: { type: Number, required: true },
    phoneNumber: { type: String, required: true },
    method: { type: String, default: 'EVC_PLUS' },
    status: { type: String, enum: ['success', 'failed'], default: 'success' },
    transactionId: { type: String, required: true },
}, {
    timestamps: true,
});

const Payment = mongoose.model('Payment', paymentSchema);
module.exports = Payment;
