const mongoose = require('mongoose');
const dotenv = require('dotenv');
// const colors = require('colors'); 
const users = require('./data/users');
const cars = require('./data/cars');
const User = require('./src/models/User');
const Car = require('./src/models/Car');
const Booking = require('./src/models/Booking');
const connectDB = require('./src/config/db');

dotenv.config();

connectDB();

const importData = async () => {
    try {
        await Booking.deleteMany();
        await Car.deleteMany();
        await User.deleteMany();

        const createdUsers = await User.create(users);
        const adminUser = createdUsers[0]._id;

        const sampleCars = cars.map((car) => {
            return { ...car, user: adminUser }; // Assuming cars might be linked to an admin in future, but schema doesn't strictly req it.
        });

        await Car.insertMany(sampleCars);

        console.log('Data Imported!');
        process.exit();
    } catch (error) {
        console.error(`${error}`);
        process.exit(1);
    }
};

const destroyData = async () => {
    try {
        await Booking.deleteMany();
        await Car.deleteMany();
        await User.deleteMany();

        console.log('Data Destroyed!');
        process.exit();
    } catch (error) {
        console.error(`${error}`);
        process.exit(1);
    }
};

if (process.argv[2] === '-d') {
    destroyData();
} else {
    importData();
}
