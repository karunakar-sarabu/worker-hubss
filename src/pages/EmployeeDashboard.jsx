import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";

const EmployerDashboard = () => {
    const navigate = useNavigate();
    const [jobsCount, setJobsCount] = useState(0);
    const [applicantsCount, setApplicantsCount] = useState(0);
    const [completedJobsCount, setCompletedJobsCount] = useState(0);

    const handleLogout = () => {
        localStorage.clear();
        navigate("/login");
    };

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

            const applicantsResponse =
                await axios.get(
                    `${import.meta.env.VITE_API_URL}/api/applications/employer/count/${phone}`
                );

            setApplicantsCount(
                applicantsResponse.data.count
            );

            const completedResponse =
                await axios.get(
                    `${import.meta.env.VITE_API_URL}/api/applications/employer-stats/${phone}`
                );

            setCompletedJobsCount(
                completedResponse.data.completedJobs
            );

        } catch (error) {
            console.log(error);
        }
    };

    return (
        <div className="min-h-screen bg-gray-100 p-6">

            {/* Welcome Section */}
            <div className="bg-white p-6 rounded-xl shadow mb-8">
                <h1 className="text-4xl font-bold text-blue-700">
                    Employer Dashboard
                </h1>

                <p className="text-gray-600 mt-2">
                    Manage jobs, applicants and company profile.
                </p>
            </div>

            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">

                <div className="bg-white p-6 rounded-xl shadow">
                    <h3 className="text-gray-500">
                        Jobs Posted
                    </h3>

                    <p className="text-3xl font-bold text-blue-600">
                        {jobsCount}
                    </p>
                </div>

                <div className="bg-white p-6 rounded-xl shadow">
                    <h3 className="text-gray-500">
                        Applicants
                    </h3>

                    <p className="text-3xl font-bold text-purple-600">
                        {applicantsCount}
                    </p>
                </div>

                <div className="bg-white p-6 rounded-xl shadow">
                    <h3 className="text-gray-500">
                        Completed Jobs
                    </h3>

                    <p className="text-3xl font-bold text-green-600">
                        {completedJobsCount}
                    </p>
                </div>

            </div>

            {/* Quick Actions */}
            <h2 className="text-2xl font-bold mb-4">
                Quick Actions
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">

                {/* Profile */}
                <div className="bg-white p-6 rounded-xl shadow">
                    <h3 className="text-xl font-semibold mb-2">
                        My Profile
                    </h3>

                    <p className="text-gray-600 mb-4">
                        View and update company details.
                    </p>

                    <Link to="/profile">
                        <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded">
                            View Profile
                        </button>
                    </Link>
                </div>

                {/* Post Job */}
                <div className="bg-white p-6 rounded-xl shadow">
                    <h3 className="text-xl font-semibold mb-2">
                        Post Job
                    </h3>

                    <p className="text-gray-600 mb-4">
                        Create a new job posting.
                    </p>

                    <Link to="/post-job">
                        <button className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded">
                            Post Job
                        </button>
                    </Link>
                </div>

                {/* My Jobs */}
                <div className="bg-white p-6 rounded-xl shadow">
                    <h3 className="text-xl font-semibold mb-2">
                        My Jobs
                    </h3>

                    <p className="text-gray-600 mb-4">
                        View all jobs posted by you.
                    </p>

                    <Link to="/my-jobs">
                        <button className="bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded">
                            View Jobs
                        </button>
                    </Link>
                </div>


                <Link to="/browse-workers">
                    <button className="bg-green-600 text-white px-4 py-2 rounded">
                        Browse Workers
                    </button>
                </Link>

                {/* Applicants */}
                <div className="bg-white p-6 rounded-xl shadow">
                    <h3 className="text-xl font-semibold mb-2">
                        Applicants
                    </h3>

                    <p className="text-gray-600 mb-4">
                        Review worker applications.
                    </p>

                    <Link to="/applicants">
                        <button className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded">
                            View Applicants
                        </button>
                    </Link>
                </div>

            </div>

            {/* Logout */}
            <div className="mt-8">
                <button
                    onClick={handleLogout}
                    className="bg-red-600 hover:bg-red-700 text-white px-6 py-3 rounded-lg"
                >
                    Logout
                </button>
            </div>

        </div>
    );
};

export default EmployerDashboard;