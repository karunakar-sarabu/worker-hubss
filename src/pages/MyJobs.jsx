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


            console.log("Employer Phone:", employerPhone);

            const response = await axios.get(
                `${import.meta.env.VITE_API_URL}/api/jobs/employer/${employerPhone}`
            );

            console.log(response.data);

            setJobs(response.data);
            // setJobs(response.data);

        } catch (error) {

            console.log(error);

        }

    };

    const deleteJob = async (id) => {

        try {

            const response = await axios.delete(
                `${import.meta.env.VITE_API_URL}/api/jobs/${id}`
            );

            // alert(response.data.message);

            fetchJobs();

        } catch (error) {

            // alert(
            //     error.response?.data?.message ||
            //     "Something went wrong"
            // );

        }

    };


    const updateJob = async () => {

        try {

            const response = await axios.put(
                `${import.meta.env.VITE_API_URL}/api/jobs/${editingJob._id}`,
                editingJob
            );

            // alert(response.data.message);

            setEditingJob(null);

            fetchJobs();

        } catch (error) {

            alert(
                error.response?.data?.message ||
                "Something went wrong"
            );

        }

    };
    console.log(editingJob);
    return (
        <div className="min-h-screen bg-gray-100 p-6">

            {editingJob && (

                <div className="bg-white p-6 rounded-lg shadow mb-6">

                    <h2 className="text-xl font-bold mb-4">
                        Edit Job
                    </h2>

                    <input
                        type="text"
                        value={editingJob.title}
                        onChange={(e) =>
                            setEditingJob({
                                ...editingJob,
                                title: e.target.value
                            })
                        }
                        className="w-full border p-2 mb-3"
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
                        className="w-full border p-2 mb-3"
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
                        className="w-full border p-2 mb-3"
                    />

                    <button
                        onClick={updateJob}
                        className="bg-blue-600 text-white px-4 py-2 rounded"
                    >
                        Update Job
                    </button>

                </div>

            )}

            <h1 className="text-3xl font-bold mb-6">
                My Jobs
            </h1>

            <div className="space-y-4">

                {jobs.map((job) => (

                    <div
                        key={job._id}
                        className="bg-white p-4 rounded-lg shadow"
                    >

                        <h2 className="text-xl font-bold">
                            {job.title}
                        </h2>

                        <p>
                            {job.description}
                        </p>

                        <p>
                            📍 {job.location}
                        </p>

                        <p className="font-semibold text-green-600">
                            ₹{job.wage}/day
                        </p>

                        <div className="flex gap-5">
                            <button
                                onClick={() => deleteJob(job._id)}
                                className="mt-4 bg-red-600 text-white px-4 py-2 rounded"
                            >
                                Delete
                            </button>

                            <button
                                onClick={() => setEditingJob(job)}
                                className="bg-yellow-500 mt-4 text-white px-4 py-2 rounded"
                            >
                                Edit
                            </button>
                        </div>
                    </div>

                ))}

            </div>

        </div>
    );
};

export default MyJobs;