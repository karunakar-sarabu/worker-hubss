import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";

const WorkerDashboard = () => {
    const navigate = useNavigate();

    const [profile, setProfile] = useState(null);
    const [applicationsCount, setApplicationsCount] = useState(0);

    const [stats, setStats] = useState({
        totalApplications: 0,
        acceptedJobs: 0,
        completedJobs: 0,
        rating: 0
    });

    useEffect(() => {
        fetchDashboardData();
        fetchAllStats();
    }, []);

    const fetchAllStats = async () => {
        try {
            const phone = localStorage.getItem("userPhone");

            const response = await axios.get(
                `${import.meta.env.VITE_API_URL}/api/applications/worker-stats/${phone}`
            );

            setStats(response.data);

        } catch (error) {
            console.log(error);
        }
    };

    const fetchDashboardData = async () => {
        try {

            const phone = localStorage.getItem("userPhone");

            const profileResponse = await axios.get(
                `${import.meta.env.VITE_API_URL}/api/profile/worker/${phone}`
            );

            setProfile(profileResponse.data);

            const applicationResponse = await axios.get(
                `${import.meta.env.VITE_API_URL}/api/applications/worker/${phone}`
            );

            setApplicationsCount(
                applicationResponse.data.length
            );

        } catch (error) {
            console.log(error);
        }
    };

    const handleLogout = () => {
        localStorage.clear();
        navigate("/login");
    };

    if (!profile) {
        return (
            <div className="p-6">
                Loading...
            </div>
        );
    }

    const completionFields = [
        profile.name,
        profile.skill,
        profile.location,
        profile.wage,
        profile.experience,
        profile.about,
    ];

    const completionPercentage = Math.round(
        (completionFields.filter(Boolean).length /
            completionFields.length) * 100
    );

    return (
        <div className="min-h-screen bg-gray-100 p-6">

            <div className="max-w-7xl mx-auto">

                {/* Hero Section */}

                <div className="bg-gradient-to-r from-blue-600 to-indigo-700 text-white rounded-3xl shadow-lg p-5 md:p-8 mb-8">

                    <h1 className="text-xl md:text-5xl font-bold mb-3 break-words">
                        👋 Welcome Back, {profile.name}
                    </h1>

                    <p className="text-xl text-blue-100">
                        Manage your jobs, applications and profile from one place.
                    </p>

                </div>

                {/* Main Statistics */}

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">

                    <div className="bg-white p-6 rounded-2xl shadow-md hover:-translate-y-2 hover:shadow-xl transition-all duration-300">
                        <p className="text-gray-500">
                            📄 Applications
                        </p>

                        <h2 className="text-2xl md:text-5xl font-bold text-blue-600 mt-2">
                            {stats.totalApplications}
                        </h2>
                    </div>

                    <div className="bg-white p-6 rounded-2xl shadow-md hover:-translate-y-2 hover:shadow-xl transition-all duration-300">
                        <p className="text-gray-500">
                            ✅ Accepted Jobs
                        </p>

                        <h2 className="text-2xl md:text-5xl font-bold text-green-600 mt-2">
                            {stats.acceptedJobs}
                        </h2>
                    </div>

                    <div className="bg-white p-6 rounded-2xl shadow-md hover:-translate-y-2 hover:shadow-xl transition-all duration-300">
                        <p className="text-gray-500">
                            🏁 Completed Jobs
                        </p>

                        <h2 className="text-2xl md:text-5xl font-bold text-purple-600 mt-2">
                            {stats.completedJobs}
                        </h2>
                    </div>

                    <div className="bg-white p-6 rounded-2xl shadow-md hover:-translate-y-2 hover:shadow-xl transition-all duration-300">
                        <p className="text-gray-500">
                            ⭐ Rating
                        </p>

                        <h2 className="text-2xl md:text-5xl font-bold text-yellow-500 mt-2">
                            {stats.rating}
                        </h2>
                    </div>

                </div>

                {/* Secondary Statistics */}

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">

                    <div className="bg-white p-6 rounded-2xl shadow-md hover:-translate-y-2 hover:shadow-xl transition-all duration-300">

                        <p className="text-gray-500">
                            Profile Completion
                        </p>

                        <h2 className="text-3xl font-bold text-green-600 mt-2">
                            {completionPercentage}%
                        </h2>

                    </div>

                    <div className="bg-white p-6 rounded-2xl shadow-md hover:-translate-y-2 hover:shadow-xl transition-all duration-300">

                        <p className="text-gray-500">
                            Applications Submitted
                        </p>

                        <h2 className="text-3xl font-bold text-blue-600 mt-2">
                            {applicationsCount}
                        </h2>

                    </div>

                    <div className="bg-white p-6 rounded-2xl shadow-md hover:-translate-y-2 hover:shadow-xl transition-all duration-300">

                        <p className="text-gray-500">
                            Experience
                        </p>

                        <h2 className="text-3xl font-bold text-purple-600 mt-2">
                            {profile.experience || 0}
                        </h2>

                        <p className="text-gray-500">
                            Years
                        </p>

                    </div>

                    <div className="bg-white p-6 rounded-2xl shadow-md hover:-translate-y-2 hover:shadow-xl transition-all duration-300">

                        <p className="text-gray-500">
                            Verification
                        </p>

                        <h2 className="text-xl font-bold mt-2">
                            {profile.isAadhaarVerified
                                ? "✅ Verified"
                                : "⏳ Pending"}
                        </h2>

                    </div>

                </div>

                {/* Quick Actions */}

                <div className="mb-6">

                    <h2 className="text-2xl md:text-5xl font-bold text-indigo-700 text-center mb-3">
                        Quick Actions
                    </h2>

                    <p className="text-center text-lg font-semibold text-indigo-400 mb-10">
                        Access important features instantly
                    </p>

                </div>

                <div className="grid grid-cols-1 md:grid-cols-4 gap-6">

                    <div className="bg-white p-6 rounded-2xl shadow-md hover:-translate-y-2 hover:shadow-xl transition-all duration-300">

                        <h3 className="text-2xl font-bold text-blue-600 mb-3">
                            👤 My Profile
                        </h3>

                        <p className="text-gray-600 mb-5">
                            View and update your profile.
                        </p>

                        <Link to="/profile">
                            <button className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-xl">
                                View Profile
                            </button>
                        </Link>

                    </div>

                    <div className="bg-white p-6 rounded-2xl shadow-md hover:-translate-y-2 hover:shadow-xl transition-all duration-300">

                        <h3 className="text-2xl font-bold text-green-600 mb-3">
                            💼 Available Jobs
                        </h3>

                        <p className="text-gray-600 mb-5">
                            View and apply for available jobs.
                        </p>

                        <Link to="/available-jobs">
                            <button className="w-full bg-green-600 hover:bg-green-700 text-white py-3 rounded-xl">
                                View Jobs
                            </button>
                        </Link>

                    </div>

                    <div className="bg-white p-6 rounded-2xl shadow-md hover:-translate-y-2 hover:shadow-xl transition-all duration-300">

                        <h3 className="text-2xl font-bold text-purple-600 mb-3">
                            📄 Applications
                        </h3>

                        <p className="text-gray-600 mb-5">
                            Track application status.
                        </p>

                        <Link to="/my-applications">
                            <button className="w-full bg-purple-600 hover:bg-purple-700 text-white py-3 rounded-xl">
                                View Applications
                            </button>
                        </Link>

                    </div>




                    <div
                        onClick={() => navigate("/career-assistant")}
                        className="bg-gradient-to-r from-indigo-600 to-purple-700 text-white rounded-2xl p-6 shadow-md hover:-translate-y-2 hover:shadow-xl transition-all duration-300 cursor-pointer"
                    >
                        <h3 className="text-2xl font-bold mb-3">
                            🤖 AI Career Assistant
                        </h3>

                        <p className="mb-5">
                            Get career advice, skill suggestions,
                            and tips to earn more money.
                        </p>

                        <button className="w-full bg-white text-indigo-700 font-bold py-3 rounded-xl">
                            Open Assistant
                        </button>
                    </div>
                    <div className="bg-white p-6 rounded-2xl shadow-md hover:-translate-y-2 hover:shadow-xl transition-all duration-300">

                        <h3 className="text-2xl font-bold text-red-600 mb-3">
                            🚪 Logout
                        </h3>

                        <p className="text-gray-600 mb-5">
                            Sign out safely.
                        </p>

                        <button
                            onClick={handleLogout}
                            className="w-full bg-red-600 hover:bg-red-700 text-white py-3 rounded-xl"
                        >
                            Logout
                        </button>

                    </div>

                </div>

            </div>

        </div>
    );
};

export default WorkerDashboard;