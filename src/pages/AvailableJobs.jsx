import React, { useEffect, useState } from "react";
import axios from "axios";

const AvailableJobs = () => {
    const [jobs, setJobs] = useState([]);
    const [searchTerm, setSearchTerm] = useState("");
    const [locationFilter, setLocationFilter] = useState("");
    const [minWage, setMinWage] = useState("");
    useEffect(() => {
        fetchJobs();
    }, []);

    const fetchJobs = async () => {
        try {
            const response = await axios.get(
                `${import.meta.env.VITE_API_URL}/api/jobs`
            );

            setJobs(response.data);
        } catch (error) {
            console.log(error);
        }
    };

    const handleApply = async (jobId) => {
        try {
            const workerPhone = localStorage.getItem("userPhone");

            await axios.post(
                `${import.meta.env.VITE_API_URL}/api/applications`,
                {
                    workerPhone,
                    jobId,
                }
            );

            alert("Application submitted successfully");
        } catch (error) {
            alert(
                error.response?.data?.message ||
                "Something went wrong"
            );
        }
    };

    const filteredJobs = jobs.filter((job) => {
        const matchesSearch =
            job.title
                .toLowerCase()
                .includes(searchTerm.toLowerCase());

        const matchesLocation =
            locationFilter === "" ||
            job.location
                .toLowerCase()
                .includes(locationFilter.toLowerCase());

        const matchesWage =
            minWage === "" ||
            Number(job.wage) >= Number(minWage);

        return (
            matchesSearch &&
            matchesLocation &&
            matchesWage
        );
    });

    return (
        <div className="min-h-screen bg-gray-100 p-6">
            <div className="mb-10 text-center">

                <h1 className="text-4xl md:text-5xl font-bold text-blue-700">
                    Available Jobs
                </h1>

                <p className="text-lg font-semibold text-blue-400 mt-3">
                    Browse verified opportunities from trusted employers
                </p>

            </div>

            <div className="bg-gradient-to-r from-blue-50 to-green-50 p-6 rounded-2xl shadow-md hover:-translate-y-2 hover:shadow-xl transition-all duration-300">
                <input
                    type="text"
                    placeholder="Search Job Title"
                    value={searchTerm}
                    onChange={(e) =>
                        setSearchTerm(e.target.value)
                    }
                    className="border p-2 rounded w-full"
                />

                <input
                    type="text"
                    placeholder="Location"
                    value={locationFilter}
                    onChange={(e) =>
                        setLocationFilter(e.target.value)
                    }
                    className="border p-2 rounded w-full"
                />

                <select
                    value={minWage}
                    onChange={(e) =>
                        setMinWage(e.target.value)
                    }
                    className="border p-2 rounded w-full"
                >
                    <option value="">
                        Any Wage
                    </option>

                    <option value="500">
                        ₹500+
                    </option>

                    <option value="1000">
                        ₹1000+
                    </option>

                    <option value="1500">
                        ₹1500+
                    </option>

                    <option value="2000">
                        ₹2000+
                    </option>
                </select>

            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredJobs.map((job) => (
                    <div
                        key={job._id}
                        className="bg-white p-6 rounded-2xl shadow-lg border border-gray-100">
                        <h2 className="text-2xl font-bold text-slate-800">
                            {job.title}
                        </h2>

                        <p className="mt-2 text-gray-600">
                            {job.description}
                        </p>

                        <p className="mt-3 text-gray-700">
                            📍 {job.location}
                        </p>

                        <p className="mt-3 font-medium text-yellow-600">
                            ⭐ {job.employerRating?.toFixed(1) || 0}
                            {" "}
                            ({job.employerTotalRatings || 0} reviews)
                        </p>

                        {job.employerRating >= 4.5 && (
                            <span className="inline-block bg-green-100 text-green-700 px-3 py-1 rounded-full text-sm font-semibold ">
                                ✅ Trusted Employer
                            </span>
                        )}


                        <p className="text-2xl font-bold text-green-600">
                            ₹{job.wage}/day
                        </p>

                        <div className="flex gap-2 mt-4">
                            <button
                                onClick={() => handleApply(job._id)}
                                className="flex-1 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-xl font-semibold ">
                                Apply
                            </button>

                            <a
                                href={`https://wa.me/91${job.employerPhone}?text=Hello, I am interested in the job: ${job.title}`}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="flex-1 bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-xl font-semibold text-center ">
                                WhatsApp
                            </a>
                        </div>
                    </div>
                ))}

            </div>

            {filteredJobs.length === 0 && (
                <div className="text-center mt-10">

                    <h2 className="text-2xl font-bold text-gray-600">
                        No Jobs Found
                    </h2>

                    <p className="text-gray-500 mt-2">
                        Try changing filters or search terms.
                    </p>

                </div>
            )}
        </div>
    );
};

export default AvailableJobs;