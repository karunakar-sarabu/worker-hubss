// import React from "react";
// import { Link, useLocation, useNavigate } from "react-router-dom";

// const Navbar = () => {
//     const location = useLocation();
//     if (
//     location.pathname === "/login" ||
//     location.pathname === "/worker-register" ||
//     location.pathname === "/employer-register"
//     ) {
//         return null;
//     }
//     const navigate = useNavigate();

//     const role = localStorage.getItem("role");

//     const handleLogout = () => {

//         localStorage.clear();

//         navigate("/login");

//     };

//     return (

//         <div className="bg-blue-600 text-white px-6 py-4 flex justify-between items-center">

//             <h1 className="text-xl font-bold">
//                 Daily Wage Connect
//             </h1>

//             <div className="flex gap-4 items-center">

//                 <span className="capitalize">
//                     {role}
//                 </span>

//                 <Link to="/profile">
//                     Profile
//                 </Link>

//                 <button
//                     onClick={handleLogout}
//                     className="bg-red-500 px-3 py-1 rounded"
//                 >
//                     Logout
//                 </button>

//             </div>

//         </div>

//     );
// };

// export default Navbar;
import React from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";

const Navbar = () => {

    const location = useLocation();
    const navigate = useNavigate();

    const role = localStorage.getItem("role");

    if (
        location.pathname === "/login" ||
        location.pathname === "/worker-register" ||
        location.pathname === "/employer-register"
    ) {
        return null;
    }

    const handleLogout = () => {

        localStorage.clear();
        navigate("/login");

    };

    return (
        <div className="bg-blue-600 text-white px-6 py-4 flex justify-between items-center">

            <h1 className="text-xl font-bold">
                Daily Wage Connect
            </h1>

            <div className="flex gap-4 items-center">

                <span className="capitalize">
                    {role}
                </span>

                <Link to="/profile">
                    Profile
                </Link>

                <button
                    onClick={handleLogout}
                    className="bg-red-500 px-3 py-1 rounded"
                >
                    Logout
                </button>

            </div>

        </div>
    );
};

export default Navbar;