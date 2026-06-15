// import React from 'react'

// const WorkerDashboard = () => {
//   return (
//     <div>
//       <h1>Worker Dashboard</h1>
//     </div>
//   )
// }

// export default WorkerDashboard
import React from 'react'
import { Link, useNavigate } from 'react-router-dom'

const WorkerDashboard = () => {
    const navigate = useNavigate();

    const handleLogout = () => {

        localStorage.clear();

        navigate("/login");

    };
    return (
        <div className="min-h-screen bg-gray-100 p-6">

            <h1 className="text-3xl font-bold mb-8">
                Worker Dashboard
            </h1>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

                <div className="bg-white p-6 rounded-lg shadow">
                    <h2 className="text-xl font-semibold mb-2">
                        My Profile
                    </h2>

                    <p className="text-gray-600 mb-4">
                        View and update your profile details.
                    </p>

                    <Link to="/profile">
                        <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition">
                            view profile
                        </button>
                    </Link>
                </div>

                <div className="bg-white p-6 rounded-lg shadow">
                    <h2 className="text-xl font-semibold mb-2">
                        Available Jobs
                    </h2>

                    <p className="text-gray-600 mb-4">
                        Browse jobs posted by employers.
                    </p>

          
                    <Link to="/available-jobs">
                        <button className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg transition">
                            View Jobs
                        </button>
                    </Link>
                </div>

                <div className="bg-white p-6 rounded-lg shadow">
                    <h2 className="text-xl font-semibold mb-2">
                        Applied Jobs
                    </h2>

                    <p className="text-gray-600 mb-4">
                        Track jobs you have applied for.
                    </p>

                    
                    <Link to="/my-applications">
                        <button className="bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-lg transition">
                            My Applications
                        </button>
                    </Link>

                    <button
                        onClick={handleLogout}
                        className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg transition"
                    >
                        Logout
                    </button>
                </div>

            </div>

        </div>
    )
}

export default WorkerDashboard