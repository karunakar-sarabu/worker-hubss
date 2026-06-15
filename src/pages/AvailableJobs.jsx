import React, { useEffect, useState } from "react";
import axios from "axios";

const AvailableJobs = () => {

    const [jobs, setJobs] = useState([]);

    useEffect(() => {

        fetchJobs();

    }, []);

    const fetchJobs = async () => {

        try {

            const response = await axios.get(
                "http://localhost:5000/api/jobs"
            );

            setJobs(response.data);

        } catch (error) {

            console.log(error);

        }
    };

    const handleApply = async (jobId) => {

        try {

            const workerPhone =
                localStorage.getItem("userPhone");

            const response = await axios.post(
                `${import.meta.env.VITE_API_URL}/api/applications`,
                {
                    workerPhone,
                    jobId
                }
            );

            // alert(response.data.message);

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
            Available Jobs
        </h1>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">

            {jobs.map((job) => (

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

                    <p className="mt-2 font-semibold text-green-600">
                        ₹{job.wage}/day
                    </p>

                    {/* <button
                        className="mt-4 bg-blue-600 text-white px-4 py-2 rounded"
                    >
                        Apply
                    </button> */}
                    <button
                        onClick={() => handleApply(job._id)}
                        className="mt-4 bg-blue-600 text-white px-4 py-2 rounded"
                    >
                        Apply
                    </button>
                </div>

            ))}

        </div>

    </div>
);
};

export default AvailableJobs;