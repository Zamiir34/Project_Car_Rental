const mongoose = require('mongoose');
const User = require('./src/models/User');
const dotenv = require('dotenv');

dotenv.config();

const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI || 'mongodb://localhost:27017/car-rental-system');
        console.log('MongoDB Connected');

        const admin = await User.findOne({ email: 'admin@example.com' });
        if (admin) {
            if (!admin.isAdmin) {
                admin.isAdmin = true;
                await admin.save();
                console.log('Existing user admin@example.com promoted to Admin');
            } else {
                console.log('Admin user already exists');
            }
        } else {
            const newAdmin = await User.create({
                name: 'Admin User',
                email: 'admin@example.com',
                password: 'password123',
                isAdmin: true
            });
            console.log('Admin user created: admin@example.com / password123');
        }
        process.exit();
    } catch (error) {
        console.error(error);
        process.exit(1);
    }
};

connectDB();
