import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

const WorkerDetails = () => {
    const { id } = useParams();

    const [worker, setWorker] = useState(null);
    const [reviews, setReviews] = useState([]);

    useEffect(() => {
        fetchWorker();
    }, []);

    const fetchWorker = async () => {

        try {
            
            const response = await axios.get(
                `${import.meta.env.VITE_API_URL}/api/workers/${id}`
            );

            setWorker(response.data);
            
            const reviewsResponse = await axios.get(
                `${import.meta.env.VITE_API_URL}/api/applications/reviews/${response.data.phone}`
            );

            setReviews(reviewsResponse.data);

        } catch (error) {
            console.log(error);
        }
    };

    if (!worker) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <h1 className="text-2xl font-bold text-gray-600">
                    Loading Worker Profile...
                </h1>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-100 p-6">

            <div className="max-w-5xl mx-auto">

                {/* Hero Section */}

                <div className="bg-gradient-to-r from-blue-600 to-cyan-600 text-white p-8 rounded-3xl shadow-xl mb-8">

                    <div className="flex flex-col md:flex-row items-center gap-6">

                        {worker.profilePhoto ? (
                            <img
                                src={`${import.meta.env.VITE_API_URL}/uploads/${worker.profilePhoto}`}
                                alt="Worker"
                                className="w-40 h-40 rounded-full object-cover border-4 border-white"
                            />
                        ) : (
                            <div className="w-40 h-40 rounded-full bg-white text-6xl flex items-center justify-center">
                                👤
                            </div>
                        )}

                        <div>

                            <h1 className="text-4xl md:text-5xl font-bold">
                                {worker.name}
                            </h1>

                            <p className="text-xl mt-3">
                                {worker.skill}
                            </p>

                            <p className="text-cyan-100 mt-2">
                                📍 {worker.location}
                            </p>

                            <p className="text-yellow-300 font-bold text-lg mt-2">
                                ⭐ {Number(worker.rating || 0).toFixed(1)}
                            </p>

                            <div className="flex flex-wrap gap-2 mt-4">

                                {worker.isMobileVerified && (
                                    <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full font-semibold">
                                        📱 Mobile Verified
                                    </span>
                                )}

                                {worker.isAadhaarVerified && (
                                    <span className="bg-blue-100 text-blue-700 px-3 py-1 rounded-full font-semibold">
                                        🪪 Aadhaar Verified
                                    </span>
                                )}

                            </div>

                        </div>

                    </div>

                </div>

                {/* Stats */}

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">

                    <div className="bg-white p-6 rounded-2xl shadow">
                        <p className="text-gray-500">
                            Experience
                        </p>

                        <h2 className="text-3xl font-bold text-blue-600 mt-2">
                            {worker.experience || 0}
                        </h2>

                        <p className="text-gray-500">
                            Years
                        </p>
                    </div>

                    <div className="bg-white p-6 rounded-2xl shadow">
                        <p className="text-gray-500">
                            Rating
                        </p>

                        <h2 className="text-3xl font-bold text-yellow-500 mt-2">
                            ⭐ {Number(worker.rating || 0).toFixed(1)}
                        </h2>
                    </div>

                    <div className="bg-white p-6 rounded-2xl shadow">
                        <p className="text-gray-500">
                            Verification
                        </p>

                        <h2 className="text-xl font-bold text-green-600 mt-2">
                            {worker.isMobileVerified &&
                                worker.isAadhaarVerified
                                ? "✅ Verified"
                                : "⏳ Pending"}
                        </h2>
                    </div>

                </div>

                {/* About Section */}

                <div className="bg-white rounded-2xl shadow p-6 mb-8">

                    <h2 className="text-2xl font-bold text-slate-800 mb-4">
                        About Worker
                    </h2>

                    <p className="text-gray-700 leading-relaxed">
                        {worker.about || "No information added yet."}
                    </p>

                </div>

                {/* WhatsApp Button */}

                <div className="mb-8">

                    <a
                        href={`https://wa.me/91${worker.phone}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="block w-full bg-green-600 hover:bg-green-700 text-white text-center py-4 rounded-2xl font-bold text-lg transition-all duration-300"
                    >
                        💬 Contact on WhatsApp
                    </a>

                </div>

                {/* Reviews */}

                <div className="bg-white rounded-2xl shadow p-6">

                    <h2 className="text-3xl font-bold text-purple-700 mb-6">
                        ⭐ Reviews & Ratings
                    </h2>

                    {reviews.length === 0 ? (

                        <div className="bg-gray-50 rounded-xl p-6 text-center">

                            <h3 className="text-xl font-semibold text-gray-600">
                                No Reviews Yet
                            </h3>

                            <p className="text-gray-500 mt-2">
                                Reviews will appear after completed jobs.
                            </p>

                        </div>

                    ) : (

                        <div className="space-y-4">

                            {reviews.map((review) => (

                                <div
                                    key={review._id}
                                    className="bg-gray-50 rounded-xl shadow-sm p-5 hover:-translate-y-1 hover:shadow-lg transition-all duration-300"
                                >

                                    <p className="text-yellow-600 font-bold text-lg mb-2">
                                        ⭐ {review.employerRating}
                                    </p>

                                    <p className="text-gray-700">
                                        {review.review || "No written review."}
                                    </p>

                                </div>

                            ))}

                        </div>

                    )}

                </div>

            </div>

        </div>
    );
};

export default WorkerDetails;