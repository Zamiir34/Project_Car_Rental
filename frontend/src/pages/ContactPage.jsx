import React, { useState } from 'react';
import { FaPhone, FaEnvelope, FaMapMarkerAlt, FaPaperPlane } from 'react-icons/fa';
import { toast } from 'react-toastify';

const ContactPage = () => {
    const [formData, setFormData] = useState({ name: '', email: '', subject: '', message: '' });

    const handleSubmit = (e) => {
        e.preventDefault();
        // Mock submission
        toast.success("Thank you for reaching out! We'll get back to you soon.");
        setFormData({ name: '', email: '', subject: '', message: '' });
    };

    return (
        <div className="bg-gray-50 min-h-screen">
            {/* Header */}
            <div className="bg-gray-950 text-white py-16 px-4 text-center">
                <h1 className="text-4xl font-extrabold mb-4">Contact Us</h1>
                <p className="text-gray-400 max-w-xl mx-auto">
                    Have questions or need assistance? Our team is here to help you 24/7.
                </p>
            </div>

            <div className="container mx-auto px-4 -mt-10 pb-16">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* Contact Info */}
                    <div className="lg:col-span-1 space-y-6">
                        <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100 h-full">
                            <h2 className="text-2xl font-bold mb-8 text-gray-800">Get In Touch</h2>
                            <div className="space-y-8">
                                <div className="flex items-start gap-4">
                                    <div className="w-12 h-12 bg-blue-50 text-primary rounded-xl flex items-center justify-center flex-shrink-0">
                                        <FaMapMarkerAlt size={20} />
                                    </div>
                                    <div>
                                        <h4 className="font-bold text-gray-700">Office Location</h4>
                                        <p className="text-gray-500 text-sm">123 Rental Zoop, City Center, Suite 101, World 45678</p>
                                    </div>
                                </div>
                                <div className="flex items-start gap-4">
                                    <div className="w-12 h-12 bg-green-50 text-green-600 rounded-xl flex items-center justify-center flex-shrink-0">
                                        <FaPhone size={20} />
                                    </div>
                                    <div>
                                        <h4 className="font-bold text-gray-700">Phone Number</h4>
                                        <p className="text-gray-500 text-sm">+252 (61) 210-3239</p>
                                        <p className="text-gray-500 text-sm">+252 (61) 210-3239</p>

                                    </div>
                                </div>
                                <div className="flex items-start gap-4">
                                    <div className="w-12 h-12 bg-purple-50 text-purple-600 rounded-xl flex items-center justify-center flex-shrink-0">
                                        <FaEnvelope size={20} />
                                    </div>
                                    <div>
                                        <h4 className="font-bold text-gray-700">Email Address</h4>
                                        <p className="text-gray-500 text-sm">support@myrent.com</p>
                                        <p className="text-gray-500 text-sm">info@myrent.com</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Contact Form */}
                    <div className="lg:col-span-2">
                        <div className="bg-white p-8 md:p-12 rounded-2xl shadow-sm border border-gray-100">
                            <h2 className="text-2xl font-bold mb-8 text-gray-800">Send us a Message</h2>
                            <form onSubmit={handleSubmit} className="space-y-6">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div className="space-y-2">
                                        <label className="text-sm font-medium text-gray-600">Full Name</label>
                                        <input
                                            required
                                            value={formData.name}
                                            onChange={e => setFormData({ ...formData, name: e.target.value })}
                                            type="text"
                                            placeholder="Mohamett Abdi"
                                            className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:border-primary transition"
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-sm font-medium text-gray-600">Email Address</label>
                                        <input
                                            required
                                            value={formData.email}
                                            onChange={e => setFormData({ ...formData, email: e.target.value })}
                                            type="email"
                                            placeholder="mohamett@example.com"
                                            className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:border-primary transition"
                                        />
                                    </div>
                                </div>
                                <div className="space-y-2">
                                    <label className="text-sm font-medium text-gray-600">Subject</label>
                                    <input
                                        required
                                        value={formData.subject}
                                        onChange={e => setFormData({ ...formData, subject: e.target.value })}
                                        type="text"
                                        placeholder="How can we help?"
                                        className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:border-primary transition"
                                    />
                                </div>
                                <div className="space-y-2">
                                    <label className="text-sm font-medium text-gray-600">Message</label>
                                    <textarea
                                        required
                                        value={formData.message}
                                        onChange={e => setFormData({ ...formData, message: e.target.value })}
                                        rows="5"
                                        placeholder="Write your message here..."
                                        className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:border-primary transition resize-none"
                                    ></textarea>
                                </div>
                                <button className="w-full md:w-auto bg-primary hover:bg-blue-700 text-white font-bold py-4 px-10 rounded-lg transition duration-300 flex items-center justify-center gap-2 shadow-lg shadow-primary/20">
                                    <FaPaperPlane size={16} />
                                    Send Message
                                </button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ContactPage;
