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

    const totalWorkers = workers.length;

    const verifiedWorkers = workers.filter(
        (worker) =>
            worker.isMobileVerified &&
            worker.isAadhaarVerified
    ).length;

    const featuredWorkers = workers.filter(
        (worker) =>
            worker.rating >= 4.5 &&
            worker.isMobileVerified &&
            worker.isAadhaarVerified
    ).length;

    const topRatedWorkers = workers.filter(
        (worker) => (worker.rating || 0) >= 4.5
    ).length;

    return (
        <div className="min-h-screen bg-gray-100 p-6">

            <div className="max-w-7xl mx-auto">

                {/* Hero */}

                <div className="bg-gradient-to-r from-cyan-600 to-blue-700 text-white p-8 rounded-3xl shadow-xl mb-8">
                    <h1 className="text-2xl md:text-5xl font-bold">
                        👷 Browse Workers
                    </h1>

                    <p className="mt-3 text-lg text-cyan-100">
                        Discover trusted workers, compare profiles and hire the right talent.
                    </p>
                </div>

                {/* Stats */}

                <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-8">

                    <div className="bg-white p-5 rounded-2xl shadow">
                        <p className="text-gray-500">
                            Total Workers
                        </p>

                        <h2 className="text-3xl font-bold text-blue-600 mt-2">
                            {totalWorkers}
                        </h2>
                    </div>

                    <div className="bg-white p-5 rounded-2xl shadow">
                        <p className="text-gray-500">
                            Verified Workers
                        </p>

                        <h2 className="text-3xl font-bold text-green-600 mt-2">
                            {verifiedWorkers}
                        </h2>
                    </div>

                    <div className="bg-white p-5 rounded-2xl shadow">
                        <p className="text-gray-500">
                            Featured Workers
                        </p>

                        <h2 className="text-3xl font-bold text-yellow-500 mt-2">
                            {featuredWorkers}
                        </h2>
                    </div>

                    <div className="bg-white p-5 rounded-2xl shadow">
                        <p className="text-gray-500">
                            Top Rated
                        </p>

                        <h2 className="text-3xl font-bold text-purple-600 mt-2">
                            {topRatedWorkers}
                        </h2>
                    </div>

                </div>

                {/* Search Panel */}

                <div className="bg-white rounded-2xl shadow p-6 mb-8">

                    <div className="grid md:grid-cols-3 gap-4">

                        <input
                            type="text"
                            placeholder="Search by Skill..."
                            value={search}
                            onChange={(e) =>
                                setSearch(e.target.value)
                            }
                            className="border border-gray-300 rounded-xl p-3 outline-none focus:ring-2 focus:ring-blue-400"
                        />

                        <input
                            type="text"
                            placeholder="Search by Location..."
                            value={locationSearch}
                            onChange={(e) =>
                                setLocationSearch(e.target.value)
                            }
                            className="border border-gray-300 rounded-xl p-3 outline-none focus:ring-2 focus:ring-blue-400"
                        />

                        <label className="flex items-center gap-3 bg-gray-50 rounded-xl px-4 py-3">
                            <input
                                type="checkbox"
                                checked={verifiedOnly}
                                onChange={(e) =>
                                    setVerifiedOnly(e.target.checked)
                                }
                            />

                            <span className="font-medium">
                                Verified Workers Only
                            </span>
                        </label>

                    </div>

                </div>

                {/* Workers */}

                {filteredWorkers.length === 0 ? (

                    <div className="bg-white rounded-2xl shadow p-10 text-center">
                        <h2 className="text-2xl font-bold text-gray-700">
                            No Workers Found
                        </h2>

                        <p className="text-gray-500 mt-2">
                            Try changing your filters.
                        </p>
                    </div>

                ) : (

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">

                        {filteredWorkers.map((worker) => (

                            <div
                                key={worker._id}
                                className="bg-white rounded-2xl shadow-md p-6 hover:-translate-y-2 hover:shadow-xl transition-all duration-300 flex flex-col h-full"
                            >

                                {/* Photo */}

                                <div className="text-center">

                                    {worker.profilePhoto ? (
                                        <img
                                            src={`${import.meta.env.VITE_API_URL}/uploads/${worker.profilePhoto}`}
                                            alt="Worker"
                                            className="w-28 h-28 rounded-full object-cover mx-auto mb-4 border-4 border-blue-100"
                                        />
                                    ) : (
                                        <div className="w-28 h-28 rounded-full bg-gray-200 flex items-center justify-center mx-auto mb-4 text-4xl">
                                            👤
                                        </div>
                                    )}

                                </div>

                                {/* Featured */}

                                <div className="text-center mb-3 h-8">

                                    {worker.rating >= 4.5 &&
                                        worker.isMobileVerified &&
                                        worker.isAadhaarVerified && (

                                            <span className="bg-yellow-100 text-yellow-700 px-4 py-1 rounded-full text-sm font-bold">
                                                ⭐ Featured Worker
                                            </span>

                                        )}

                                </div>

                                {/* Name */}

                                <h2 className="text-2xl font-bold text-center text-slate-800">
                                    {worker.name}
                                </h2>

                                <p className="text-center text-yellow-600 font-semibold mt-2">
                                    ⭐ {Number(worker.rating || 0).toFixed(1)}
                                </p>

                                {/* Details */}

                                <div className="mt-4 space-y-2 text-gray-700">

                                    <p>
                                        <strong>Skill:</strong> {worker.skill}
                                    </p>

                                    <p>
                                        <strong>Location:</strong> {worker.location}
                                    </p>

                                    <p>
                                        <strong>Experience:</strong>{" "}
                                        {worker.experience || 0} Years
                                    </p>

                                </div>

                                {/* Verification */}

                                <div className="flex flex-wrap gap-2 mt-4">

                                    {worker.isMobileVerified && (
                                        <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-sm font-semibold">
                                            📱 Verified
                                        </span>
                                    )}

                                    {worker.isAadhaarVerified && (
                                        <span className="bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-sm font-semibold">
                                            🪪 Aadhaar
                                        </span>
                                    )}

                                </div>

                                {/* Buttons */}

                                <div className="mt-auto pt-6">

                                    <a
                                        href={`https://wa.me/91${worker.phone}`}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="block w-full bg-green-600 hover:bg-green-700 text-white text-center py-3 rounded-xl font-semibold"
                                    >
                                        Contact on WhatsApp
                                    </a>

                                    <Link
                                        to={`/worker/${worker._id}`}
                                    >
                                        <button className="w-full mt-3 bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-xl font-semibold">
                                            View Profile
                                        </button>
                                    </Link>

                                </div>

                            </div>

                        ))}

                    </div>

                )}

            </div>

        </div>
    );
};

export default BrowseWorkers;