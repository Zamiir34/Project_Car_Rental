import { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import api from '../services/api';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    BarElement,
    ArcElement,
    Title,
    Tooltip,
    Legend,
    Filler,
} from 'chart.js';
import { Line, Doughnut } from 'react-chartjs-2';
import { useNavigate } from 'react-router-dom';
import { FaChartLine, FaWallet, FaUsers, FaCar, FaPrint, FaDownload, FaArrowUp, FaArrowDown } from 'react-icons/fa';

ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    BarElement,
    ArcElement,
    Title,
    Tooltip,
    Legend,
    Filler
);

const ReportPage = () => {
    const { user } = useAuth();
    const navigate = useNavigate();
    const [stats, setStats] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (!user || !user.isAdmin) {
            navigate('/');
            return;
        }

        const fetchReportData = async () => {
            try {
                const { data } = await api.get('/admin/stats');
                setStats(data);
            } catch (error) {
                console.error("Failed to fetch report data", error);
            } finally {
                setLoading(false);
            }
        };

        fetchReportData();
    }, [user, navigate]);

    if (loading) return (
        <div className="min-h-screen flex justify-center items-center bg-gray-50">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
        </div>
    );

    if (!stats) return <div className="p-8 text-center text-red-500">Error loading report data.</div>;

    const revenueData = {
        labels: stats.monthlyBookings.map(item => `Month ${item._id}`),
        datasets: [
            {
                label: 'Monthly Revenue',
                data: stats.monthlyBookings.map(item => item.revenue || 0),
                borderColor: 'rgb(59, 130, 246)', // Blue-500
                backgroundColor: (context) => {
                    const ctx = context.chart.ctx;
                    const gradient = ctx.createLinearGradient(0, 0, 0, 400);
                    gradient.addColorStop(0, 'rgba(59, 130, 246, 0.5)');
                    gradient.addColorStop(1, 'rgba(59, 130, 246, 0.0)');
                    return gradient;
                },
                fill: true,
                tension: 0.4,
                pointRadius: 4,
                pointBackgroundColor: 'rgb(59, 130, 246)',
            },
        ],
    };

    const bookingsData = {
        labels: stats.bookingStatusCounts.map(item => item._id.charAt(0).toUpperCase() + item._id.slice(1)),
        datasets: [
            {
                data: stats.bookingStatusCounts.map(item => item.count),
                backgroundColor: [
                    'rgba(16, 185, 129, 0.8)', // Green - Approved
                    'rgba(245, 158, 11, 0.8)', // Amber - Pending
                    'rgba(239, 68, 68, 0.8)',  // Red - Rejected/Cancelled
                    'rgba(59, 130, 246, 0.8)', // Blue - Paid
                ],
                borderWidth: 0,
                hoverOffset: 4,
            },
        ],
    };

    const handleExport = () => {
        const csvContent = "data:text/csv;charset=utf-8,"
            + "Metric,Value\n"
            + `Total Revenue,${stats.totalRevenue}\n`
            + `Total Bookings,${stats.totalBookings}\n`
            + `Total Users,${stats.totalUsers}\n`
            + `Total Cars,${stats.totalCars}`;

        const encodedUri = encodeURI(csvContent);
        const link = document.createElement("a");
        link.setAttribute("href", encodedUri);
        link.setAttribute("download", `admin_report_${new Date().toISOString().split('T')[0]}.csv`);
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    };

    const handlePrint = () => {
        window.print();
    };

    const KPICard = ({ title, value, icon: Icon, color, trend }) => (
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 relative overflow-hidden group hover:shadow-md transition duration-300">
            <div className="flex justify-between items-start mb-4">
                <div className={`p-3 rounded-lg ${color} text-white bg-opacity-90`}>
                    <Icon className="text-xl" />
                </div>
                {trend && (
                    <div className={`flex items-center text-xs font-semibold ${trend > 0 ? 'text-green-500' : 'text-red-500'} bg-gray-50 px-2 py-1 rounded-full`}>
                        {trend > 0 ? <FaArrowUp className="mr-1" /> : <FaArrowDown className="mr-1" />}
                        {Math.abs(trend)}%
                    </div>
                )}
            </div>
            <div>
                <p className="text-sm font-medium text-gray-500 mb-1">{title}</p>
                <h3 className="text-3xl font-bold text-gray-800 tracking-tight">{value}</h3>
            </div>
            <div className="absolute right-0 bottom-0 opacity-5 transform translate-x-1/4 translate-y-1/4 group-hover:scale-110 transition duration-500">
                <Icon className="text-9xl text-gray-800" />
            </div>
        </div>
    );

    return (
        <div className="min-h-screen bg-gray-50 pb-12 print:bg-white print:pb-0">
            <div className="container mx-auto px-4 py-8 max-w-7xl">
                {/* Header Section */}
                <div className="flex flex-col md:flex-row justify-between items-center mb-8 gap-4 print:mb-4">
                    <div>
                        <h1 className="text-3xl font-extrabold text-gray-900 tracking-tight">Executive Summary</h1>
                        <p className="text-gray-500 mt-1">
                            Report generated on {new Date().toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}
                        </p>
                    </div>
                    <div className="flex gap-3 print:hidden">
                        <button
                            onClick={handlePrint}
                            className="flex items-center gap-2 bg-white text-gray-700 hover:text-primary hover:border-primary border border-gray-200 px-5 py-2.5 rounded-xl font-medium transition shadow-sm"
                        >
                            <FaPrint /> Print
                        </button>
                        <button
                            onClick={handleExport}
                            className="flex items-center gap-2 bg-primary hover:bg-blue-700 text-white px-5 py-2.5 rounded-xl font-medium transition shadow-lg shadow-blue-500/30"
                        >
                            <FaDownload /> Export CSV
                        </button>
                    </div>
                </div>

                {/* KPI Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8 print:gap-4 print:mb-6">
                    <KPICard
                        title="Total Revenue"
                        value={`$${stats.totalRevenue?.toLocaleString()}`}
                        icon={FaWallet}
                        color="bg-blue-600"
                        trend={12.5}
                    />
                    <KPICard
                        title="Total Bookings"
                        value={stats.totalBookings}
                        icon={FaChartLine}
                        color="bg-emerald-500"
                        trend={8.2}
                    />
                    <KPICard
                        title="Total Users"
                        value={stats.totalUsers}
                        icon={FaUsers}
                        color="bg-violet-500"
                        trend={5.4}
                    />
                    <KPICard
                        title="Total Cars"
                        value={stats.totalCars}
                        icon={FaCar}
                        color="bg-orange-500"
                    />
                </div>

                {/* Charts Section */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8 print:gap-4 print:mb-6">
                    {/* Revenue Chart */}
                    <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 lg:col-span-2 print:border-gray-200 print:shadow-none">
                        <h3 className="text-lg font-bold text-gray-800 mb-6 flex items-center gap-2">
                            <span className="w-2 h-6 bg-blue-500 rounded-full"></span>
                            Revenue Analytics
                        </h3>
                        <div className="h-80 w-full print:h-[250px]">
                            <Line
                                data={revenueData}
                                options={{
                                    responsive: true,
                                    maintainAspectRatio: false,
                                    plugins: { legend: { display: false } },
                                    scales: {
                                        y: { beginAtZero: true, grid: { borderDash: [2, 4] } },
                                        x: { grid: { display: false } }
                                    }
                                }}
                            />
                        </div>
                    </div>

                    {/* Status Breakdown */}
                    <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 print:border-gray-200 print:shadow-none">
                        <h3 className="text-lg font-bold text-gray-800 mb-6 flex items-center gap-2">
                            <span className="w-2 h-6 bg-emerald-500 rounded-full"></span>
                            Booking Status
                        </h3>
                        <div className="h-64 relative flex justify-center print:h-[200px]">
                            <Doughnut
                                data={bookingsData}
                                options={{
                                    responsive: true,
                                    maintainAspectRatio: false,
                                    cutout: '70%',
                                    plugins: {
                                        legend: { position: 'bottom', labels: { usePointStyle: true, padding: 20 } }
                                    }
                                }}
                            />
                        </div>
                        <div className="mt-6 text-center">
                            <p className="text-gray-500 text-sm">Total Bookings Processed</p>
                            <p className="text-2xl font-bold text-gray-800">{stats.totalBookings}</p>
                        </div>
                    </div>
                </div>

                {/* Recent Activity Table (Mocked) */}
                <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden print:border-gray-200">
                    <div className="p-6 border-b border-gray-100 flex justify-between items-center">
                        <h3 className="text-lg font-bold text-gray-800 flex items-center gap-2">
                            <span className="w-2 h-6 bg-violet-500 rounded-full"></span>
                            Recent Transactions
                        </h3>
                        <button className="text-primary text-sm font-semibold hover:underline print:hidden">View All</button>
                    </div>
                    <div className="overflow-x-auto">
                        <table className="w-full text-left">
                            <thead className="bg-gray-50 text-gray-500 uppercase text-xs">
                                <tr>
                                    <th className="px-6 py-4 font-semibold">Transaction ID</th>
                                    <th className="px-6 py-4 font-semibold">User</th>
                                    <th className="px-6 py-4 font-semibold">Date</th>
                                    <th className="px-6 py-4 font-semibold">Amount</th>
                                    <th className="px-6 py-4 font-semibold">Status</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-100">
                                {/* Mock Data */}
                                {[1, 2, 3].map((_, i) => (
                                    <tr key={i} className="hover:bg-gray-50 transition">
                                        <td className="px-6 py-4 text-gray-500 font-mono text-sm">#TRX-885{i}</td>
                                        <td className="px-6 py-4 font-medium text-gray-800">John Doe</td>
                                        <td className="px-6 py-4 text-gray-500 text-sm">{new Date().toLocaleDateString()}</td>
                                        <td className="px-6 py-4 font-bold text-gray-800">$150.00</td>
                                        <td className="px-6 py-4">
                                            <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-xs font-semibold">
                                                Completed
                                            </span>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>

                {/* Print Footer */}
                <div className="hidden print:block mt-8 text-center text-gray-400 text-sm">
                    <p>© {new Date().getFullYear()} MyRent Car Rental System. Confidential Report.</p>
                </div>
            </div>
        </div>
    );
};

export default ReportPage;
