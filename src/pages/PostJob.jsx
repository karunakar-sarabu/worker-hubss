import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const PostJob = () => {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const [loadingAI, setLoadingAI] = useState(false);

    const [formData, setFormData] = useState({
        title: "",
        description: "",
        location: "",
        wage: "",
    });



    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };


    const handleGenerateDescription = async () => {

        if (
            !formData.title ||
            !formData.location ||
            !formData.wage
        ) {
            alert("Please enter title, location and wage first");
            return;
        }

        try {

            setLoadingAI(true);

            const response = await axios.post(
                `${import.meta.env.VITE_API_URL}/api/ai/generate-job-description`,
                {
                    title: formData.title,
                    skill: formData.title,
                    location: formData.location,
                    wage: formData.wage,
                }
            );

            setFormData({
                ...formData,
                description: response.data.description,
            });

        } catch (error) {

            alert("Failed to generate description");

        } finally {

            setLoadingAI(false);

        }
    };
    const handleSubmit = async (e) => {
        e.preventDefault();

        if (
            !formData.title ||
            !formData.description ||
            !formData.location ||
            !formData.wage
        ) {
            alert("Please fill all fields");
            return;
        }

        try {
            setLoading(true);

            await axios.post(
                `${import.meta.env.VITE_API_URL}/api/jobs`,
                {
                    ...formData,
                    employerPhone:
                        localStorage.getItem("userPhone") || "",
                }
            );

            alert("Job posted successfully");

            navigate("/my-jobs");

        } catch (error) {

            alert(
                error.response?.data?.message ||
                "Failed to post job"
            );

        } finally {

            setLoading(false);

        }
    };

    return (
        <div className="min-h-screen bg-gray-100 p-6">

            <div className="max-w-6xl mx-auto">

                {/* Hero Section */}

                <div className="bg-gradient-to-r from-blue-600 to-cyan-600 text-white rounded-3xl shadow-xl p-8 mb-8">

                    <h1 className="text-4xl md:text-5xl font-bold">
                        📢 Post a New Job
                    </h1>

                    <p className="mt-4 text-lg text-blue-100">
                        Reach skilled workers, receive applications,
                        and hire faster with Daily Wage Connect.
                    </p>

                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

                    {/* Form Section */}

                    <div className="lg:col-span-2 bg-white rounded-3xl shadow-lg p-8">

                        <h2 className="text-3xl font-bold text-slate-800 mb-6">
                            Job Details
                        </h2>

                        <form
                            onSubmit={handleSubmit}
                            className="space-y-5"
                        >

                            <div>
                                <label className="block font-semibold mb-2">
                                    Job Title
                                </label>

                                <input
                                    type="text"
                                    name="title"
                                    placeholder="Electrician, Plumber, Carpenter..."
                                    value={formData.title}
                                    onChange={handleChange}
                                    className="w-full border border-gray-300 rounded-xl p-3 focus:ring-2 focus:ring-blue-400 outline-none"
                                />
                            </div>

                            <div>
                                <label className="block font-semibold mb-2">
                                    Job Description
                                </label>

                                <button
                                    type="button"
                                    onClick={handleGenerateDescription}
                                    disabled={loadingAI}
                                    className="mb-3 bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-lg font-semibold disabled:bg-gray-400"
                                >
                                    {loadingAI
                                        ? "Generating..."
                                        : "✨ Generate with AI"}
                                </button>

                                <textarea
                                    name="description"
                                    rows="5"
                                    placeholder="Describe the work requirements..."
                                    value={formData.description}
                                    onChange={handleChange}
                                    className="w-full border border-gray-300 rounded-xl p-3 focus:ring-2 focus:ring-blue-400 outline-none"
                                />
                            </div>

                            <div>
                                <label className="block font-semibold mb-2">
                                    Location
                                </label>

                                <input
                                    type="text"
                                    name="location"
                                    placeholder="Hyderabad"
                                    value={formData.location}
                                    onChange={handleChange}
                                    className="w-full border border-gray-300 rounded-xl p-3 focus:ring-2 focus:ring-blue-400 outline-none"
                                />
                            </div>

                            <div>
                                <label className="block font-semibold mb-2">
                                    Daily Wage (₹)
                                </label>

                                <input
                                    type="number"
                                    name="wage"
                                    placeholder="1000"
                                    value={formData.wage}
                                    onChange={handleChange}
                                    className="w-full border border-gray-300 rounded-xl p-3 focus:ring-2 focus:ring-blue-400 outline-none"
                                />
                            </div>

                            <button
                                type="submit"
                                disabled={loading}
                                className="w-full bg-blue-600 hover:bg-blue-700 text-white py-4 rounded-xl font-bold text-lg transition-all duration-300 disabled:bg-gray-400"
                            >
                                {loading
                                    ? "Posting Job..."
                                    : "Post Job"}
                            </button>

                        </form>

                    </div>

                    {/* Right Side Panel */}

                    <div className="space-y-6">

                        <div className="bg-white rounded-3xl shadow-lg p-6">

                            <h3 className="text-2xl font-bold text-blue-700 mb-4">
                                Why Post Here?
                            </h3>

                            <div className="space-y-3 text-gray-700">

                                <p>
                                    ✅ Reach local skilled workers
                                </p>

                                <p>
                                    ✅ Hire faster
                                </p>

                                <p>
                                    ✅ Verified worker profiles
                                </p>

                                <p>
                                    ✅ WhatsApp communication
                                </p>

                                <p>
                                    ✅ Easy applicant management
                                </p>

                            </div>

                        </div>

                        <div className="bg-gradient-to-r from-green-500 to-emerald-600 text-white rounded-3xl shadow-lg p-6">

                            <h3 className="text-2xl font-bold mb-3">
                                Hiring Tip
                            </h3>

                            <p>
                                Jobs with clear descriptions,
                                accurate wages and locations
                                usually receive more applications.
                            </p>

                        </div>

                    </div>

                </div>

            </div>

        </div>
    );
};

export default PostJob;