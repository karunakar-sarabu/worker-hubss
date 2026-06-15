// import React from 'react'

// const EmployerDashboard = () => {
//   return (
//     <div>
//       <h1>Employer Dashboard</h1>
//     </div>
//   )
// }

// export default EmployerDashboard
import React from 'react'
import { Link, useNavigate } from 'react-router-dom'

const EmployerDashboard = () => {
    const navigate = useNavigate();
    const handleLogout = () => {

        localStorage.clear();
        navigate("/login");

    };
    return (
        <div className="min-h-screen bg-gray-100 p-6">

            <h1 className="text-4xl font-bold mb-8 text-blue-700">
                Employer Dashboard
            </h1>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

                <div className="bg-white p-6 rounded-xl shadow-md hover:shadow-xl transition duration-300">
                    <Link to="/profile">
                        <button
                            className="bg-blue-600 text-white px-4 py-2 rounded"
                        >
                            View Profile
                        </button>

                    </Link>
                    <h2 className="text-xl font-semibold mb-2">
                        Post New Job
                    </h2>

                    <p className="text-gray-600 mb-4">
                        Create a new job posting.
                    </p>


                    <Link to="/post-job">
                        <button className="bg-blue-600 text-white px-4 py-2 rounded">
                            Post Job
                        </button>
                    </Link>
                </div>

                <div className="bg-white p-6 rounded-lg shadow">
                    <h2 className="text-xl font-semibold mb-2">
                        My Jobs
                    </h2>

                    <p className="text-gray-600 mb-4">
                        View all jobs posted by you.
                    </p>

                    {/* <button className="bg-green-600 text-white px-4 py-2 rounded">
                        View Jobs
                    </button> */}

                    <Link to="/my-jobs">
                        <button className="bg-green-600 text-white px-4 py-2 rounded">
                            View Jobs
                        </button>
                    </Link>

                    <button
                        onClick={handleLogout}
                        className="bg-red-600 text-white px-4 py-2 rounded"
                    >
                        Logout
                    </button>
                </div>

                <div className="bg-white p-6 rounded-lg shadow">
                    <h2 className="text-xl font-semibold mb-2">
                        Applicants
                    </h2>

                    <p className="text-gray-600 mb-4">
                        Check workers who applied.
                    </p>

                    {/* <button className="bg-purple-600 text-white px-4 py-2 rounded">
                        View Applicants
                    </button> */}
                    <Link to="/applicants">
                        <button className="bg-purple-600 text-white px-4 py-2 rounded">
                            View Applicants
                        </button>
                    </Link>
                </div>

            </div>

        </div>
    )
}

export default EmployerDashboard