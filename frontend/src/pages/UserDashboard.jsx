import { useState, useEffect } from 'react';
import api from '../services/api';

const UserDashboard = () => {
    const [bookings, setBookings] = useState([]);
    const [showPaymentModal, setShowPaymentModal] = useState(false);
    const [selectedBooking, setSelectedBooking] = useState(null);
    const [phoneNumber, setPhoneNumber] = useState('');

    useEffect(() => {
        fetchBookings();
    }, []);

    const fetchBookings = async () => {
        try {
            const { data } = await api.get('/bookings/mybookings');
            setBookings(data);
        } catch (error) {
            console.error(error);
        }
    };

    const handlePaymentClick = (booking) => {
        setSelectedBooking(booking);
        setShowPaymentModal(true);
    };

    const processPayment = async (e) => {
        e.preventDefault();
        try {
            await api.post('/payments/evc', {
                bookingId: selectedBooking._id,
                phoneNumber
            });
            alert('Payment Successful!');
            setShowPaymentModal(false);
            fetchBookings();
        } catch (error) {
            alert(error.response?.data?.message || 'Payment Failed');
        }
    };

    return (
        <div className="container mx-auto px-4 mt-8">
            <h2 className="text-3xl font-bold mb-6 text-gray-800">My Bookings</h2>
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
                {bookings.length === 0 ? (
                    <p className="p-8 text-center text-gray-500">No bookings found.</p>
                ) : (
                    <div className="overflow-x-auto">
                        <table className="w-full text-left border-collapse">
                            <thead className="bg-gray-50 border-b border-gray-200">
                                <tr>
                                    <th className="p-4 font-semibold text-gray-600">Car</th>
                                    <th className="p-4 font-semibold text-gray-600">Dates</th>
                                    <th className="p-4 font-semibold text-gray-600">Total</th>
                                    <th className="p-4 font-semibold text-gray-600">Status</th>
                                </tr>
                            </thead>
                            <tbody>
                                {bookings.map(booking => (
                                    <tr key={booking._id} className="border-b border-gray-100 hover:bg-gray-50 transition">
                                        <td className="p-4">{booking.car.name}</td>
                                        <td className="p-4 text-gray-600">
                                            {new Date(booking.startDate).toLocaleDateString()} - {new Date(booking.endDate).toLocaleDateString()}
                                        </td>
                                        <td className="p-4 font-medium">${booking.totalPrice}</td>
                                        <td className="p-4">
                                            <div className="flex items-center gap-3">
                                                <span className={`px-3 py-1 rounded-full text-xs font-semibold ${booking.status === 'approved' ? 'bg-green-100 text-green-700' :
                                                    booking.status === 'rejected' ? 'bg-red-100 text-red-700' :
                                                        booking.status === 'paid' ? 'bg-blue-100 text-blue-700' : 'bg-yellow-100 text-yellow-700'
                                                    }`}>
                                                    {booking.status === 'approved' ? 'Approved - Pay Now' : booking.status}
                                                </span>
                                                {booking.status === 'approved' && !booking.isPaid && (
                                                    <button
                                                        onClick={() => handlePaymentClick(booking)}
                                                        className="bg-green-600 hover:bg-green-700 text-white px-3 py-1 rounded-md text-sm transition"
                                                    >
                                                        Pay EVC Plus
                                                    </button>
                                                )}
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                )}
            </div>

            {showPaymentModal && selectedBooking && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
                    <div className="bg-white rounded-xl shadow-2xl w-full max-w-md p-8 animate-fade-in-up">
                        <h3 className="text-2xl font-bold mb-2">Pay for {selectedBooking.car.name}</h3>
                        <p className="text-gray-600 mb-6 font-medium">Total Amount: <span className="text-primary">${selectedBooking.totalPrice}</span></p>
                        <form onSubmit={processPayment}>
                            <input
                                type="text"
                                placeholder="EVC Plus Number (e.g. 61xxxxxxx)"
                                value={phoneNumber}
                                onChange={(e) => setPhoneNumber(e.target.value)}
                                required
                                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-primary mb-4"
                            />
                            <div className="flex flex-col gap-3">
                                <button type="submit" className="w-full bg-primary hover:bg-blue-700 text-white font-bold py-3 rounded-lg transition duration-300">Confirm Payment</button>
                                <button type="button" onClick={() => setShowPaymentModal(false)} className="w-full border border-gray-300 text-gray-600 hover:bg-gray-50 font-bold py-3 rounded-lg transition duration-300">Cancel</button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
};

export default UserDashboard;
