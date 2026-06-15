// import React from 'react'

// const EmployerRegister = () => {
//   return (
//     <div>EmployerRegister</div>
//   )
// }

// export default EmployerRegister
import React, { useState } from 'react'
import axios from "axios";
const EmployerRegister = () => {

    const [formData, setFormData] = useState({
        companyName: "",
        phone: "",
        location: "",
        password: ""
    })

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        })
    }

    const handleSubmit = async (e) => {
        e.preventDefault()

        if (
            !formData.companyName ||
            !formData.phone ||
            !formData.location ||
            !formData.password
        ) {
            // alert("Please fill all fields")
            return
        }
        try {

            const response = await axios.post(
                `${import.meta.env.VITE_API_URL}/api/employers/register`,
                formData
            );

            // alert(response.data.message);

            setFormData({
                companyName: "",
                phone: "",
                location: "",
                password: ""
            });

        } catch (error) {

            alert(
                error.response?.data?.message ||
                "Something went wrong"
            );

        }

        console.log(formData)
        console.log(response.data.message)
    }

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100 py-10">

            <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">

                <h1 className="text-3xl font-bold text-center mb-6">
                    Employer Registration
                </h1>

                <form onSubmit={handleSubmit} className="space-y-4">

                    <div>
                        <label className="block mb-1 font-medium">
                            Company / Employer Name
                        </label>

                        <input
                            type="text"
                            name="companyName"
                            placeholder="Enter company name"
                            className="w-full border border-gray-300 rounded-lg px-3 py-2 outline-none"
                            value={formData.companyName}
                            onChange={handleChange}
                        />
                    </div>

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
                            Location
                        </label>

                        <input
                            type="text"
                            name="location"
                            placeholder="Enter location"
                            className="w-full border border-gray-300 rounded-lg px-3 py-2 outline-none"
                            value={formData.location}
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
                        className="w-full bg-green-600 text-white py-2 rounded-lg hover:bg-green-700"
                    >
                        Register
                    </button>

                </form>

            </div>

        </div>
    )
}

export default EmployerRegister