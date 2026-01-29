import React from 'react';
import { FaCheckCircle, FaCar, FaRegSmileBeam, FaAward } from 'react-icons/fa';

const AboutPage = () => {
    return (
        <div className="bg-white min-h-screen">
            {/* Hero Section */}
            <div className="bg-primary text-white py-20 px-4 text-center">
                <h1 className="text-4xl md:text-5xl font-extrabold mb-4">About MyRent</h1>
                <p className="text-xl max-w-2xl mx-auto opacity-90">
                    We're redefining car rental with a focus on quality, transparency, and customer satisfaction.
                </p>
            </div>

            {/* Content Section */}
            <div className="container mx-auto px-4 py-16">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center mb-24">
                    <div>
                        <h2 className="text-3xl font-bold mb-6 text-gray-800">Our Story</h2>
                        <p className="text-gray-600 leading-relaxed mb-4">
                            Founded in 2020, MyRent started with a simple mission: to make car rental as easy and stress-free as possible.
                            We noticed that the traditional rental process was bogged down by hidden fees and poor customer service,
                            so we decided to build something better.
                        </p>
                        <p className="text-gray-600 leading-relaxed">
                            Today, we manage a diverse fleet of over 50 vehicles, ranging from fuel-efficient city cars to premium SUVs and luxury sedans.
                            Our team is dedicated to ensuring every journey you take is safe, comfortable, and memorable.
                        </p>
                    </div>
                    <div className="rounded-2xl overflow-hidden shadow-2xl">
                        <img
                            src="https://images.unsplash.com/photo-1549317661-bd32c8ce0db2?auto=format&fit=crop&q=80&w=800"
                            alt="Our team"
                            className="w-full h-full object-cover"
                        />
                    </div>
                </div>

                {/* Features Grid */}
                <h3 className="text-3xl font-bold text-center mb-12 text-gray-800">Why Customers Love Us</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                    {[
                        { icon: <FaCar />, title: "Premium Fleet", desc: "All our cars are late-model, well-maintained, and regularly inspected." },
                        { icon: <FaRegSmileBeam />, title: "No Hidden Fees", desc: "What you see is what you pay. Transparent pricing is at our core." },
                        { icon: <FaCheckCircle />, title: "Easy Booking", desc: "Book your car in less than 2 minutes with our streamlined platform." },
                        { icon: <FaAward />, title: "Award Winning", desc: "Recognized as the best regional rental service for three years running." }
                    ].map((feature, idx) => (
                        <div key={idx} className="bg-gray-50 p-8 rounded-xl text-center hover:shadow-lg transition duration-300">
                            <div className="text-primary text-4xl mb-4 flex justify-center">{feature.icon}</div>
                            <h4 className="font-bold text-xl mb-2">{feature.title}</h4>
                            <p className="text-gray-500 text-sm">{feature.desc}</p>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default AboutPage;
