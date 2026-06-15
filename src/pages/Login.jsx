// import React from 'react'

// const Login = () => {
//   return (
//     <div>Login</div>
//   )
// }

// export default Login
import React, { useState } from 'react'
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Login = () => {
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        phone: "",
        password: ""
    })

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        })
    }

    // const handleSubmit = (e) => {
    //     e.preventDefault()

    //     if (
    //         !formData.phone ||
    //         !formData.password
    //     ) {
    //         alert("Please fill all fields")
    //         return
    //     }

    //     console.log(formData)
    // }
    const handleSubmit = async (e) => {

        e.preventDefault()

        if (
            !formData.phone ||
            !formData.password
        ) {
            // alert("Please fill all fields")
            return
        }

        try {

            const response = await axios.post(
                `${import.meta.env.VITE_API_URL}/api/login`,
                formData
            );

            // alert(response.data.message);

            localStorage.setItem(
                "token",
                response.data.token
            );

            localStorage.setItem(
                "role",
                response.data.role
            );

            localStorage.setItem(
                "userPhone",
                response.data.phone
            );

            if (response.data.role === "worker") {
                navigate("/worker-dashboard");
            } else {
                navigate("/employer-dashboard");
            }

            setFormData({
                phone: "",
                password: ""
            });

        } catch (error) {

            // alert(
            //     error.response?.data?.message ||
            //     "Something went wrong"
            // );

        }
    }
    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100 py-10">

            <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">

                <h1 className="text-3xl font-bold text-center mb-6">
                    Login
                </h1>

                <form onSubmit={handleSubmit} className="space-y-4">

                    <div>
                        <label className="block mb-1 font-medium">
                            Phone Number
                        </label>

                        <input
                            type="tel"
                            name="phone"
                            placeholder="Enter phone number"
                            className="w-full border border-gray-300 rounded-lg px-3 py-2 outline-none"
                            value={formData.phone}
                            onChange={handleChange}
                        />
                    </div>

                    <div>
                        <label className="block mb-1 font-medium">
                            Password
                        </label>

                        <input
                            type="password"
                            name="password"
                            placeholder="Enter password"
                            className="w-full border border-gray-300 rounded-lg px-3 py-2 outline-none"
                            value={formData.password}
                            onChange={handleChange}
                        />
                    </div>

                    <button
                        type="submit"
                        className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700"
                    >
                        Login
                    </button>

                </form>

            </div>

        </div>
    )
}

export default Login