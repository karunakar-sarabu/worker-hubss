
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

            alert("Applied successfully");
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
            <h1 className="text-3xl font-bold mb-6">
                Available Jobs
            </h1>

            <div className="bg-white p-4 rounded-lg shadow mb-6 grid md:grid-cols-3 gap-4">

                <input
                    type="text"
                    placeholder="Search Job Title"
                    value={searchTerm}
                    onChange={(e) =>
                        setSearchTerm(e.target.value)
                    }
                    className="border p-2 rounded"
                />

                <input
                    type="text"
                    placeholder="Location"
                    value={locationFilter}
                    onChange={(e) =>
                        setLocationFilter(e.target.value)
                    }
                    className="border p-2 rounded"
                />

                <select
                    value={minWage}
                    onChange={(e) =>
                        setMinWage(e.target.value)
                    }
                    className="border p-2 rounded"
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
                        className="bg-white p-6 rounded-lg shadow"
                    >
                        <h2 className="text-xl font-bold">
                            {job.title}
                        </h2>

                        <p className="mt-2">
                            {job.description}
                        </p>

                        <p className="mt-2">
                            📍 {job.location}
                        </p>

                        <p className="mt-2">
                            ⭐ {job.employerRating?.toFixed(1) || 0}
                            {" "}
                            ({job.employerTotalRatings || 0} reviews)
                        </p>

                        {job.employerRating >= 4.5 && (
                            <p className="text-green-600 font-semibold">
                                ✅ Trusted Employer
                            </p>
                        )}
                        
                        <p className="mt-2 font-semibold text-green-600">
                            ₹{job.wage}/day
                        </p>

                        <div className="flex gap-2 mt-4">
                            <button
                                onClick={() => handleApply(job._id)}
                                className="bg-blue-600 text-white px-4 py-2 rounded"
                            >
                                Apply
                            </button>

                            <a
                                href={`https://wa.me/91${job.employerPhone}?text=Hello, I am interested in the job: ${job.title}`}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="bg-green-600 text-white px-4 py-2 rounded"
                            >
                                WhatsApp
                            </a>
                        </div>
                    </div>
                ))}

            </div>

            {filteredJobs.length === 0 && (
                <div className="text-center text-gray-500 mt-8">
                    No jobs found.
                </div>
            )}
        </div>
    );
};

export default AvailableJobs;