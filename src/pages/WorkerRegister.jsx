import React, { useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const WorkerRegister = () => {
    const [showPassword, setShowPassword] = useState(false);
    const [loading, setLoading] = useState(false);
    const [registrationSuccess, setRegistrationSuccess] = useState(false);

    const [formData, setFormData] = useState({
        name: "",
        phone: "",
        skills: [],
        location: "",
        wage: "",
        password: ""
    });

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };


    const handleSkillChange = (skill) => {

        if (formData.skills.includes(skill)) {

            setFormData({
                ...formData,
                skills: formData.skills.filter(
                    (s) => s !== skill
                ),
            });

        } else {

            setFormData({
                ...formData,
                skills: [...formData.skills, skill],
            });

        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (
            !formData.name ||
            !formData.phone ||
            formData.skills.length === 0 ||
            !formData.location ||
            !formData.wage ||
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
            console.log(formData);
            // await axios.post(
            //     `${import.meta.env.VITE_API_URL}/api/workers/register`,
            //     formData
            // );
            const response = await axios.post(
                `${import.meta.env.VITE_API_URL}/api/workers/register`,
                formData
            );

            console.log(response.data);

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
                        ✅
                    </div>

                    <h1 className="text-3xl font-bold text-green-600 mb-4">
                        Registration Successful
                    </h1>

                    <p className="text-gray-600 mb-8">
                        Welcome to Daily Wage Connect.
                        Your worker account has been created successfully.
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

            {/* Hero Section */}

            <div className="bg-gradient-to-r from-green-600 to-emerald-600 text-white py-12 px-6">

                <div className="max-w-6xl mx-auto text-center">

                    <h1 className="text-4xl md:text-5xl font-bold">
                        Worker Registration
                    </h1>

                    <p className="mt-4 text-lg text-green-100">
                        Join Daily Wage Connect and discover more job opportunities.
                    </p>

                </div>

            </div>

            <div className="max-w-6xl mx-auto px-6 py-10">

                <div className="grid lg:grid-cols-2 gap-10 items-center">

                    {/* Left Side */}

                    <div className="hidden lg:block">

                        <h2 className="text-4xl font-bold text-slate-800 mb-6">
                            Build Your Career
                        </h2>

                        <p className="text-lg text-gray-600 mb-8">
                            Create your profile and connect with employers looking for skilled workers.
                        </p>

                        <div className="space-y-4">

                            <div className="bg-white p-5 rounded-2xl shadow">
                                ✅ Apply for jobs easily
                            </div>

                            <div className="bg-white p-5 rounded-2xl shadow">
                                ✅ Get discovered by employers
                            </div>

                            <div className="bg-white p-5 rounded-2xl shadow">
                                ✅ Build your worker profile
                            </div>

                            <div className="bg-white p-5 rounded-2xl shadow">
                                ✅ Connect through WhatsApp
                            </div>

                        </div>

                    </div>

                    {/* Registration Form */}

                    <div className="bg-white rounded-3xl shadow-xl p-8">

                        <h2 className="text-3xl font-bold text-center mb-2">
                            Register as Worker
                        </h2>

                        <p className="text-center text-gray-500 mb-8">
                            Create your worker account
                        </p>

                        <form
                            onSubmit={handleSubmit}
                            className="space-y-5"
                        >

                            <input
                                type="text"
                                name="name"
                                placeholder="Full Name"
                                value={formData.name}
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

                            <div className="space-y-2">

                                <label className="font-semibold">
                                    Select Skills
                                </label>

                                {[
                                    "Construction",
                                    "Agriculture",
                                    "Electrician",
                                    "Plumber",
                                    "Painter",
                                    "Carpenter",
                                ].map((skill) => (

                                    <label
                                        key={skill}
                                        className="flex items-center gap-2"
                                    >
                                        <input
                                            type="checkbox"
                                            checked={formData.skills.includes(skill)}
                                            onChange={() =>
                                                handleSkillChange(skill)
                                            }
                                        />

                                        {skill}
                                    </label>

                                ))}
                            </div>
                            <input
                                type="text"
                                name="location"
                                placeholder="Location"
                                value={formData.location}
                                onChange={handleChange}
                                className="w-full border border-gray-300 rounded-xl p-3"
                            />

                            <input
                                type="number"
                                name="wage"
                                placeholder="Expected Daily Wage"
                                value={formData.wage}
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
                                className="w-full bg-green-600 hover:bg-green-700 text-white py-3 rounded-xl font-bold disabled:bg-gray-400"
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

export default WorkerRegister;