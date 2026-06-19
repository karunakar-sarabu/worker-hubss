import React from "react";
import { Link } from "react-router-dom";

const CallToAction = () => {
    return (
        <section className="py-24 bg-gradient-to-r from-green-600 to-blue-600 text-white">

            <div className="max-w-4xl mx-auto text-center px-6">

                <h2 className="text-5xl font-bold mb-6">
                    Ready to Get Started?
                </h2>

                <p className="text-2xl font-medium mb-10">
                    Join thousands of workers and employers today.
                </p>

                <div className="flex flex-col sm:flex-row justify-center gap-5">

                    <Link to="/worker-register">
                        <button className="bg-white text-green-700 px-8 py-4 rounded-xl font-bold hover:scale-105 transition">
                            Find Jobs
                        </button>
                    </Link>

                    <Link to="/employer-register">
                        <button className="bg-white text-blue-700 px-8 py-4 rounded-xl font-bold hover:scale-105 transition">
                            Hire Workers
                        </button>
                    </Link>

                </div>

            </div>

        </section>
    );
};

export default CallToAction;