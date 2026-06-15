import React, { useState } from 'react'
import axios from "axios";
const WorkerRegister = () => {
    const [formData, setFormData] = useState({
        name: "",
        phone: "",
        skill: "",
        location: "",
        wage: "",
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
            !formData.name ||
            !formData.phone ||
            !formData.skill ||
            !formData.location ||
            !formData.wage ||
            !formData.password
        ) {
            // alert("Please fill all fields")
            return
        }

        try {
            console.log("API URL =", import.meta.env.VITE_API_URL);
            const response = await axios.post(
                `${import.meta.env.VITE_API_URL}/api/workers/register`,
                formData
            )

            // alert(response.data.message)

            setFormData({
                name: "",
                phone: "",
                skill: "",
                location: "",
                wage: "",
                password: ""
            })

            console.log(response.data)

        } catch (error) {

            // alert(error.response?.data?.message || "Something went wrong")

        }
    }
    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100 py-10">

            <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">

                <h1 className="text-3xl font-bold text-center mb-6">
                    Worker Registration
                </h1>

                <form onSubmit={handleSubmit} className="space-y-4">

                    <div>
                        <label className="block mb-1 font-medium">
                            Full Name
                        </label>
                        <input
                            type="text"
                            name="name"
                            placeholder="Enter your name"
                            className="w-full border border-gray-300 rounded-lg px-3 py-2 outline-none"
                            value={formData.name}
                            onChange={handleChange}
                        />
                        {/* <input
                            type="text"
                            placeholder="Enter your name"
                            className="w-full border border-gray-300 rounded-lg px-3 py-2 outline-none"
                        /> */}
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
                        {/* <input
                            type="tel"
                            placeholder="Enter phone number"
                            className="w-full border border-gray-300 rounded-lg px-3 py-2 outline-none"
                        /> */}
                    </div>

                    <div>
                        <label className="block mb-1 font-medium">
                            Skill Category
                        </label>
                        <select
                            name="skill"
                            className="w-full border border-gray-300 rounded-lg px-3 py-2 outline-none"
                            value={formData.skill}
                            onChange={handleChange}
                        >
                            <option value="">Select Skill</option>
                            <option value="Construction">Construction</option>
                            <option value="Agriculture">Agriculture</option>
                            <option value="Electrician">Electrician</option>
                            <option value="Plumber">Plumber</option>
                            <option value="Painter">Painter</option>
                            <option value="Carpenter">Carpenter</option>
                        </select>
                        {/* <select className="w-full border border-gray-300 rounded-lg px-3 py-2 outline-none">
                            <option>Construction</option>
                            <option>Agriculture</option>
                            <option>Electrician</option>
                            <option>Plumber</option>
                            <option>Painter</option>
                            <option>Carpenter</option>
                        </select> */}
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
                        {/* <input
                            type="text"
                            placeholder="Enter location"
                            className="w-full border border-gray-300 rounded-lg px-3 py-2 outline-none"
                        /> */}
                    </div>

                    <div>
                        <label className="block mb-1 font-medium">
                            Expected Daily Wage
                        </label>
                        <input
                            type="number"
                            name="wage"
                            placeholder="Enter expected wage"
                            className="w-full border border-gray-300 rounded-lg px-3 py-2 outline-none"
                            value={formData.wage}
                            onChange={handleChange}
                        />
                        {/* <input
                            type="number"
                            placeholder="Enter expected wage"
                            className="w-full border border-gray-300 rounded-lg px-3 py-2 outline-none"
                        /> */}
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
                        {/* <input
                            type="password"
                            placeholder="Enter password"
                            className="w-full border border-gray-300 rounded-lg px-3 py-2 outline-none"
                        /> */}
                    </div>

                    <button
                        type="submit"
                        className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700"
                    >
                        Register
                    </button>

                </form>

            </div>

        </div>
    )
}

export default WorkerRegister