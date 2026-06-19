import React, { useState } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";

const Login = () => {
    const navigate = useNavigate();

    const [showPassword, setShowPassword] = useState(false);
    const [loading, setLoading] = useState(false);

    const [formData, setFormData] = useState({
        phone: "",
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

        if (!formData.phone || !formData.password) {
            alert("Please fill all fields");
            return;
        }
        if (!/^\d{10}$/.test(formData.phone)) {
            alert("Please enter a valid 10-digit phone number");
            return;
        }
        try {
            setLoading(true);

            const response = await axios.post(
                `${import.meta.env.VITE_API_URL}/api/login`,
                formData
            );

            localStorage.setItem(
                "token",
                response.data.token
            );

            localStorage.setItem(
                "role",
                response.data.role
            );

            localStorage.setItem(
                "userPhone",
                response.data.phone
            );

            if (response.data.role === "worker") {
                navigate("/worker-dashboard");
            } else {
                navigate("/employer-dashboard");
            }

        } catch (error) {

            alert(
                error.response?.data?.message ||
                "Login failed"
            );

        } finally {

            setLoading(false);

        }
    };

    return (
        <div className="min-h-screen bg-gray-100">

            {/* Hero */}

            <div className="bg-gradient-to-r from-blue-600 to-cyan-600 text-white py-12 px-6">

                <div className="max-w-6xl mx-auto text-center">

                    <h1 className="text-4xl md:text-5xl font-bold">
                        Daily Wage Connect
                    </h1>

                    <p className="mt-4 text-lg text-blue-100">
                        Connecting skilled workers and employers.
                    </p>

                </div>

            </div>

            <div className="max-w-6xl mx-auto px-6 py-10">

                <div className="grid lg:grid-cols-2 gap-10 items-center">

                    {/* Left Side */}

                    <div className="hidden lg:block">

                        <h2 className="text-4xl font-bold text-slate-800 mb-6">
                            Welcome Back
                        </h2>

                        <p className="text-lg text-gray-600 mb-8">
                            Login to manage jobs, applications,
                            workers and hiring activity.
                        </p>

                        <div className="space-y-4">

                            <div className="bg-white p-5 rounded-2xl shadow">
                                ✅ Post and manage jobs
                            </div>

                            <div className="bg-white p-5 rounded-2xl shadow">
                                ✅ Connect through WhatsApp
                            </div>

                            <div className="bg-white p-5 rounded-2xl shadow">
                                ✅ Track applications
                            </div>

                            <div className="bg-white p-5 rounded-2xl shadow">
                                ✅ Hire trusted workers
                            </div>

                        </div>

                    </div>

                    {/* Login Card */}

                    <div className="bg-white rounded-3xl shadow-xl p-8">

                        <h2 className="text-3xl font-bold text-center text-slate-800 mb-2">
                            Login
                        </h2>


                        <p className="text-center text-gray-500 mb-8">
                            Access your Daily Wage Connect account
                        </p>

                        <form
                            onSubmit={handleSubmit}
                            className="space-y-5"
                        >

                            <div>

                                <label className="block font-semibold mb-2">
                                    Phone Number
                                </label>

                                <input
                                    type="tel"
                                    name="phone"
                                    value={formData.phone}
                                    onChange={handleChange}
                                    placeholder="Enter phone number"
                                    className="w-full border border-gray-300 rounded-xl p-3 focus:ring-2 focus:ring-blue-400 outline-none"
                                />

                            </div>

                            <div>

                                <label className="block font-semibold mb-2">
                                    Password
                                </label>

                                <div className="relative">

                                    <input
                                        type={
                                            showPassword
                                                ? "text"
                                                : "password"
                                        }
                                        name="password"
                                        value={formData.password}
                                        onChange={handleChange}
                                        placeholder="Enter password"
                                        className="w-full border border-gray-300 rounded-xl p-3 focus:ring-2 focus:ring-blue-400 outline-none"
                                    />

                                    <button
                                        type="button"
                                        onClick={() =>
                                            setShowPassword(
                                                !showPassword
                                            )
                                        }
                                        className="absolute right-4 top-3 text-sm text-blue-600 font-semibold"
                                    >
                                        {showPassword
                                            ? "Hide"
                                            : "Show"}
                                    </button>

                                </div>

                            </div>

                            <button
                                type="submit"
                                disabled={loading}
                                className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-xl font-bold transition-all duration-300 disabled:bg-gray-400"
                            >
                                {loading
                                    ? "Logging In..."
                                    : "Login"}
                            </button>
                            <div className="text-center mt-4">
                                <Link
                                    to="/forgot-password"
                                    className="text-blue-600 font-semibold"
                                >
                                    Forgot Password?
                                </Link>
                            </div>
                        </form>

                        {/* Register Links */}

                        <div className="mt-8 space-y-3">

                            <Link
                                to="/worker-register"
                                className="block text-center bg-green-100 text-green-700 py-3 rounded-xl font-semibold hover:bg-green-200"
                            >
                                Register as Worker
                            </Link>

                            <Link
                                to="/employer-register"
                                className="block text-center bg-yellow-100 text-yellow-700 py-3 rounded-xl font-semibold hover:bg-yellow-200"
                            >
                                Register as Employer
                            </Link>

                        </div>

                    </div>

                </div>

            </div>

        </div>
    );
};

export default Login;