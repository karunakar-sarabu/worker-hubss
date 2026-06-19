import React from "react";

const HowItWorks = () => {
    return (
    <section className="py-20 bg-white">
            <h2 className="text-4xl md:text-5xl font-bold font-bold text-center mb-4 text-purple-700">
                How It Works
            </h2>
            <p className="text-center text-xl font-semibold text-purple-500 mb-12">
                Start finding jobs or hiring workers in minutes
            </p>
            <div className="max-w-5xl mx-auto grid md:grid-cols-2 gap-10 px-6">

                <div className="bg-white p-8 rounded-2xl shadow-md hover:shadow-xl transition-all duration-300">
                    <h3 className="text-2xl font-bold text-green-600 mb-6">
                        For Workers
                    </h3>

                    <p className="text-lg mb-2">1️⃣ Register</p>
                    <p className="text-lg mb-2">2️⃣ Browse Jobs</p>
                    <p className="text-lg">3️⃣ Apply & Get Hired</p>
                </div>

                <div className="bg-white p-8 rounded-2xl shadow-md hover:shadow-xl transition-all duration-300">
                    <h3 className="text-2xl font-bold text-green-600 mb-6">
                        For Employers
                    </h3>

                    <p className="text-lg mb-2">1️⃣ Register</p>
                    <p className="text-lg mb-2">2️⃣ Post Job</p>
                    <p className="text-lg">3️⃣ Hire Workers</p>
                </div>

            </div>
        </section>
    );
};

export default HowItWorks;