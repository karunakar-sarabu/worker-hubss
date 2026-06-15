import React, { useState } from 'react'
import axios from 'axios'

const PostJob = () => {

    const [formData, setFormData] = useState({
        title: "",
        description: "",
        location: "",
        wage: "",
        employerPhone: ""
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
            !formData.title ||
            !formData.description ||
            !formData.location ||
            !formData.wage ||
            !formData.employerPhone
        ) {
            // alert("Please fill all fields")
            return
        }

        try {

            const response = await axios.post(
                `${import.meta.env.VITE_API_URL}/api/jobs`,
                formData
            )

            // alert(response.data.message)

            setFormData({
                title: "",
                description: "",
                location: "",
                wage: "",
                employerPhone: ""
            })

        } catch (error) {

            // alert(
            //     error.response?.data?.message ||
            //     "Something went wrong"
            // )

        }
    }

    return (
        <div className="min-h-screen bg-gray-100 flex justify-center items-center p-6">

            <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-lg">

                <h1 className="text-3xl font-bold mb-6 text-center">
                    Post New Job
                </h1>

                <form onSubmit={handleSubmit} className="space-y-4">

                    <input
                        type="text"
                        name="title"
                        placeholder="Job Title"
                        value={formData.title}
                        onChange={handleChange}
                        className="w-full border p-2 rounded"
                    />

                    <textarea
                        name="description"
                        placeholder="Job Description"
                        value={formData.description}
                        onChange={handleChange}
                        className="w-full border p-2 rounded"
                    />

                    <input
                        type="text"
                        name="location"
                        placeholder="Location"
                        value={formData.location}
                        onChange={handleChange}
                        className="w-full border p-2 rounded"
                    />

                    <input
                        type="number"
                        name="wage"
                        placeholder="Daily Wage"
                        value={formData.wage}
                        onChange={handleChange}
                        className="w-full border p-2 rounded"
                    />

                    <input
                        type="text"
                        name="employerPhone"
                        placeholder="Employer Phone"
                        value={formData.employerPhone}
                        onChange={handleChange}
                        className="w-full border p-2 rounded"
                    />

                    <button
                        type="submit"
                        className="w-full bg-blue-600 text-white py-2 rounded"
                    >
                        Post Job
                    </button>

                </form>

            </div>

        </div>
    )
}

export default PostJob