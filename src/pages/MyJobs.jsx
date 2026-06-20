import React, { useEffect, useState } from "react";
import axios from "axios";

const MyJobs = () => {
    const [jobs, setJobs] = useState([]);
    const [editingJob, setEditingJob] = useState(null);

    useEffect(() => {
        fetchJobs();
    }, []);

    const fetchJobs = async () => {
        try {
            const employerPhone =
                localStorage.getItem("userPhone");

            const response = await axios.get(
                `${import.meta.env.VITE_API_URL}/api/jobs/employer/${employerPhone}`
            );

            setJobs(response.data);

        } catch (error) {
            console.log(error);
        }
    };

    const deleteJob = async (id) => {
        const confirmDelete = window.confirm(
            "Are you sure you want to delete this job?"
        );

        if (!confirmDelete) return;

        try {
            await axios.delete(
                `${import.meta.env.VITE_API_URL}/api/jobs/${id}`
            );

            fetchJobs();

        } catch (error) {
            alert(
                error.response?.data?.message ||
                "Failed to delete job"
            );
        }
    };

    const updateJob = async () => {
        try {
            await axios.put(
                `${import.meta.env.VITE_API_URL}/api/jobs/${editingJob._id}`,
                editingJob
            );

            alert("Job updated successfully");

            setEditingJob(null);

            fetchJobs();

        } catch (error) {
            alert(
                error.response?.data?.message ||
                "Failed to update job"
            );
        }
    };

    const recentJobs = jobs.filter((job) => {
        const postedDate = new Date(job.createdAt);
        const today = new Date();

        const diffDays =
            (today - postedDate) /
            (1000 * 60 * 60 * 24);

        return diffDays <= 7;
    }).length;

    return (
        <div className="min-h-screen bg-gray-100 p-6">

            <div className="max-w-7xl mx-auto">

                {/* Hero */}

                <div className="bg-gradient-to-r from-blue-600 to-cyan-600 text-white rounded-3xl p-8 shadow-lg">
                    <h1 className="text-4xl font-bold mb-2">
                        📋 My Jobs
                    </h1>

                    <p className="text-blue-100 text-lg">
                        Manage your job postings and track hiring opportunities.
                    </p>
                </div>

                {/* Stats */}

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">

                    <div className="bg-white p-6 rounded-2xl shadow-md">
                        <p className="text-gray-500">
                            Total Jobs
                        </p>

                        <h2 className="text-4xl font-bold text-blue-600 mt-2">
                            {jobs.length}
                        </h2>
                    </div>

                    <div className="bg-white p-6 rounded-2xl shadow-md">
                        <p className="text-gray-500">
                            Active Jobs
                        </p>

                        <h2 className="text-4xl font-bold text-green-600 mt-2">
                            {jobs.length}
                        </h2>
                    </div>

                    <div className="bg-white p-6 rounded-2xl shadow-md">
                        <p className="text-gray-500">
                            Recent Jobs
                        </p>

                        <h2 className="text-4xl font-bold text-purple-600 mt-2">
                            {recentJobs}
                        </h2>
                    </div>

                </div>

                {/* Edit Panel */}

                {editingJob && (

                    <div className="bg-white rounded-3xl shadow-lg p-8 mb-8">

                        <h2 className="text-3xl font-bold text-blue-700 mb-6">
                            ✏️ Edit Job
                        </h2>

                        <div className="space-y-4">

                            <input
                                type="text"
                                value={editingJob.title}
                                onChange={(e) =>
                                    setEditingJob({
                                        ...editingJob,
                                        title: e.target.value
                                    })
                                }
                                className="w-full border border-gray-300 rounded-xl p-3"
                                placeholder="Job Title"
                            />

                            <textarea
                                rows="4"
                                value={editingJob.description}
                                onChange={(e) =>
                                    setEditingJob({
                                        ...editingJob,
                                        description: e.target.value
                                    })
                                }
                                className="w-full border border-gray-300 rounded-xl p-3"
                                placeholder="Job Description"
                            />

                            <input
                                type="text"
                                value={editingJob.location}
                                onChange={(e) =>
                                    setEditingJob({
                                        ...editingJob,
                                        location: e.target.value
                                    })
                                }
                                className="w-full border border-gray-300 rounded-xl p-3"
                                placeholder="Location"
                            />

                            <input
                                type="number"
                                value={editingJob.wage}
                                onChange={(e) =>
                                    setEditingJob({
                                        ...editingJob,
                                        wage: e.target.value
                                    })
                                }
                                className="w-full border border-gray-300 rounded-xl p-3"
                                placeholder="Daily Wage"
                            />

                            <div className="flex gap-4">

                                <button
                                    onClick={updateJob}
                                    className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-xl font-semibold"
                                >
                                    Save Changes
                                </button>

                                <button
                                    onClick={() =>
                                        setEditingJob(null)
                                    }
                                    className="bg-gray-500 hover:bg-gray-600 text-white px-6 py-3 rounded-xl font-semibold"
                                >
                                    Cancel
                                </button>

                            </div>

                        </div>

                    </div>

                )}

                {/* Empty State */}

                {jobs.length === 0 ? (

                    <div className="bg-white rounded-3xl shadow-lg p-12 text-center">

                        <h2 className="text-3xl font-bold text-gray-700">
                            No Jobs Posted Yet
                        </h2>

                        <p className="text-gray-500 mt-3">
                            Start posting jobs to connect with workers.
                        </p>

                    </div>

                ) : (

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

                        {jobs.map((job) => (

                            <div
                                key={job._id}
                                className="bg-white rounded-3xl shadow-md p-6 hover:-translate-y-2 hover:shadow-xl transition-all duration-300"
                            >

                                <h2 className="text-2xl font-bold text-slate-800">
                                    {job.title}
                                </h2>

                                <p className="text-gray-600 mt-3">
                                    {job.description}
                                </p>

                                <div className="mt-4 space-y-2">

                                    <p className="text-gray-700">
                                        📍 {job.location}
                                    </p>

                                    <p className="text-green-600 font-bold text-xl">
                                        ₹{job.wage}/day
                                    </p>

                                    <p className="text-gray-500 text-sm">
                                        Posted on{" "}
                                        {new Date(
                                            job.createdAt
                                        ).toLocaleDateString()}
                                    </p>

                                </div>

                                <div className="flex gap-3 mt-6">

                                    <button
                                        onClick={() =>
                                            setEditingJob(job)
                                        }
                                        className="flex-1 bg-yellow-500 hover:bg-yellow-600 text-white py-3 rounded-xl font-semibold"
                                    >
                                        Edit
                                    </button>

                                    <button
                                        onClick={() =>
                                            deleteJob(job._id)
                                        }
                                        className="flex-1 bg-red-600 hover:bg-red-700 text-white py-3 rounded-xl font-semibold"
                                    >
                                        Delete
                                    </button>

                                </div>

                            </div>

                        ))}

                    </div>

                )}

            </div>

        </div>
    );
};

export default MyJobs;