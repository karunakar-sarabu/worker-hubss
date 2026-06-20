import React, { useEffect, useState } from "react";
import axios from "axios";

const Applicants = () => {
    const [applications, setApplications] = useState([]);

    useEffect(() => {
        fetchApplications();
    }, []);

    const fetchApplications = async () => {
        try {
            const employerPhone =
                localStorage.getItem("userPhone");

            const response = await axios.get(
                `${import.meta.env.VITE_API_URL}/api/applications/${employerPhone}`
            );
            console.log(response.data)
            setApplications(response.data);
        } catch (error) {
            console.log(error);
        }
    };

    const updateStatus = async (id, status) => {
        try {
            await axios.put(
                `${import.meta.env.VITE_API_URL}/api/applications/${id}`,
                { status }
            );

            fetchApplications();
        } catch (error) {
            alert(
                error.response?.data?.message ||
                "Something went wrong"
            );
        }
    };

    const markCompleted = async (id) => {
        try {
            await axios.put(
                `${import.meta.env.VITE_API_URL}/api/applications/complete/${id}`
            );

            fetchApplications();
        } catch (error) {
            alert(
                error.response?.data?.message ||
                "Something went wrong"
            );
        }
    };

    const rateWorker = async (applicationId, rating) => {
        try {
            await axios.put(
                `${import.meta.env.VITE_API_URL}/api/applications/rate/${applicationId}`,
                { rating }
            );

            alert("Rating submitted");

            fetchApplications();
        } catch (error) {
            alert(
                error.response?.data?.message ||
                "Failed to submit rating"
            );
        }
    };

    const totalApplicants = applications.length;

    const acceptedApplicants = applications.filter(
        (app) => app.status === "Accepted"
    ).length;

    const pendingApplicants = applications.filter(
        (app) => app.status === "Pending"
    ).length;

    const completedJobs = applications.filter(
        (app) => app.isCompleted
    ).length;

    return (
        <div className="min-h-screen bg-gray-100 p-6">

            {/* Hero Section */}

            <div className="max-w-6xl mx-auto">

                <div className="bg-gradient-to-r from-green-600 to-emerald-700 text-white p-8 rounded-3xl shadow-xl mb-8">
                    <h1 className="text-4xl md:text-5xl font-bold">
                        👥 Applicants Management
                    </h1>

                    <p className="mt-3 text-lg text-green-100">
                        Review workers and manage hiring decisions efficiently.
                    </p>
                </div>

                {/* Stats Cards */}

                <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-10">

                    <div className="bg-white p-5 rounded-2xl shadow">
                        <p className="text-gray-500">
                            Total Applicants
                        </p>

                        <h2 className="text-3xl font-bold text-blue-600 mt-2">
                            {totalApplicants}
                        </h2>
                    </div>

                    <div className="bg-white p-5 rounded-2xl shadow">
                        <p className="text-gray-500">
                            Accepted
                        </p>

                        <h2 className="text-3xl font-bold text-green-600 mt-2">
                            {acceptedApplicants}
                        </h2>
                    </div>

                    <div className="bg-white p-5 rounded-2xl shadow">
                        <p className="text-gray-500">
                            Pending
                        </p>

                        <h2 className="text-3xl font-bold text-yellow-500 mt-2">
                            {pendingApplicants}
                        </h2>
                    </div>

                    <div className="bg-white p-5 rounded-2xl shadow">
                        <p className="text-gray-500">
                            Completed Jobs
                        </p>

                        <h2 className="text-3xl font-bold text-purple-600 mt-2">
                            {completedJobs}
                        </h2>
                    </div>

                </div>

                {/* Applicants Grid */}

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">

                    {applications.map((app) => (

                        <div
                            key={app._id}
                            className="bg-white rounded-2xl shadow-md p-6 hover:-translate-y-2 hover:shadow-xl transition-all duration-300 flex flex-col h-full"                        >

                            <h2 className="text-2xl font-bold text-slate-800 mb-4">
                                👤 {app.workerName}
                            </h2>

                            <div className="space-y-2 text-gray-700">

                                <p>
                                    📞 {app.workerPhone}
                                </p>

                                <p>
                                    🛠 {app.skill}
                                </p>

                                <p>
                                    📍 {app.location}
                                </p>

                                <p>
                                    ⏳ {app.experience} Years Experience
                                </p>

                                <p className="font-semibold text-yellow-600">
                                    ⭐ {Number(app.rating || 0).toFixed(1)}
                                </p>

                            </div>

                            {/* Verification */}

                            <div className="flex flex-wrap gap-2 mt-4">

                                {app.isMobileVerified && (
                                    <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-sm font-semibold">
                                        📱 Mobile Verified
                                    </span>
                                )}

                                {app.isAadhaarVerified && (
                                    <span className="bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-sm font-semibold">
                                        🪪 Aadhaar Verified
                                    </span>
                                )}

                            </div>

                            {/* Job Info */}

                            <div className="border-t mt-4 pt-4">

                                <p className="font-semibold">
                                    Job:
                                </p>

                                <p className="text-gray-600">
                                    {app.jobTitle}
                                </p>

                            </div>

                            {/* Status */}

                            <div className="mt-4">

                                <span
                                    className={`px-4 py-2 rounded-full text-sm font-bold ${app.status === "Accepted"
                                        ? "bg-green-100 text-green-700"
                                        : app.status === "Rejected"
                                            ? "bg-red-100 text-red-700"
                                            : "bg-yellow-100 text-yellow-700"
                                        }`}
                                >
                                    {app.status}
                                </span>

                            </div>

                            {/* Completion */}

                            {app.status === "Accepted" && (
                                <div className="mt-4">

                                    {app.isCompleted ? (
                                        <p className="text-green-600 font-bold">
                                            ✅ Job Completed
                                        </p>
                                    ) : (
                                        <p className="text-gray-500">
                                            Job Not Completed
                                        </p>
                                    )}

                                </div>
                            )}

                            {/* Worker Rating */}

                            {app.isRated && (
                                <div className="mt-4">
                                    <p className="text-green-600 font-bold">
                                        ⭐ Worker Already Rated
                                    </p>
                                </div>
                            )}

                            {app.isCompleted && !app.isRated && (
                                <div className="mt-4">

                                    <h3 className="font-bold text-orange-600 mb-2">
                                        Rate Worker
                                    </h3>

                                    <div className="flex flex-wrap gap-2">

                                        {[1, 2, 3, 4, 5].map((star) => (
                                            <button
                                                key={star}
                                                onClick={() =>
                                                    rateWorker(
                                                        app._id,
                                                        star
                                                    )
                                                }
                                                className="bg-yellow-400 hover:bg-yellow-500 px-3 py-2 rounded-lg font-semibold"
                                            >
                                                ⭐ {star}
                                            </button>
                                        ))}

                                    </div>

                                </div>
                            )}

                            {/* Actions */}

                            <div className="grid grid-cols-2 gap-3 mt-auto pt-6">

                                <button
                                    onClick={() =>
                                        updateStatus(
                                            app._id,
                                            "Accepted"
                                        )
                                    }
                                    className="bg-green-600 hover:bg-green-700 text-white py-2 rounded-xl font-semibold"
                                >
                                    ✅ Accept
                                </button>

                                <button
                                    onClick={() =>
                                        updateStatus(
                                            app._id,
                                            "Rejected"
                                        )
                                    }
                                    className="bg-red-600 hover:bg-red-700 text-white py-2 rounded-xl font-semibold"
                                >
                                    ❌ Reject
                                </button>

                            </div>

                            {app.status === "Accepted" &&
                                !app.isCompleted && (
                                    <button
                                        onClick={() =>
                                            markCompleted(
                                                app._id
                                            )
                                        }
                                        className="w-full mt-3 bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-xl font-semibold"
                                    >
                                        🏁 Complete Job
                                    </button>
                                )}

                        </div>

                    ))}

                </div>

            </div>

        </div>
    );
};

export default Applicants;