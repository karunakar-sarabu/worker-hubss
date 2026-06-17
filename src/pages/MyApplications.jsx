import React, { useEffect, useState } from "react";
import axios from "axios";

const MyApplications = () => {
    console.log("MyApplications component rendered");
    const [applications, setApplications] = useState([]);
    const [reviews, setReviews] = useState({});
    useEffect(() => {

        fetchMyApplications();

    }, []);

    const fetchMyApplications = async () => {

        try {
            console.log("fetch my applications")
            const workerPhone = localStorage.getItem("userPhone");

            console.log("Phone from localStorage:", workerPhone);

            // const workerPhone =
            //     localStorage.getItem("userPhone");

            const response = await axios.get(
                `${import.meta.env.VITE_API_URL}/api/applications/worker/${workerPhone}`
            );

            console.log("workerPhone:", workerPhone);
            console.log("response:", response.data);

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

            alert("Employer rated successfully");

            fetchMyApplications();

        } catch (error) {

            console.log(error);

        }

    };




    return (
        <div className="min-h-screen bg-gray-100 p-6">

            <h1 className="text-3xl font-bold mb-6">
                My Applications
            </h1>

            <div className="space-y-4">
                {applications.length === 0 ? (
                    <div className="bg-white p-4 rounded-lg shadow">
                        No applications found.
                    </div>
                ) :
                    (
                        applications.map((app) => (

                            <div
                                key={app._id}
                                className="bg-white p-4 rounded-lg shadow"
                            >

                                <p>
                                    <strong>Job Title:</strong>
                                    {" "}
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
                                    <>
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
                                        {app.isCompleted && !app.isEmployerRated && (

                                            <div className="mt-4 border-t pt-4">

                                                <h3 className="font-bold mb-2">
                                                    Rate Employer
                                                </h3>

                                                <textarea
                                                    placeholder="Write review..."
                                                    value={reviews[app._id] || ""}
                                                    onChange={(e) =>
                                                        setReviews({
                                                            ...reviews,
                                                            [app._id]: e.target.value
                                                        })
                                                    }
                                                    className="border p-2 rounded w-full mb-2"
                                                />

                                                <div className="flex gap-2">

                                                    {[1, 2, 3, 4, 5].map((star) => (

                                                        <button
                                                            key={star}
                                                            onClick={() =>
                                                                rateEmployer(
                                                                    app._id,
                                                                    star
                                                                )
                                                            }
                                                            className="bg-yellow-400 px-3 py-2 rounded"
                                                        >
                                                            ⭐ {star}
                                                        </button>

                                                    ))}

                                                </div>

                                            </div>

                                        )}

                                        {app.isEmployerRated && (

                                            <p className="mt-3 text-green-600 font-bold">
                                                ✅ Employer Already Rated
                                            </p>

                                        )}
                                    </>
                                )}
                            </div>
                        )))
                }



            </div>

        </div>
    );
};

export default MyApplications;