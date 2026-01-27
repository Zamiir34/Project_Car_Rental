import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { FaCar, FaUser, FaSignOutAlt } from 'react-icons/fa';

const Header = () => {
    const { user, logout } = useAuth();
    const navigate = useNavigate();

    const handleLogout = () => {
        logout();
        navigate('/login');
    };

    return (
        <header className="bg-white shadow-sm sticky top-0 z-50 py-4">
            <div className="container mx-auto px-4 flex justify-between items-center">
                <Link to="/" className="text-2xl font-bold text-primary flex items-center gap-2">
                    <FaCar /> MyRent
                </Link>
                <nav className="flex items-center gap-6">
                    <Link to="/cars" className="text-gray-600 hover:text-primary font-medium transition">Fleet</Link>
                    {user ? (
                        <>
                            <Link to={user.isAdmin ? "/admin" : "/dashboard"} className="flex items-center gap-2 text-gray-600 hover:text-primary font-medium transition">
                                <FaUser /> {user.name}
                            </Link>
                            {user.isAdmin && (
                                <Link to="/admin/reports" className="text-gray-600 hover:text-primary font-medium transition">Reports</Link>
                            )}
                            <button onClick={handleLogout} className="border border-primary text-primary hover:bg-primary hover:text-white px-4 py-2 rounded-lg transition duration-300 flex items-center gap-2">
                                <FaSignOutAlt /> Logout
                            </button>
                        </>
                    ) : (
                        <>
                            <Link to="/login" className="text-gray-600 hover:text-primary font-medium transition">Login</Link>
                            <Link to="/register" className="bg-primary hover:bg-blue-700 text-white px-5 py-2 rounded-lg font-medium transition duration-300">Register</Link>
                        </>
                    )}
                </nav>
            </div>
        </header>
    );
};

export default Header;
