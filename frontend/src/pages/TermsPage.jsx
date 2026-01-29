import React from 'react';

const TermsPage = () => {
    return (
        <div className="bg-white min-h-screen py-16 px-4">
            <div className="container mx-auto max-w-3xl">
                <h1 className="text-4xl font-bold mb-8 text-gray-800 border-b pb-4">Terms of Service</h1>
                <p className="text-gray-600 mb-6 italic">Last Updated: January 29, 2026</p>

                <section className="mb-8">
                    <h2 className="text-2xl font-bold mb-4 text-gray-700">1. Acceptance of Terms</h2>
                    <p className="text-gray-600 leading-relaxed">
                        By accessing and using MyRent, you agree to comply with and be bound by these Terms of Service.
                    </p>
                </section>

                <section className="mb-8">
                    <h2 className="text-2xl font-bold mb-4 text-gray-700">2. Rental Requirements</h2>
                    <p className="text-gray-600 leading-relaxed">
                        To rent a vehicle, you must be at least 21 years old and possess a valid driver's license.
                        Verification of these documents is required before a booking is finalized.
                    </p>
                </section>

                <section className="mb-8">
                    <h2 className="text-2xl font-bold mb-4 text-gray-700">3. Booking & Cancellation</h2>
                    <p className="text-gray-600 leading-relaxed">
                        Bookings are subject to availability and admin approval.
                        Cancellations must be made at least 24 hours in advance to be eligible for a full refund.
                    </p>
                </section>

                <section className="mb-8">
                    <h2 className="text-2xl font-bold mb-4 text-gray-700">4. Limitation of Liability</h2>
                    <p className="text-gray-600 leading-relaxed">
                        MyRent is not liable for any damages or losses resulting from the use of our vehicles beyond what is covered by our insurance policy.
                    </p>
                </section>
            </div>
        </div>
    );
};

export default TermsPage;
