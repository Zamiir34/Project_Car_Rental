const mongoose = require('mongoose');

const carSchema = mongoose.Schema({
    name: { type: String, required: true },
    type: { type: String, required: true },
    pricePerDay: { type: Number, required: true },
    availability: { type: Boolean, required: true, default: true },
    image: { type: String, required: true },
    description: { type: String },
    transmission: { type: String, default: 'Automatic' },
    seats: { type: Number, default: 4 },
}, {
    timestamps: true,
});

const Car = mongoose.model('Car', carSchema);
module.exports = Car;
