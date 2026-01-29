import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { FaCar, FaUser, FaSignOutAlt, FaBars, FaTimes } from 'react-icons/fa';

const Header = () => {
    const { user, logout } = useAuth();
    const navigate = useNavigate();
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const handleLogout = () => {
        logout();
        setIsMenuOpen(false);
        navigate('/login');
    };

    const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

    const closeMenu = () => setIsMenuOpen(false);

    return (
        <header className="bg-white shadow-sm sticky top-0 z-50 py-4">
            <div className="container mx-auto px-4 flex justify-between items-center">
                <Link to="/" onClick={closeMenu} className="text-2xl font-bold text-primary flex items-center gap-2">
                    <FaCar /> MyRent
                </Link>

                {/* Desktop Navigation */}
                <nav className="hidden md:flex items-center gap-6">
                    <Link to="/" className="text-gray-600 hover:text-primary font-medium transition">Home</Link>
                    <Link to="/cars" className="text-gray-600 hover:text-primary font-medium transition">Cars</Link>
                    <Link to="/about" className="text-gray-600 hover:text-primary font-medium transition">About</Link>
                    <Link to="/contact" className="text-gray-600 hover:text-primary font-medium transition">Contact</Link>
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

                {/* Mobile Menu Toggle */}
                <button
                    onClick={toggleMenu}
                    className="md:hidden text-gray-600 hover:text-primary transition focus:outline-none"
                    aria-label="Toggle menu"
                >
                    {isMenuOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
                </button>
            </div>

            {/* Mobile Navigation */}
            {isMenuOpen && (
                <div className="md:hidden bg-white border-t border-gray-100 absolute top-full left-0 w-full shadow-lg animate-fade-in-down">
                    <nav className="flex flex-col p-4 gap-4">
                        <Link to="/" onClick={closeMenu} className="text-gray-600 hover:text-primary font-medium transition py-2 border-b border-gray-50">Home</Link>
                        <Link to="/cars" onClick={closeMenu} className="text-gray-600 hover:text-primary font-medium transition py-2 border-b border-gray-50">Cars</Link>
                        <Link to="/about" onClick={closeMenu} className="text-gray-600 hover:text-primary font-medium transition py-2 border-b border-gray-50">About</Link>
                        <Link to="/contact" onClick={closeMenu} className="text-gray-600 hover:text-primary font-medium transition py-2 border-b border-gray-50">Contact</Link>
                        {user ? (
                            <>
                                <Link to={user.isAdmin ? "/admin" : "/dashboard"} onClick={closeMenu} className="flex items-center gap-2 text-gray-600 hover:text-primary font-medium transition py-2 border-b border-gray-50">
                                    <FaUser /> {user.name}
                                </Link>
                                {user.isAdmin && (
                                    <Link to="/admin/reports" onClick={closeMenu} className="text-gray-600 hover:text-primary font-medium transition py-2 border-b border-gray-50">Reports</Link>
                                )}
                                <button onClick={handleLogout} className="w-full text-left text-primary font-medium py-2 flex items-center gap-2">
                                    <FaSignOutAlt /> Logout
                                </button>
                            </>
                        ) : (
                            <div className="flex flex-col gap-3 pt-2">
                                <Link to="/login" onClick={closeMenu} className="text-gray-600 hover:text-primary font-medium transition py-2">Login</Link>
                                <Link to="/register" onClick={closeMenu} className="bg-primary hover:bg-blue-700 text-white text-center px-5 py-3 rounded-lg font-medium transition duration-300">Register</Link>
                            </div>
                        )}
                    </nav>
                </div>
            )}
        </header>
    );
};

export default Header;
