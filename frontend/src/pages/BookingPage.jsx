import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import api from '../services/api';
import { useAuth } from '../context/AuthContext';

const BookingPage = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const { user, updateProfile } = useAuth();
    const [car, setCar] = useState(null);
    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');
    const [error, setError] = useState('');
    const [drivingLicense, setDrivingLicense] = useState(user?.drivingLicense || '');
    const [idCard, setIdCard] = useState(user?.idCard || '');

    useEffect(() => {
        if (user) {
            if (user.drivingLicense) setDrivingLicense(user.drivingLicense);
            if (user.idCard) setIdCard(user.idCard);
        }
    }, [user]);

    useEffect(() => {
        const fetchCar = async () => {
            console.log('Fetching car details for ID:', id);
            try {
                const { data } = await api.get(`/cars/${id}`);
                console.log('Car details fetched:', data);
                setCar(data);
            } catch (err) {
                console.error('Error fetching car:', err);
                setError('Failed to load car details. Please try again.');
            }
        };
        if (id) fetchCar();
    }, [id]);

    const handleBooking = async (e) => {
        e.preventDefault();
        console.log('Starting booking process...');
        setError('');
        try {
            const start = new Date(startDate);
            const end = new Date(endDate);
            const days = (end - start) / (1000 * 60 * 60 * 24);

            if (days <= 0) {
                setError('End date must be after start date');
                return;
            }

            const totalPrice = days * car.pricePerDay;

            console.log('Sending booking request...', { carId: car._id, startDate, endDate, totalPrice });
            await api.post('/bookings', {
                carId: car._id,
                startDate,
                endDate,
                totalPrice,
                drivingLicense,
                idCard
            });
            console.log('Booking successful. Updating profile...');

            try {
                await updateProfile();
                console.log('Profile updated successfully.');
            } catch (profileErr) {
                console.error('Error updating profile:', profileErr);
                // We don't block navigation if profile update fails, but we log it
            }

            navigate('/dashboard');
        } catch (err) {
            console.error('Booking error:', err);
            setError(err.response?.data?.message || 'Booking failed. Please try again.');
        }
    };

    if (!car) return <div className="container">Loading...</div>;

    return (
        <div className="container mx-auto px-4 mt-8">
            <div className="flex flex-col md:flex-row gap-8">
                <div className="flex-1">
                    <img src={car.image} alt={car.name} className="w-full rounded-xl shadow-md object-cover" />
                </div>
                <div className="flex-1 bg-white p-8 rounded-xl shadow-sm border border-gray-100 h-fit">
                    <h2 className="text-3xl font-bold mb-2">Book {car.name}</h2>
                    <p className="text-primary text-2xl font-bold mb-6">${car.pricePerDay} <span className="text-sm text-gray-500 font-normal">/ day</span></p>
                    {error && <p className="bg-red-50 text-red-500 p-3 rounded-lg text-sm mb-4">{error}</p>}

                    <form onSubmit={handleBooking}>
                        <div className="mb-4">
                            <label className="block text-gray-700 font-medium mb-2">Start Date</label>
                            <input
                                type="date"
                                value={startDate}
                                onChange={(e) => setStartDate(e.target.value)}
                                required
                                min={new Date().toISOString().split('T')[0]}
                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-primary transition"
                            />
                        </div>
                        <div className="mb-6">
                            <label className="block text-gray-700 font-medium mb-2">End Date</label>
                            <input
                                type="date"
                                value={endDate}
                                onChange={(e) => setEndDate(e.target.value)}
                                required
                                min={startDate}
                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-primary transition"
                            />
                        </div>

                        {!user?.drivingLicense && (
                            <div className="mb-4">
                                <label className="block text-gray-700 font-medium mb-2">Driving License</label>
                                <input
                                    type="text"
                                    value={drivingLicense}
                                    onChange={(e) => setDrivingLicense(e.target.value)}
                                    required
                                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-primary transition"
                                    placeholder="Enter your driving license number"
                                />
                            </div>
                        )}

                        {!user?.idCard && (
                            <div className="mb-6">
                                <label className="block text-gray-700 font-medium mb-2">ID Card</label>
                                <input
                                    type="text"
                                    value={idCard}
                                    onChange={(e) => setIdCard(e.target.value)}
                                    required
                                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-primary transition"
                                    placeholder="Enter your ID card number"
                                />
                            </div>
                        )}
                        <button type="submit" className="w-full bg-primary hover:bg-blue-700 text-white font-bold py-3 rounded-lg transition duration-300">Confirm Booking</button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default BookingPage;
