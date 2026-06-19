import React from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";

const Navbar = () => {

    const location = useLocation();
    const navigate = useNavigate();

    const role = localStorage.getItem("role");
    const token = localStorage.getItem("token");

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
        <div className="sticky top-0 z-50 bg-white shadow-md">

            <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">

                <Link
                    to="/"
                    className="text-lg md:text-2xl font-bold text-green-600"
                >
                    DWC
                </Link>

                <div className="flex items-center gap-2 md:gap-6 text-sm md:text-base">

                    <Link
                        to="/"
                        className="hover:text-green-600 hidden md:block"
                    >
                        Home
                    </Link>

                    {role === "worker" && (
                        <>
                            <Link
                                to="/available-jobs"
                                className="hover:text-green-600"
                            >
                                Jobs
                            </Link>

                            <Link
                                to="/my-applications"
                                className="hover:text-green-600"
                            >
                                Applications
                            </Link>
                        </>
                    )}

                    {role === "employer" && (
                        <>
                            <Link
                                to="/post-job"
                                className="hover:text-green-600"
                            >
                                Post
                            </Link>

                            <Link
                                to="/my-jobs"
                                className="hover:text-green-600"
                            >
                                Jobs
                            </Link>
                        </>
                    )}

                    {token ? (
                        <>
                            <Link
                                to="/profile"
                                className="hover:text-green-600"
                            >
                                Profile
                            </Link>

                            <button
                                onClick={handleLogout}
                                className="bg-green-600 text-white px-4 py-2 rounded-xl hover:bg-green-700"
                            >
                                Logout
                            </button>
                        </>
                    ) : (
                        <>
                            <Link
                                to="/login"
                                className="hover:text-green-600"
                            >
                                Login
                            </Link>

                            <Link
                                to="/worker-register"
                                className="bg-green-600 text-white px-4 py-2 rounded-xl hover:bg-green-700"
                            >
                                Register
                            </Link>
                        </>
                    )}

                </div>

            </div>

        </div>
    );
};

export default Navbar;