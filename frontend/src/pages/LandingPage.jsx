import { Link } from 'react-router-dom';
import { FaCar, FaMoneyBillWave, FaClock, FaCheckCircle, FaStar, FaShieldAlt } from 'react-icons/fa';

const LandingPage = () => {
    return (
        <div className="overflow-x-hidden">
            {/* Hero Section */}
            <section className="relative h-[85vh] flex items-center text-white -mt-4 bg-cover bg-center" style={{ backgroundImage: "url('https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80')" }}>
                <div className="absolute inset-0 bg-gradient-to-b from-black/40 to-black/70"></div>
                <div className="container mx-auto px-4 relative z-10 text-center max-w-4xl">
                    <h1 className="text-5xl md:text-7xl font-extrabold mb-6 leading-tight animate-fade-in-up">Experience the Freedom of Drive</h1>
                    <p className="text-xl md:text-2xl mb-10 opacity-90 animate-fade-in-up delay-100">Premium luxury cars at unbeatable prices. No hidden fees, just pure driving pleasure.</p>
                    <div className="flex flex-col md:flex-row justify-center gap-6 animate-fade-in-up delay-200">
                        <Link to="/cars" className="bg-primary hover:bg-blue-700 text-white font-bold py-3 px-8 rounded-lg text-lg transition duration-300">Browse Fleet</Link>
                        <a href="#how-it-works" className="border-2 border-white text-white hover:bg-white hover:text-primary font-bold py-3 px-8 rounded-lg text-lg transition duration-300">How It Works</a>
                    </div>
                </div>
            </section>

            {/* Features Section */}
            <section className="py-24 bg-gray-50">
                <div className="container mx-auto px-4">
                    <div className="text-center mb-16">
                        <h2 className="text-4xl font-bold text-gray-800 mb-2">Why Choose MyRent?</h2>
                        <p className="text-gray-600 text-lg">We provide the best car rental experience with top-notch services.</p>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        <div className="bg-white p-10 rounded-xl shadow-sm hover:shadow-xl hover:-translate-y-2 transition-all duration-300 text-center border border-gray-100">
                            <div className="w-20 h-20 bg-blue-50 text-primary rounded-full flex items-center justify-center mx-auto mb-6 text-3xl"><FaCar /></div>
                            <h3 className="text-2xl font-bold mb-3">Premium Fleet</h3>
                            <p className="text-gray-500">Choose from our exclusive collection of luxury and sports cars maintained to perfection.</p>
                        </div>
                        <div className="bg-white p-10 rounded-xl shadow-sm hover:shadow-xl hover:-translate-y-2 transition-all duration-300 text-center border border-gray-100">
                            <div className="w-20 h-20 bg-blue-50 text-primary rounded-full flex items-center justify-center mx-auto mb-6 text-3xl"><FaMoneyBillWave /></div>
                            <h3 className="text-2xl font-bold mb-3">Affordable Rates</h3>
                            <p className="text-gray-500">Enjoy luxury without breaking the bank. Competitive daily rates with no hidden charges.</p>
                        </div>
                        <div className="bg-white p-10 rounded-xl shadow-sm hover:shadow-xl hover:-translate-y-2 transition-all duration-300 text-center border border-gray-100">
                            <div className="w-20 h-20 bg-blue-50 text-primary rounded-full flex items-center justify-center mx-auto mb-6 text-3xl"><FaClock /></div>
                            <h3 className="text-2xl font-bold mb-3">Fast Booking</h3>
                            <p className="text-gray-500">Seamless booking process. Get verified and on the road in less than 5 minutes.</p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Steps Section */}
            <section id="how-it-works" className="py-24 bg-white">
                <div className="container mx-auto px-4">
                    <div className="text-center mb-16">
                        <h2 className="text-4xl font-bold text-gray-800 mb-2">How It Works</h2>
                        <p className="text-gray-600 text-lg">Rent your dream car in 3 simple steps.</p>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-12 text-center">
                        <div className="relative">
                            <div className="w-14 h-14 bg-primary text-white rounded-full flex items-center justify-center mx-auto mb-6 text-2xl font-bold ring-8 ring-blue-50">1</div>
                            <h3 className="text-xl font-bold mb-2">Choose Your Car</h3>
                            <p className="text-gray-500">Browse our extensive fleet and pick the perfect car for your journey.</p>
                        </div>
                        <div className="relative">
                            <div className="w-14 h-14 bg-primary text-white rounded-full flex items-center justify-center mx-auto mb-6 text-2xl font-bold ring-8 ring-blue-50">2</div>
                            <h3 className="text-xl font-bold mb-2">Book & Verify</h3>
                            <p className="text-gray-500">Select your dates and wait for quick admin approval.</p>
                        </div>
                        <div className="relative">
                            <div className="w-14 h-14 bg-primary text-white rounded-full flex items-center justify-center mx-auto mb-6 text-2xl font-bold ring-8 ring-blue-50">3</div>
                            <h3 className="text-xl font-bold mb-2">Pay & Drive</h3>
                            <p className="text-gray-500">Pay securely via EVC Plus and enjoy your ride.</p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Trust Section */}
            <section className="bg-primary py-12 text-white">
                <div className="container mx-auto px-4 flex flex-col md:flex-row justify-around items-center gap-8">
                    <div className="flex items-center gap-4 text-xl font-semibold">
                        <FaCheckCircle className="text-3xl opacity-80" />
                        <h4>100+ Cars</h4>
                    </div>
                    <div className="flex items-center gap-4 text-xl font-semibold">
                        <FaStar className="text-3xl opacity-80" />
                        <h4>5 Star Service</h4>
                    </div>
                    <div className="flex items-center gap-4 text-xl font-semibold">
                        <FaShieldAlt className="text-3xl opacity-80" />
                        <h4>Secure Payment</h4>
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <section className="py-24 relative bg-fixed bg-cover bg-center text-white text-center" style={{ backgroundImage: "url('https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80')" }}>
                <div className="absolute inset-0 bg-black/70"></div>
                <div className="container mx-auto px-4 relative z-10">
                    <h2 className="text-4xl md:text-5xl font-bold mb-4">Ready to start your journey?</h2>
                    <p className="text-xl mb-8 opacity-90">Join thousands of satisfied customers today.</p>
                    <Link to="/register" className="bg-white text-primary hover:bg-gray-100 font-bold py-3 px-8 rounded-lg text-lg transition duration-300 inline-block">Sign Up Now</Link>
                </div>
            </section>
        </div>
    );
};

export default LandingPage;
