const mongoose = require('mongoose');
const User = require('./src/models/User');
const dotenv = require('dotenv');

dotenv.config();

const connectDB = async () => {
    try {
        const conn = await mongoose.connect(process.env.MONGO_URI || 'mongodb://localhost:27017/car-rental-system');
        console.log(`MongoDB Connected: ${conn.connection.host}`);

        const users = await User.find({});
        console.log('Users found:', users.length);
        users.forEach(u => {
            console.log(`ID: ${u._id}, Name: ${u.name}, Email: ${u.email}, Admin: ${u.isAdmin}, Blocked: ${u.isBlocked}`);
        });
        process.exit();
    } catch (error) {
        console.error(`Error: ${error.message}`);
        process.exit(1);
    }
};

connectDB();
