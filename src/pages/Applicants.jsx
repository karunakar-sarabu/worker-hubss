import React, { useEffect, useState } from "react";
import axios from "axios";

const Applicants = () => {

    const [applications, setApplications] = useState([]);

    useEffect(() => {

        fetchApplications();

    }, []);

    const fetchApplications = async () => {

        try {

            const response = await axios.get(
                `${import.meta.env.VITE_API_URL}/api/applications`
            );

            setApplications(response.data);

        } catch (error) {

            console.log(error);

        }
    };

    const updateStatus = async (id, status) => {

        try {

            const response = await axios.put(
                `${import.meta.env.VITE_API_URL}/api/applications/${id}`,
                { status }
            );

            // alert(response.data.message);

            fetchApplications();

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
                Applicants
            </h1>

            <div className="space-y-4">

                {applications.map((app) => (

                    <div
                        key={app._id}
                        className="bg-white p-4 rounded-lg shadow"
                    >

                        <p>
                            <strong>Worker Phone:</strong>
                            {" "}
                            {app.workerPhone}
                        </p>



                        <p>
                            <strong>Job Title:</strong>
                            {app.jobTitle}
                        </p>


                        <p>
                            <strong>Status:</strong>
                            {" "}
                            {app.status}
                        </p>



                        <div className="mt-4 flex gap-2">

                            <button
                                onClick={() => updateStatus(app._id, "Accepted")}
                                className="bg-green-600 text-white px-4 py-2 rounded"
                            >
                                Accept
                            </button>

                            <button
                                onClick={() => updateStatus(app._id, "Rejected")}
                                className="bg-red-600 text-white px-4 py-2 rounded"
                            >
                                Reject
                            </button>

                        </div>

                    </div>


                ))}

            </div>

        </div>
    );
};

export default Applicants;