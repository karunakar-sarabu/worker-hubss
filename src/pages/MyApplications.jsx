import React, { useEffect, useState } from "react";
import axios from "axios";

const MyApplications = () => {

    const [applications, setApplications] = useState([]);
    const [reviews, setReviews] = useState({});

    useEffect(() => {
        fetchMyApplications();
    }, []);

    const fetchMyApplications = async () => {

        try {

            const workerPhone =
                localStorage.getItem("userPhone");

            const response = await axios.get(
                `${import.meta.env.VITE_API_URL}/api/applications/worker/${workerPhone}`
            );

            setApplications(response.data);

        } catch (error) {

            console.log(error);

        }

    };

    const rateEmployer = async (
        applicationId,
        rating
    ) => {

        try {

            await axios.put(
                `${import.meta.env.VITE_API_URL}/api/applications/rate-employer/${applicationId}`,
                {
                    rating,
                    review:
                        reviews[applicationId] || ""
                }
            );

            alert("Employer review submitted successfully");

            fetchMyApplications();

        } catch (error) {

            console.log(error);

        }

    };

    const acceptedCount =
        applications.filter(
            (app) => app.status === "Accepted"
        ).length;

    const pendingCount =
        applications.filter(
            (app) => app.status === "Pending"
        ).length;

    const rejectedCount =
        applications.filter(
            (app) => app.status === "Rejected"
        ).length;

    return (
        <div className="min-h-screen bg-gray-100 p-6">

            <div className="max-w-7xl mx-auto">

                {/* Hero */}

                <div className="bg-gradient-to-r from-purple-600 to-indigo-700 text-white rounded-3xl shadow-lg p-8 mb-10">

                    <h1 className="text-4xl md:text-5xl font-bold mb-3">
                        📄 My Applications
                    </h1>

                    <p className="text-lg md:text-xl text-purple-100">
                        Track your job applications and hiring progress.
                    </p>

                </div>

                {/* Statistics */}

                <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-10">

                    <div className="bg-white p-6 rounded-2xl shadow-md hover:-translate-y-2 hover:shadow-xl transition-all duration-300">

                        <p className="text-gray-500">
                            Total Applications
                        </p>

                        <h2 className="text-4xl font-bold text-blue-600 mt-2">
                            {applications.length}
                        </h2>

                    </div>

                    <div className="bg-white p-6 rounded-2xl shadow-md hover:-translate-y-2 hover:shadow-xl transition-all duration-300">

                        <p className="text-gray-500">
                            Accepted
                        </p>

                        <h2 className="text-4xl font-bold text-green-600 mt-2">
                            {acceptedCount}
                        </h2>

                    </div>

                    <div className="bg-white p-6 rounded-2xl shadow-md hover:-translate-y-2 hover:shadow-xl transition-all duration-300">

                        <p className="text-gray-500">
                            Pending
                        </p>

                        <h2 className="text-4xl font-bold text-yellow-500 mt-2">
                            {pendingCount}
                        </h2>

                    </div>

                    <div className="bg-white p-6 rounded-2xl shadow-md hover:-translate-y-2 hover:shadow-xl transition-all duration-300">

                        <p className="text-gray-500">
                            Rejected
                        </p>

                        <h2 className="text-4xl font-bold text-red-500 mt-2">
                            {rejectedCount}
                        </h2>

                    </div>

                </div>

                {/* Applications */}

                {applications.length === 0 ? (

                    <div className="bg-white rounded-3xl shadow-lg p-12 text-center">

                        <h2 className="text-3xl font-bold text-gray-700">
                            No Applications Yet
                        </h2>

                        <p className="text-gray-500 mt-3">
                            Browse available jobs and start applying.
                        </p>

                    </div>

                ) : (

                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">

                        {applications.map((app) => (

                            <div
                                key={app._id}
                                className="bg-white rounded-3xl shadow-md p-6 hover:-translate-y-2 hover:shadow-xl transition-all duration-300"
                            >

                                <div className="flex justify-between items-start mb-4">

                                    <h2 className="text-2xl font-bold text-slate-800">
                                        {app.jobTitle}
                                    </h2>

                                    <span
                                        className={`px-4 py-2 rounded-full font-semibold text-sm
                                        ${app.status === "Accepted"
                                                ? "bg-green-100 text-green-700"
                                                : app.status === "Rejected"
                                                    ? "bg-red-100 text-red-700"
                                                    : "bg-yellow-100 text-yellow-700"
                                            }`}
                                    >
                                        {app.status}
                                    </span>

                                </div>

                                {app.status === "Accepted" && (

                                    <div className="mb-4">

                                        <p className="font-semibold">

                                            Job Completion :

                                            {app.isCompleted ? (
                                                <span className="text-green-600 ml-2">
                                                    ✅ Completed
                                                </span>
                                            ) : (
                                                <span className="text-gray-500 ml-2">
                                                    ⏳ In Progress
                                                </span>
                                            )}

                                        </p>

                                    </div>

                                )}

                                {app.status === "Accepted" &&
                                    app.isCompleted &&
                                    !app.isEmployerRated && (

                                        <div className="mt-4 border-t pt-5">

                                            <h3 className="text-xl font-bold text-orange-600 mb-3">
                                                ⭐ Rate Employer
                                            </h3>

                                            <textarea
                                                placeholder="Share your experience..."
                                                value={reviews[app._id] || ""}
                                                onChange={(e) =>
                                                    setReviews({
                                                        ...reviews,
                                                        [app._id]:
                                                            e.target.value
                                                    })
                                                }
                                                className="w-full border border-gray-300 rounded-xl p-3 mb-4 focus:ring-2 focus:ring-orange-400 outline-none"
                                            />

                                            <div className="flex flex-wrap gap-2">

                                                {[1, 2, 3, 4, 5].map(
                                                    (star) => (

                                                        <button
                                                            key={star}
                                                            onClick={() =>
                                                                rateEmployer(
                                                                    app._id,
                                                                    star
                                                                )
                                                            }
                                                            className="bg-yellow-400 hover:bg-yellow-500 px-4 py-2 rounded-xl font-semibold transition"
                                                        >
                                                            ⭐ {star}
                                                        </button>

                                                    )
                                                )}

                                            </div>

                                        </div>

                                    )}

                                {app.isEmployerRated && (

                                    <div className="mt-4 border-t pt-4">

                                        <p className="text-green-600 font-bold text-lg">
                                            ✅ Employer Already Rated
                                        </p>

                                        <p className="text-gray-500 text-sm">
                                            Thank you for your feedback.
                                        </p>

                                    </div>

                                )}

                            </div>

                        ))}

                    </div>

                )}

            </div>

        </div>
    );
};

export default MyApplications;