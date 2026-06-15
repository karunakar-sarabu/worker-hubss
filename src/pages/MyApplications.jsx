import React, { useEffect, useState } from "react";
import axios from "axios";

const MyApplications = () => {
     console.log("MyApplications component rendered");
    const [applications, setApplications] = useState([]);

    useEffect(() => {

        fetchMyApplications();

    }, []);

    const fetchMyApplications = async () => {
       
        try {
            console.log("fetch my applications")
            const workerPhone = localStorage.getItem("userPhone");

             console.log("Phone from localStorage:", workerPhone);

            // const workerPhone =
            //     localStorage.getItem("userPhone");

            const response = await axios.get(
                `${import.meta.env.VITE_API_URL}/api/applications/worker/${workerPhone}`
            );

            console.log("workerPhone:", workerPhone);
            console.log("response:", response.data);

            setApplications(response.data);

        } catch (error) {

            console.log(error);

        }

    };

    return (
        <div className="min-h-screen bg-gray-100 p-6">

            <h1 className="text-3xl font-bold mb-6">
                My Applications
            </h1>

            <div className="space-y-4">
                {applications.length === 0 ? (
                    <div className="bg-white p-4 rounded-lg shadow">
                        No applications found.
                    </div>
                ) :
                    (
                        applications.map((app) => (

                            <div
                                key={app._id}
                                className="bg-white p-4 rounded-lg shadow"
                            >

                                <p>
                                    <strong>Job Title:</strong>
                                    {" "}
                                    {app.jobTitle}
                                </p>

                                <p>
                                    <strong>Status:</strong>
                                    {" "}

                                    <span
                                        className={
                                            app.status === "Accepted"
                                                ? "text-green-600 font-bold"
                                                : app.status === "Rejected"
                                                    ? "text-red-600 font-bold"
                                                    : "text-yellow-600 font-bold"
                                        }
                                    >
                                        {app.status}
                                    </span>

                                </p>

                            </div>
                                    )))
                                }                
                        
                    

            </div>

        </div>
    );
};

export default MyApplications;