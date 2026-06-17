import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

const WorkerDetails = () => {

    const { id } = useParams();

    const [worker, setWorker] = useState(null);
    const [reviews,setReviews]=useState([])
    useEffect(() => {

        fetchWorker();

    }, []);

    const fetchWorker = async () => {

        try {

            const response = await axios.get(
                `${import.meta.env.VITE_API_URL}/api/workers/${id}`
            );

            setWorker(response.data);
            console.log("Worker Phone:", response.data.phone);
            const reviewsResponse = await axios.get(
                `${import.meta.env.VITE_API_URL}/api/applications/reviews/${response.data.phone}`
            );

            setReviews(reviewsResponse.data);
            console.log(reviews);

        } catch (error) {

            console.log(error);

        }

    };

    if (!worker) {
        return <div>Loading...</div>;
    }

    return (
        <div className="min-h-screen bg-gray-100 p-6">

            <div className="max-w-2xl mx-auto bg-white p-6 rounded-lg shadow">

                {worker.profilePhoto && (
                    <img
                        src={`${import.meta.env.VITE_API_URL}/uploads/${worker.profilePhoto}`}
                        alt="Worker"
                        className="w-32 h-32 rounded-full object-cover mx-auto mb-4"
                    />
                )}

                <h1 className="text-3xl font-bold mb-4">
                    {worker.name}
                </h1>

                <p><strong>Skill:</strong> {worker.skill}</p>

                <p><strong>Location:</strong> {worker.location}</p>

                <p>
                    <strong>Experience:</strong>
                    {" "}
                    {worker.experience || 0} Years
                </p>

                <p>
                    <strong>Rating:</strong>
                    {" "}
                    ⭐ {worker.rating || 0}
                </p>

                <p className="mt-4">
                    <strong>About:</strong>
                    {" "}
                    {worker.about || "Not Added"}
                </p>

                <div className="flex gap-2 mt-4">

                    {worker.isMobileVerified && (
                        <span className="bg-green-100 text-green-700 px-2 py-1 rounded">
                            📱 Mobile Verified
                        </span>
                    )}

                    {worker.isAadhaarVerified && (
                        <span className="bg-blue-100 text-blue-700 px-2 py-1 rounded">
                            🪪 Aadhaar Verified
                        </span>
                    )}

                </div>

                <a
                    href={`https://wa.me/91${worker.phone}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block mt-6 bg-green-600 text-white text-center py-3 rounded"
                >
                    Contact on WhatsApp
                </a>

                <div className="mt-8">

                    <h2 className="text-2xl font-bold mb-4">
                        Reviews
                    </h2>

                    {reviews.length === 0 ? (

                        <p>No reviews yet.</p>

                    ) : (

                        reviews.map((review) => (

                            <div
                                key={review._id}
                                className="border rounded p-3 mb-3"
                            >

                                <p className="font-bold">
                                    ⭐ {review.employerRating}
                                </p>

                                <p>
                                    {review.review}
                                </p>

                            </div>

                        ))

                    )}

                </div>
            </div>

        </div>
    );
};

export default WorkerDetails;