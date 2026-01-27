import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import api from '../services/api';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
    ArcElement,
    PointElement,
    LineElement,
} from 'chart.js';
import { Bar, Pie, Line } from 'react-chartjs-2';
import AdminUserManagement from '../components/AdminUserManagement';
import AdminCarManagement from '../components/AdminCarManagement';

ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
    ArcElement,
    PointElement,
    LineElement
);

const AdminDashboard = () => {
    const [error, setError] = useState(null);
    const { user } = useAuth(); // Assuming useAuth provides user info
    const navigate = useNavigate();
    const [stats, setStats] = useState(null);

    useEffect(() => {
        if (!user || !user.isAdmin) {
            navigate('/login');
            return;
        }

        const fetchStats = async () => {
            try {
                const { data } = await api.get('/admin/stats');
                setStats(data);
            } catch (error) {
                console.error(error);
                setError('Failed to load dashboard data.');
            }
        };
        fetchStats();
    }, [user, navigate]);

    if (error) return <div className="container mx-auto px-4 mt-8 text-center text-red-500">{error}</div>;
    if (!stats) return <div className="container mx-auto px-4 mt-8 text-center text-gray-500">Loading Dashboard...</div>;

    const bookingStatusData = {
        labels: stats.bookingStatusCounts.map(item => item._id),
        datasets: [
            {
                label: '# of Bookings',
                data: stats.bookingStatusCounts.map(item => item.count),
                backgroundColor: [
                    'rgba(255, 99, 132, 0.2)',
                    'rgba(54, 162, 235, 0.2)',
                    'rgba(255, 206, 86, 0.2)',
                    'rgba(75, 192, 192, 0.2)',
                ],
                borderColor: [
                    'rgba(255, 99, 132, 1)',
                    'rgba(54, 162, 235, 1)',
                    'rgba(255, 206, 86, 1)',
                    'rgba(75, 192, 192, 1)',
                ],
                borderWidth: 1,
            },
        ],
    };

    const monthlyData = {
        labels: stats.monthlyBookings.map(item => `Month ${item._id}`),
        datasets: [
            {
                label: 'Bookings per Month',
                data: stats.monthlyBookings.map(item => item.count),
                backgroundColor: 'rgba(53, 162, 235, 0.5)',
            },
        ],
    };

    return (
        <div className="container mx-auto px-4 mt-8">
            <h2 className="text-3xl font-bold mb-8 text-gray-800">Admin Dashboard</h2>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 text-center">
                    <h3 className="text-4xl font-bold text-primary mb-2">{stats.totalUsers}</h3>
                    <p className="text-gray-500 font-medium">Total Users</p>
                </div>
                <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 text-center">
                    <h3 className="text-4xl font-bold text-primary mb-2">{stats.totalCars}</h3>
                    <p className="text-gray-500 font-medium">Total Cars</p>
                </div>
                <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 text-center">
                    <h3 className="text-4xl font-bold text-primary mb-2">{stats.totalBookings}</h3>
                    <p className="text-gray-500 font-medium">Total Bookings</p>
                </div>
                <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 text-center">
                    <h3 className="text-4xl font-bold text-primary mb-2">${stats.totalRevenue}</h3>
                    <p className="text-gray-500 font-medium">Total Revenue</p>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
                <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                    <h3 className="text-xl font-bold mb-4 text-gray-700">Booking Status</h3>
                    <div className="h-64 flex justify-center">
                        <Pie data={bookingStatusData} />
                    </div>
                </div>
                <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                    <h3 className="text-xl font-bold mb-4 text-gray-700">Monthly Bookings</h3>
                    <div className="h-64">
                        <Bar data={monthlyData} options={{ maintainAspectRatio: false }} />
                    </div>
                </div>
            </div>

            <h3 className="text-2xl font-bold mb-4 text-gray-800">Manage Bookings</h3>
            <BookingManagementTable />

            <AdminUserManagement />

            <AdminCarManagement />
        </div>
    );
};

const BookingManagementTable = () => {
    const [bookings, setBookings] = useState([]);

    useEffect(() => {
        fetchBookings();
    }, []);

    const fetchBookings = async () => {
        try {
            const { data } = await api.get('/bookings');
            setBookings(data);
        } catch (error) {
            console.error(error);
        }
    };

    const updateStatus = async (id, status) => {
        try {
            await api.put(`/bookings/${id}`, { status });
            fetchBookings();
        } catch (error) {
            console.error(error);
            alert('Failed to update status');
        }
    };

    return (
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden mb-12">
            <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse">
                    <thead className="bg-gray-50 border-b border-gray-200">
                        <tr>
                            <th className="p-4 font-semibold text-gray-600">User</th>
                            <th className="p-4 font-semibold text-gray-600">Car</th>
                            <th className="p-4 font-semibold text-gray-600">Dates</th>
                            <th className="p-4 font-semibold text-gray-600">Status</th>
                            <th className="p-4 font-semibold text-gray-600">Total</th>
                            <th className="p-4 font-semibold text-gray-600">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {bookings.map(booking => (
                            <tr key={booking._id} className="border-b border-gray-100 hover:bg-gray-50 transition">
                                <td className="p-4">{booking.user?.name}</td>
                                <td className="p-4">{booking.car?.name}</td>
                                <td className="p-4 text-gray-600">
                                    {new Date(booking.startDate).toLocaleDateString()} - {new Date(booking.endDate).toLocaleDateString()}
                                </td>
                                <td className="p-4">
                                    <span className={`px-3 py-1 rounded-full text-xs font-semibold ${booking.status === 'approved' ? 'bg-green-100 text-green-700' :
                                        booking.status === 'rejected' ? 'bg-red-100 text-red-700' :
                                            booking.status === 'paid' ? 'bg-blue-100 text-blue-700' : 'bg-yellow-100 text-yellow-700'
                                        }`}>
                                        {booking.status}
                                    </span>
                                </td>
                                <td className="p-4 font-medium">${booking.totalPrice}</td>
                                <td className="p-4 flex gap-2">
                                    {booking.status === 'pending' && (
                                        <>
                                            <button onClick={() => updateStatus(booking._id, 'approved')} className="bg-green-600 hover:bg-green-700 text-white px-3 py-1 rounded text-sm transition">Approve</button>
                                            <button onClick={() => updateStatus(booking._id, 'rejected')} className="bg-red-600 hover:bg-red-700 text-white px-3 py-1 rounded text-sm transition">Reject</button>
                                        </>
                                    )}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default AdminDashboard;
