import React, { useEffect, useState } from "react";
import axios from "axios";

const Applicants = () => {

    const [applications, setApplications] = useState([]);

    useEffect(() => {

        fetchApplications();

    }, []);

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








    const fetchApplications = async () => {

        try {

            console.log(
                "Calling:",
                `${import.meta.env.VITE_API_URL}/api/applications`
            );
            const response = await axios.get(
                `${import.meta.env.VITE_API_URL}/api/applications`
            );
            console.log(response.data);
            setApplications(response.data);

        } catch (error) {

            console.log(error);

        }
    };

    const updateStatus = async (id, status) => {

        try {

            const response = await axios.put(
                `${import.meta.env.VITE_API_URL}/api/applications/${id}`,
                { status }
            );

            // alert(response.data.message);

            fetchApplications();

        } catch (error) {

            alert(
                error.response?.data?.message ||
                "Something went wrong"
            );

        }
    };

    return (
        <div className="min-h-screen bg-gray-100 p-6">

            <h1 className="text-3xl font-bold mb-6">
                Applicants
            </h1>

            <div className="space-y-4">

                {applications.map((app) => (

                    <div
                        key={app._id}
                        className="bg-white p-4 rounded-lg shadow"
                    >

                        <p>
                            <strong>Worker Phone:</strong>
                            {" "}
                            {app.workerPhone}
                        </p>

                        <p>
                            <strong>Name:</strong>
                            {app.workerName}
                        </p>

                        <p>
                            <strong>Skill:</strong>
                            {app.skill}
                        </p>

                        <p>
                            <strong>Location:</strong>
                            {app.location}
                        </p>

                        <p>
                            <strong>Experience:</strong>
                            {app.experience} Years
                        </p>
                        <p>
                            <strong>Rating:</strong>{" "}
                            ⭐ {app.rating || 0}
                        </p>
                        <div className="flex gap-2 mt-2">

                            {app.isMobileVerified && (
                                <span className="bg-green-100 text-green-700 px-2 py-1 rounded text-sm">
                                    📱 Mobile Verified
                                </span>
                            )}

                            {app.isAadhaarVerified && (
                                <span className="bg-blue-100 text-blue-700 px-2 py-1 rounded text-sm">
                                    🪪 Aadhaar Verified
                                </span>
                            )}

                        </div>
                        <p>
                            <strong>Job Title:</strong>
                            {app.jobTitle}
                        </p>


                        <p>
                            <strong>Status:</strong>{" "}

                            <span
                                className={`px-3 py-1 rounded-full text-sm font-semibold ${app.status === "Accepted"
                                    ? "bg-green-100 text-green-700"
                                    : app.status === "Rejected"
                                        ? "bg-red-100 text-red-700"
                                        : "bg-yellow-100 text-yellow-700"
                                    }`}
                            >
                                {app.status}
                            </span>
                        </p>


                        {app.status === "Accepted" && (
                            <p>
                                <strong>Completed:</strong>{" "}

                                {app.isCompleted ? (
                                    <span className="text-green-600 font-bold">
                                        ✅ Completed
                                    </span>
                                ) : (
                                    <span className="text-gray-500">
                                        Not Completed
                                    </span>
                                )}
                            </p>
                        )}

                        {app.isRated && (
                            <p className="text-green-600 font-bold mt-2">
                                ⭐ Worker Rated
                            </p>
                        )}

                        {app.isCompleted && !app.isRated && (
                            <div className="mt-3 flex gap-2">

                                <button
                                    onClick={() => rateWorker(app._id, 1)}
                                    className="bg-yellow-500 text-white px-2 py-1 rounded"
                                >
                                    ⭐1
                                </button>

                                <button
                                    onClick={() => rateWorker(app._id, 2)}
                                    className="bg-yellow-500 text-white px-2 py-1 rounded"
                                >
                                    ⭐2
                                </button>

                                <button
                                    onClick={() => rateWorker(app._id, 3)}
                                    className="bg-yellow-500 text-white px-2 py-1 rounded"
                                >
                                    ⭐3
                                </button>

                                <button
                                    onClick={() => rateWorker(app._id, 4)}
                                    className="bg-yellow-500 text-white px-2 py-1 rounded"
                                >
                                    ⭐4
                                </button>

                                <button
                                    onClick={() => rateWorker(app._id, 5)}
                                    className="bg-yellow-500 text-white px-2 py-1 rounded"
                                >
                                    ⭐5
                                </button>

                            </div>
                        )}
                        <div className="mt-4 flex gap-2">

                            <button
                                onClick={() => updateStatus(app._id, "Accepted")}
                                className="bg-green-600 text-white px-4 py-2 rounded"
                            >
                                Accept
                            </button>

                            <button
                                onClick={() => updateStatus(app._id, "Rejected")}
                                className="bg-red-600 text-white px-4 py-2 rounded"
                            >
                                Reject
                            </button>

                            {/* <button
                                onClick={() => markCompleted(app._id)}
                                className="bg-blue-600 text-white px-4 py-2 rounded"
                            >
                                Complete Job
                            </button> */}

                            {app.status === "Accepted" && !app.isCompleted && (
                                <button
                                    onClick={() => markCompleted(app._id)}
                                    className="bg-blue-600 text-white px-4 py-2 rounded"
                                >
                                    Complete Job
                                </button>
                            )}
                        </div>
                    </div>


                ))}

            </div>

        </div>
    );
};

export default Applicants;