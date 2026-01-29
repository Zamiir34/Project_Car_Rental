import React from 'react';

const PrivacyPage = () => {
    return (
        <div className="bg-white min-h-screen py-16 px-4">
            <div className="container mx-auto max-w-3xl">
                <h1 className="text-4xl font-bold mb-8 text-gray-800 border-b pb-4">Privacy Policy</h1>
                <p className="text-gray-600 mb-6 italic">Last Updated: January 29, 2026</p>

                <section className="mb-8">
                    <h2 className="text-2xl font-bold mb-4 text-gray-700">1. Information We Collect</h2>
                    <p className="text-gray-600 leading-relaxed">
                        We collect information you provide directly to us, such as when you create an account, book a car, or contact us for support.
                        This includes your name, email address, phone number, and driver's license details.
                    </p>
                </section>

                <section className="mb-8">
                    <h2 className="text-2xl font-bold mb-4 text-gray-700">2. How We Use Your Information</h2>
                    <p className="text-gray-600 leading-relaxed">
                        We use the information we collect to provide, maintain, and improve our services,
                        process your bookings, and communicate with you about your rentals.
                    </p>
                </section>

                <section className="mb-8">
                    <h2 className="text-2xl font-bold mb-4 text-gray-700">3. Data Security</h2>
                    <p className="text-gray-600 leading-relaxed">
                        We take reasonable measures to help protect information about you from loss, theft, misuse, and unauthorized access.
                    </p>
                </section>

                <section className="mb-8">
                    <h2 className="text-2xl font-bold mb-4 text-gray-700">4. Contact Us</h2>
                    <p className="text-gray-600 leading-relaxed">
                        If you have any questions about this Privacy Policy, please contact us at privacy@myrent.com.
                    </p>
                </section>
            </div>
        </div>
    );
};

export default PrivacyPage;
