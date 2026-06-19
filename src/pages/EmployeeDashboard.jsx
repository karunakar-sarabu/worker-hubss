import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

const EmployerDashboard = () => {
    const navigate = useNavigate();

    const [jobsCount, setJobsCount] = useState(0);
    const [applicantsCount, setApplicantsCount] = useState(0);
    const [completedJobsCount, setCompletedJobsCount] = useState(0);
    const [companyName, setCompanyName] = useState("");

    useEffect(() => {
        fetchStats();
    }, []);

    const fetchStats = async () => {
        try {
            const phone = localStorage.getItem("userPhone");

            const response = await axios.get(
                `${import.meta.env.VITE_API_URL}/api/jobs/count/${phone}`
            );

            setJobsCount(response.data.count);

            const applicantsResponse = await axios.get(
                `${import.meta.env.VITE_API_URL}/api/applications/employer/count/${phone}`
            );

            setApplicantsCount(applicantsResponse.data.count);

            const completedResponse = await axios.get(
                `${import.meta.env.VITE_API_URL}/api/applications/employer-stats/${phone}`
            );

            setCompletedJobsCount(
                completedResponse.data.completedJobs
            );
            
            const employerResponse = await axios.get(
                `${import.meta.env.VITE_API_URL}/api/employers/${phone}`
            );
            
            setCompanyName(
                employerResponse.data.companyName
            );
            
            
        } catch (error) {
            console.log(error);
        }
    };

    const handleLogout = () => {
        localStorage.clear();
        navigate("/login");
    };

    return (
        <div className="min-h-screen bg-gray-100 p-6">

            <div className="max-w-7xl mx-auto">

                {/* Hero Section */}

                <div className="bg-gradient-to-r from-green-600 to-emerald-700 text-white rounded-3xl shadow-lg p-8 mb-10">

                    <h1 className="text-xl  md:text-5xl font-bold mb-3">
                        🏢 Welcome, {companyName || "Employer"}
                    </h1>

                    <p className="text-lg md:text-xl text-green-100">
                        Manage jobs, applicants and workforce from one place.
                    </p>

                </div>

                {/* Statistics */}

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">

                    <div className="bg-white p-6 rounded-2xl shadow-md hover:-translate-y-2 hover:shadow-xl transition-all duration-300">

                        <p className="text-gray-500 text-sm">
                            📢 Jobs Posted
                        </p>

                        <h2 className="text-4xl font-bold text-blue-600 mt-3">
                            {jobsCount}
                        </h2>

                    </div>

                    <div className="bg-white p-6 rounded-2xl shadow-md hover:-translate-y-2 hover:shadow-xl transition-all duration-300">

                        <p className="text-gray-500 text-sm">
                            👷 Applicants
                        </p>

                        <h2 className="text-4xl font-bold text-purple-600 mt-3">
                            {applicantsCount}
                        </h2>

                    </div>

                    <div className="bg-white p-6 rounded-2xl shadow-md hover:-translate-y-2 hover:shadow-xl transition-all duration-300">

                        <p className="text-gray-500 text-sm">
                            ✅ Completed Jobs
                        </p>

                        <h2 className="text-4xl font-bold text-green-600 mt-3">
                            {completedJobsCount}
                        </h2>

                    </div>

                </div>

                {/* Quick Actions */}

                <div className="text-center mb-10">

                    <h2 className="text-4xl font-bold text-indigo-700 mb-3">
                        Quick Actions
                    </h2>

                    <p className="text-lg font-semibold text-indigo-400">
                        Manage your jobs and workers efficiently
                    </p>

                </div>

                {/* Action Cards */}

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">

                    {/* Profile */}

                    <div className="bg-white p-6 rounded-2xl shadow-md flex flex-col hover:-translate-y-2 hover:shadow-xl transition-all duration-300">

                        <h3 className="text-2xl font-bold text-blue-600 mb-3">
                            👤 Profile
                        </h3>

                        <p className="text-gray-600 min-h-[60px]">
                            View and update company profile.
                        </p>

                        <div className="mt-auto">
                            <Link to="/profile">
                                <button className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-xl">
                                    View Profile
                                </button>
                            </Link>
                        </div>

                    </div>

                    {/* Post Job */}

                    <div className="bg-white p-6 rounded-2xl shadow-md flex flex-col hover:-translate-y-2 hover:shadow-xl transition-all duration-300">

                        <h3 className="text-2xl font-bold text-green-600 mb-3">
                            ➕ Post Job
                        </h3>

                        <p className="text-gray-600 min-h-[60px]">
                            Create and publish a new job posting.
                        </p>

                        <div className="mt-auto">
                            <Link to="/post-job">
                                <button className="w-full bg-green-600 hover:bg-green-700 text-white py-3 rounded-xl">
                                    Post Job
                                </button>
                            </Link>
                        </div>

                    </div>

                    {/* My Jobs */}

                    <div className="bg-white p-6 rounded-2xl shadow-md flex flex-col hover:-translate-y-2 hover:shadow-xl transition-all duration-300">

                        <h3 className="text-2xl font-bold text-purple-600 mb-3">
                            📄 My Jobs
                        </h3>

                        <p className="text-gray-600 min-h-[60px]">
                            View, edit and manage all posted jobs.
                        </p>

                        <div className="mt-auto">
                            <Link to="/my-jobs">
                                <button className="w-full bg-purple-600 hover:bg-purple-700 text-white py-3 rounded-xl">
                                    View Jobs
                                </button>
                            </Link>
                        </div>

                    </div>

                    {/* Browse Workers */}

                    <div className="bg-white p-6 rounded-2xl shadow-md flex flex-col hover:-translate-y-2 hover:shadow-xl transition-all duration-300">

                        <h3 className="text-2xl font-bold text-orange-600 mb-3">
                            👷 Workers
                        </h3>

                        <p className="text-gray-600 min-h-[60px]">
                            Browse and hire skilled workers.
                        </p>

                        <div className="mt-auto">
                            <Link to="/browse-workers">
                                <button className="w-full bg-orange-600 hover:bg-orange-700 text-white py-3 rounded-xl">
                                    Browse Workers
                                </button>
                            </Link>
                        </div>

                    </div>

                    {/* Applicants */}

                    <div className="bg-white p-6 rounded-2xl shadow-md flex flex-col hover:-translate-y-2 hover:shadow-xl transition-all duration-300">

                        <h3 className="text-2xl font-bold text-indigo-600 mb-3">
                            📋 Applicants
                        </h3>

                        <p className="text-gray-600 min-h-[60px]">
                            Review worker applications and hiring status.
                        </p>

                        <div className="mt-auto">
                            <Link to="/applicants">
                                <button className="w-full bg-indigo-600 hover:bg-indigo-700 text-white py-3 rounded-xl">
                                    View Applicants
                                </button>
                            </Link>
                        </div>

                    </div>

                </div>

                {/* Logout */}

                <div className="text-center mt-12">

                    <button
                        onClick={handleLogout}
                        className="bg-red-600 hover:bg-red-700 text-white px-8 py-3 rounded-xl text-lg font-semibold shadow-md"
                    >
                        🚪 Logout
                    </button>

                </div>

            </div>

        </div>
    );
};

export default EmployerDashboard;