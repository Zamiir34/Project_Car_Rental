const asyncHandler = require('express-async-handler');
const Car = require('../models/Car');

// @desc    Fetch all cars
// @route   GET /api/cars
// @access  Public
const getCars = asyncHandler(async (req, res) => {
    const { type, minPrice, maxPrice } = req.query;
    let query = {};

    if (type) {
        query.type = type;
    }

    if (minPrice || maxPrice) {
        query.pricePerDay = {};
        if (minPrice) query.pricePerDay.$gte = Number(minPrice);
        if (maxPrice) query.pricePerDay.$lte = Number(maxPrice);
    }

    const cars = await Car.find(query);
    res.json(cars);
});

// @desc    Fetch single car
// @route   GET /api/cars/:id
// @access  Public
const getCarById = asyncHandler(async (req, res) => {
    const car = await Car.findById(req.params.id);

    if (car) {
        res.json(car);
    } else {
        res.status(404);
        throw new Error('Car not found');
    }
});

// @desc    Create a car
// @route   POST /api/cars
// @access  Private/Admin
const createCar = asyncHandler(async (req, res) => {
    const { name, type, pricePerDay, image, description, transmission, seats } = req.body;

    const car = new Car({
        name,
        type,
        pricePerDay,
        image,
        description,
        transmission,
        seats
    });

    const createdCar = await car.save();
    res.status(201).json(createdCar);
});

// @desc    Update a car
// @route   PUT /api/cars/:id
// @access  Private/Admin
const updateCar = asyncHandler(async (req, res) => {
    const { name, type, pricePerDay, availability, image, description, transmission, seats } = req.body;

    const car = await Car.findById(req.params.id);

    if (car) {
        car.name = name || car.name;
        car.type = type || car.type;
        car.pricePerDay = pricePerDay || car.pricePerDay;
        car.availability = availability !== undefined ? availability : car.availability;
        car.image = image || car.image;
        car.description = description || car.description;
        car.transmission = transmission || car.transmission;
        car.seats = seats || car.seats;

        const updatedCar = await car.save();
        res.json(updatedCar);
    } else {
        res.status(404);
        throw new Error('Car not found');
    }
});

// @desc    Delete a car
// @route   DELETE /api/cars/:id
// @access  Private/Admin
const deleteCar = asyncHandler(async (req, res) => {
    const car = await Car.findById(req.params.id);

    if (car) {
        await car.deleteOne();
        res.json({ message: 'Car removed' });
    } else {
        res.status(404);
        throw new Error('Car not found');
    }
});

module.exports = { getCars, getCarById, createCar, updateCar, deleteCar };
