import React, { useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const EmployerRegister = () => {
    const [showPassword, setShowPassword] = useState(false);
    const [loading, setLoading] = useState(false);
    const [registrationSuccess, setRegistrationSuccess] = useState(false);

    const [formData, setFormData] = useState({
        companyName: "",
        phone: "",
        location: "",
        password: "",
    });

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (
            !formData.companyName ||
            !formData.phone ||
            !formData.location ||
            !formData.password
        ) {
            alert("Please fill all fields");
            return;
        }
        if (!/^\d{10}$/.test(formData.phone)) {
            alert("Please enter a valid 10-digit phone number");
            return;
        }
        try {
            setLoading(true);

            await axios.post(
                `${import.meta.env.VITE_API_URL}/api/employers/register`,
                formData
            );

            setRegistrationSuccess(true);

        } catch (error) {

            alert(
                error.response?.data?.message ||
                "Registration failed"
            );

        } finally {

            setLoading(false);

        }
    };

    if (registrationSuccess) {
        return (
            <div className="min-h-screen bg-gray-100 flex items-center justify-center p-6">

                <div className="bg-white rounded-3xl shadow-xl p-10 max-w-lg w-full text-center">

                    <div className="text-6xl mb-4">
                        🎉
                    </div>

                    <h1 className="text-3xl font-bold text-green-600 mb-4">
                        Registration Successful
                    </h1>

                    <p className="text-gray-600 mb-8">
                        Your employer account has been created successfully.
                        You can now login and start posting jobs.
                    </p>

                    <Link
                        to="/login"
                        className="block w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-xl font-semibold"
                    >
                        Login Now
                    </Link>

                </div>

            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-100">

            {/* Hero */}

            <div className="bg-gradient-to-r from-blue-700 to-indigo-700 text-white py-12 px-6">

                <div className="max-w-6xl mx-auto text-center">

                    <h1 className="text-4xl md:text-5xl font-bold">
                        Employer Registration
                    </h1>

                    <p className="mt-4 text-lg text-blue-100">
                        Hire skilled workers and grow your business faster.
                    </p>

                </div>

            </div>

            <div className="max-w-6xl mx-auto px-6 py-10">

                <div className="grid lg:grid-cols-2 gap-10 items-center">

                    {/* Left Side */}

                    <div className="hidden lg:block">

                        <h2 className="text-4xl font-bold text-slate-800 mb-6">
                            Find the Right Workers
                        </h2>

                        <p className="text-lg text-gray-600 mb-8">
                            Create your employer account and connect with
                            skilled workers in your area.
                        </p>

                        <div className="space-y-4">

                            <div className="bg-white p-5 rounded-2xl shadow">
                                ✅ Post jobs quickly
                            </div>

                            <div className="bg-white p-5 rounded-2xl shadow">
                                ✅ View worker profiles
                            </div>

                            <div className="bg-white p-5 rounded-2xl shadow">
                                ✅ Contact workers on WhatsApp
                            </div>

                            <div className="bg-white p-5 rounded-2xl shadow">
                                ✅ Manage applications easily
                            </div>

                        </div>

                    </div>

                    {/* Form */}

                    <div className="bg-white rounded-3xl shadow-xl p-8">

                        <h2 className="text-3xl font-bold text-center mb-2">
                            Register as Employer
                        </h2>

                        <p className="text-center text-gray-500 mb-8">
                            Create your employer account
                        </p>

                        <form
                            onSubmit={handleSubmit}
                            className="space-y-5"
                        >

                            <input
                                type="text"
                                name="companyName"
                                placeholder="Company / Employer Name"
                                value={formData.companyName}
                                onChange={handleChange}
                                className="w-full border border-gray-300 rounded-xl p-3"
                            />

                            <input
                                type="tel"
                                name="phone"
                                placeholder="Phone Number"
                                value={formData.phone}
                                onChange={handleChange}
                                className="w-full border border-gray-300 rounded-xl p-3"
                            />

                            <input
                                type="text"
                                name="location"
                                placeholder="Location"
                                value={formData.location}
                                onChange={handleChange}
                                className="w-full border border-gray-300 rounded-xl p-3"
                            />

                            <div className="relative">

                                <input
                                    type={
                                        showPassword
                                            ? "text"
                                            : "password"
                                    }
                                    name="password"
                                    placeholder="Password"
                                    value={formData.password}
                                    onChange={handleChange}
                                    className="w-full border border-gray-300 rounded-xl p-3"
                                />

                                <button
                                    type="button"
                                    onClick={() =>
                                        setShowPassword(
                                            !showPassword
                                        )
                                    }
                                    className="absolute right-4 top-3 text-blue-600 font-semibold"
                                >
                                    {showPassword
                                        ? "Hide"
                                        : "Show"}
                                </button>

                            </div>

                            <button
                                type="submit"
                                disabled={loading}
                                className="w-full bg-indigo-600 hover:bg-indigo-700 text-white py-3 rounded-xl font-bold disabled:bg-gray-400"
                            >
                                {loading
                                    ? "Registering..."
                                    : "Register"}
                            </button>

                        </form>

                        <div className="mt-6 text-center">

                            <p className="text-gray-600">
                                Already have an account?
                            </p>

                            <Link
                                to="/login"
                                className="text-blue-600 font-semibold"
                            >
                                Login Here
                            </Link>

                        </div>

                    </div>

                </div>

            </div>

        </div>
    );
};

export default EmployerRegister;