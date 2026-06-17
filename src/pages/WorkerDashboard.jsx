import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";



const WorkerDashboard = () => {
    const navigate = useNavigate();

    const [profile, setProfile] = useState(null);
    const [applicationsCount, setApplicationsCount] = useState(0);
    const [reviews, setReviews] = useState([]);

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

            const phone =
                localStorage.getItem("userPhone");

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

            setApplicationsCount(applicationResponse.data.length);
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        fetchStats();
    }, []);

    const fetchStats = async () => {
        try {

            const phone =
                localStorage.getItem("userPhone");

            const response =
                await axios.get(
                    `${import.meta.env.VITE_API_URL}/api/applications/count/${phone}`
                );

            setApplicationsCount(
                response.data.count
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
            completionFields.length) *
        100
    );

    return (
        <div className="min-h-screen bg-gray-100 p-6">

            <div className="max-w-6xl mx-auto">

                <div className="bg-white rounded-lg shadow p-6 mb-6">

                    <h1 className="text-3xl font-bold">
                        Welcome {profile.name} 👋
                    </h1>

                    <p className="text-gray-600 mt-2">
                        Manage your profile and job applications.
                    </p>

                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">

                        <div className="bg-white p-4 rounded shadow">
                            <p className="text-gray-500">
                                Applications
                            </p>

                            <h2 className="text-2xl font-bold">
                                {stats.totalApplications}
                            </h2>
                        </div>

                        <div className="bg-white p-4 rounded shadow">
                            <p className="text-gray-500">
                                Accepted
                            </p>

                            <h2 className="text-2xl font-bold">
                                {stats.acceptedJobs}
                            </h2>
                        </div>

                        <div className="bg-white p-4 rounded shadow">
                            <p className="text-gray-500">
                                Completed
                            </p>

                            <h2 className="text-2xl font-bold">
                                {stats.completedJobs}
                            </h2>
                        </div>

                        <div className="bg-white p-4 rounded shadow">
                            <p className="text-gray-500">
                                Rating
                            </p>

                            <h2 className="text-2xl font-bold">
                                ⭐ {stats.rating}
                            </h2>
                        </div>

                    </div>
                </div>

                {/* Statistics */}

                <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">

                    <div className="bg-white p-6 rounded-lg shadow">
                        <h2 className="text-gray-500 text-sm">
                            Profile Completion
                        </h2>

                        <p className="text-3xl font-bold text-green-600 mt-2">
                            {completionPercentage}%
                        </p>
                    </div>

                    <div className="bg-white p-6 rounded-lg shadow">
                        <h2 className="text-gray-500 text-sm">
                            Applications Submitted
                        </h2>

                        <p className="text-3xl font-bold text-blue-600 mt-2">
                            {applicationsCount}
                        </p>
                    </div>

                    <div className="bg-white p-6 rounded-lg shadow">
                        <h2 className="text-gray-500 text-sm">
                            Experience
                        </h2>

                        <p className="text-3xl font-bold text-purple-600 mt-2">
                            {profile.experience || 0}
                        </p>

                        <p className="text-sm text-gray-500">
                            Years
                        </p>
                    </div>

                    <div className="bg-white p-6 rounded-lg shadow">
                        <h2 className="text-gray-500 text-sm">
                            Verification
                        </h2>

                        <p className="text-lg font-bold mt-2">
                            {profile.isAadhaarVerified
                                ? "✅ Verified"
                                : "⏳ Pending"}
                        </p>
                    </div>

                </div>

                {/* Quick Actions */}

                <h2 className="text-2xl font-bold mb-4">
                    Quick Actions
                </h2>

                <div className="grid grid-cols-1 md:grid-cols-4 gap-6">

                    <div className="bg-white p-6 rounded-lg shadow">
                        <h3 className="text-xl font-semibold mb-2">
                            My Profile
                        </h3>

                        <p className="text-gray-600 mb-4">
                            View and update your profile.
                        </p>

                        <Link to="/profile">
                            <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg">
                                View Profile
                            </button>
                        </Link>
                    </div>

                    <div className="bg-white p-6 rounded-lg shadow">
                        <h3 className="text-xl font-semibold mb-2">
                            Available Jobs
                        </h3>

                        <p className="text-gray-600 mb-4">
                            Browse jobs posted by employers.
                        </p>

                        <Link to="/available-jobs">
                            <button className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg">
                                Browse Jobs
                            </button>
                        </Link>
                    </div>

                    <div className="bg-white p-6 rounded-lg shadow">
                        <h3 className="text-xl font-semibold mb-2">
                            My Applications
                        </h3>

                        <p className="text-gray-600 mb-4">
                            Track your application status.
                        </p>

                        <Link to="/my-applications">
                            <button className="bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-lg">
                                View Applications
                            </button>
                        </Link>
                    </div>

                    <div className="bg-white p-6 rounded-lg shadow">
                        <h3 className="text-xl font-semibold mb-2">
                            Logout
                        </h3>

                        <p className="text-gray-600 mb-4">
                            Sign out of your account.
                        </p>

                        <button
                            onClick={handleLogout}
                            className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg"
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