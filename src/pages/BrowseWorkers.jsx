import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const BrowseWorkers = () => {

    const [workers, setWorkers] = useState([]);
    const [search, setSearch] = useState("");
    const [locationSearch, setLocationSearch] = useState("");
    const [verifiedOnly, setVerifiedOnly] = useState(false);

    useEffect(() => {

        fetchWorkers();

    }, []);

    const fetchWorkers = async () => {

        try {

            const response = await axios.get(
                `${import.meta.env.VITE_API_URL}/api/workers`
            );

            setWorkers(response.data);

        } catch (error) {

            console.log(error);

        }

    };

    const filteredWorkers = workers
        .filter(
            (worker) =>
                worker.skill?.toLowerCase().includes(
                    search.toLowerCase()
                ) &&
                worker.location?.toLowerCase().includes(
                    locationSearch.toLowerCase()
                ) &&
                (
                    !verifiedOnly ||
                    (
                        worker.isMobileVerified &&
                        worker.isAadhaarVerified
                    )
                )
        )
        .sort((a, b) => {

            if ((b.rating || 0) !== (a.rating || 0)) {
                return (b.rating || 0) - (a.rating || 0);
            }

            return (b.experience || 0) - (a.experience || 0);

        });
    return (
        <div className="min-h-screen bg-gray-100 p-6">

            <h1 className="text-3xl font-bold mb-6">
                Browse Workers
            </h1>

            <input
                type="text"
                placeholder="Search by Skill..."
                value={search}
                onChange={(e) =>
                    setSearch(e.target.value)
                }
                className="w-full border p-3 rounded mb-6"
            />
            <input
                type="text"
                placeholder="Search by Location..."
                value={locationSearch}
                onChange={(e) =>
                    setLocationSearch(e.target.value)
                }
                className="w-full border p-3 rounded mb-6"
            />
            <label className="flex items-center gap-2 mb-4">
                <input
                    type="checkbox"
                    checked={verifiedOnly}
                    onChange={(e) =>
                        setVerifiedOnly(e.target.checked)
                    }
                />
                Show Verified Workers Only
            </label>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">

                {filteredWorkers.map((worker) => (

                    <div
                        key={worker._id}
                        className="bg-white p-4 rounded-lg shadow"
                    >

                        {worker.profilePhoto && (
                            <img
                                src={`${import.meta.env.VITE_API_URL}/uploads/${worker.profilePhoto}`}
                                alt="Worker"
                                className="w-24 h-24 rounded-full object-cover mx-auto mb-4"
                            />
                        )}

                        {worker.rating >= 4.5 &&
                            worker.isMobileVerified &&
                            worker.isAadhaarVerified && (
                                <div className="mb-2">
                                    <span className="bg-yellow-100 text-yellow-700 px-2 py-1 rounded text-sm font-bold">
                                        ⭐ Featured Worker
                                    </span>
                                </div>
                            )}

                        <h2 className="text-xl font-bold">
                            {worker.name}
                        </h2>

                        <p>
                            <strong>Skill:</strong>
                            {" "}
                            {worker.skill}
                        </p>

                        <p>
                            <strong>Location:</strong>
                            {" "}
                            {worker.location}
                        </p>

                        <p>
                            <strong>Experience:</strong>
                            {" "}
                            {worker.experience || 0}
                            {" "}Years
                        </p>

                        <p>
                            <strong>Rating:</strong>
                            {" "}
                            ⭐ {worker.rating || 0}
                        </p>

                        <div className="flex gap-2 mt-2">

                            {worker.isMobileVerified && (
                                <span className="bg-green-100 text-green-700 px-2 py-1 rounded text-sm">
                                    📱 Verified
                                </span>
                            )}

                            {worker.isAadhaarVerified && (
                                <span className="bg-blue-100 text-blue-700 px-2 py-1 rounded text-sm">
                                    🪪 Aadhaar
                                </span>
                            )}

                        </div>

                        <a
                            href={`https://wa.me/91${worker.phone}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="block mt-4 bg-green-600 text-white text-center py-2 rounded"
                        >
                            WhatsApp
                        </a>

                        <Link
                            to={`/worker/${worker._id}`}
                        >
                            <button className="w-full mt-2 bg-blue-600 text-white py-2 rounded">
                                View Profile
                            </button>
                        </Link>
                    </div>

                ))}

            </div>

        </div>
    );
};

export default BrowseWorkers;