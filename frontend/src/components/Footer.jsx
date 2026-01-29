import { FaFacebook, FaTwitter, FaInstagram, FaLinkedin, FaEnvelope, FaPhone, FaMapMarkerAlt } from 'react-icons/fa';
import { Link } from 'react-router-dom';

const Footer = () => {
    return (
        <footer className="bg-gray-950 text-gray-300 pt-16 pb-8 mt-20">
            <div className="container mx-auto px-4">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
                    {/* Brand Section */}
                    <div className="space-y-6">
                        <Link to="/" className="text-2xl font-bold text-white tracking-tight">
                            My<span className="text-primary">Rent</span>
                        </Link>
                        <p className="text-gray-400 leading-relaxed">
                            Experience the freedom of the open road with our premium car rental services.
                            Quality cars, affordable prices, and exceptional service.
                        </p>
                        <div className="flex gap-4">
                            <a href="#" className="w-10 h-10 rounded-full bg-gray-900 flex items-center justify-center hover:bg-primary hover:text-white transition duration-300">
                                <FaFacebook size={18} />
                            </a>
                            <a href="#" className="w-10 h-10 rounded-full bg-gray-900 flex items-center justify-center hover:bg-primary hover:text-white transition duration-300">
                                <FaTwitter size={18} />
                            </a>
                            <a href="#" className="w-10 h-10 rounded-full bg-gray-900 flex items-center justify-center hover:bg-primary hover:text-white transition duration-300">
                                <FaInstagram size={18} />
                            </a>
                            <a href="#" className="w-10 h-10 rounded-full bg-gray-900 flex items-center justify-center hover:bg-primary hover:text-white transition duration-300">
                                <FaLinkedin size={18} />
                            </a>
                        </div>
                    </div>

                    {/* Quick Links */}
                    <div>
                        <h4 className="text-white font-bold text-lg mb-6">Quick Links</h4>
                        <ul className="space-y-4">
                            <li><Link to="/" className="hover:text-primary transition duration-200">Home</Link></li>
                            <li><Link to="/cars" className="hover:text-primary transition duration-200">Browse Cars</Link></li>
                            <li><Link to="/about" className="hover:text-primary transition duration-200">About Us</Link></li>
                            <li><Link to="/contact" className="hover:text-primary transition duration-200">Contact Us</Link></li>
                        </ul>
                    </div>

                    {/* Contact Info */}
                    <div>
                        <h4 className="text-white font-bold text-lg mb-6">Contact Us</h4>
                        <ul className="space-y-4">
                            <li className="flex items-start gap-3">
                                <FaMapMarkerAlt className="text-primary mt-1" />
                                <span>123 Rental Zoope, City Center,<br />World 45678</span>
                            </li>
                            <li className="flex items-center gap-3">
                                <FaPhone className="text-primary" />
                                <span>+252 (61) 210-3239</span>
                            </li>
                            <li className="flex items-center gap-3">
                                <FaEnvelope className="text-primary" />
                                <span>support@myrent.com</span>
                            </li>
                        </ul>
                    </div>

                    {/* Newsletter */}
                    <div>
                        <h4 className="text-white font-bold text-lg mb-6">Newsletter</h4>
                        <p className="text-gray-400 mb-4">Subscribe to get latest deals and updates.</p>
                        <form className="flex flex-col gap-3">
                            <input
                                type="email"
                                placeholder="Your Email"
                                className="bg-gray-900 border border-gray-800 rounded-lg px-4 py-3 focus:outline-none focus:border-primary text-sm"
                            />
                            <button className="bg-primary hover:bg-blue-700 text-white font-bold py-3 rounded-lg transition duration-300 shadow-lg shadow-primary/20 text-sm">
                                Subscribe
                            </button>
                        </form>
                    </div>
                </div>

                <div className="border-t border-gray-900 pt-8 mt-8 flex flex-col md:flex-row justify-between items-center text-sm text-gray-500">
                    <p>&copy; 2026 MyRent Services. All rights reserved.</p>
                    <div className="flex gap-6 mt-4 md:mt-0">
                        <Link to="/privacy" className="hover:text-white transition">Privacy Policy</Link>
                        <Link to="/terms" className="hover:text-white transition">Terms of Service</Link>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
