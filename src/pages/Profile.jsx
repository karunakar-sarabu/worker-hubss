import React, { useEffect, useState } from "react";
import axios from "axios";

const Profile = () => {
    const [profile, setProfile] = useState(null);
    const [editing, setEditing] = useState(false);
    const [formData, setFormData] = useState({});
    const [selectedFile, setSelectedFile] = useState(null);
    const [aadhaarFile, setAadhaarFile] = useState(null);
    const [otp, setOtp] = useState("");
    const [otpSent, setOtpSent] = useState(false);


    useEffect(() => {
        fetchProfile();
    }, []);

    const fetchProfile = async () => {
        try {
            const role = localStorage.getItem("role");
            const phone = localStorage.getItem("userPhone");

            const response = await axios.get(
                `${import.meta.env.VITE_API_URL}/api/profile/${role}/${phone}`
            );

            setProfile(response.data);
            setFormData(response.data);
        } catch (error) {
            console.log(error);
        }
    };

    const uploadPhoto = async () => {

        try {

            if (!selectedFile) {
                return alert("Select a photo first");
            }

            const phone =
                localStorage.getItem("userPhone");

            const formData = new FormData();

            formData.append(
                "profilePhoto",
                selectedFile
            );

            await axios.post(
                `${import.meta.env.VITE_API_URL}/api/profile/upload/${phone}`,
                formData
            );

            alert("Photo uploaded successfully");

            fetchProfile();

        } catch (error) {

            console.log(error);

            alert("Upload failed");

        }

    };

    const sendOtp = async () => {

        try {

            await axios.post(
                `${import.meta.env.VITE_API_URL}/api/otp/send`,
                {
                    phone: profile.phone
                }
            );

            setOtpSent(true);

            alert("OTP Sent");

        } catch (error) {

            alert(
                error.response?.data?.message ||
                "Failed to send OTP"
            );

        }

    };

    const verifyOtp = async () => {

        try {

            await axios.post(
                `${import.meta.env.VITE_API_URL}/api/otp/verify`,
                {
                    phone: profile.phone,
                    otp
                }
            );

            alert("Mobile Verified");

            fetchProfile();

        } catch (error) {

            alert(
                error.response?.data?.message ||
                "Invalid OTP"
            );

        }

    };

    const uploadAadhaar = async () => {

        try {

            const formData = new FormData();

            formData.append(
                "aadhaar",
                aadhaarFile
            );

            await axios.post(
                `${import.meta.env.VITE_API_URL}/api/profile/aadhaar-upload/${profile.phone}`,
                formData
            );

            alert("Aadhaar Uploaded");

            fetchProfile();

        } catch (error) {

            alert("Upload Failed");

        }

    };

    const updateProfile = async () => {
        try {
            const role = localStorage.getItem("role");
            const phone = localStorage.getItem("userPhone");

            await axios.put(
                `${import.meta.env.VITE_API_URL}/api/profile/${role}/${phone}`,
                formData
            );



            setEditing(false);
            fetchProfile();
            alert("Profile updated successfully");
        } catch (error) {
            alert(
                error.response?.data?.message ||
                "Failed to update profile"
            );
        }
    };

    if (!profile) {
        return (
            <div className="p-6">
                Loading...
            </div>
        );
    }

    const completionFields = [
        profile.name,
        profile.skill,
        profile.location,
        profile.wage,
        profile.experience,
        profile.about,
    ];

    const completionPercentage =
        Math.round(
            (completionFields.filter(Boolean).length /
                completionFields.length) *
            100
        );

    return (
        <div className="min-h-screen bg-gray-100 p-6">
            <div className="max-w-6xl mx-auto">

                {/* Hero Section */}

                <div className="bg-gradient-to-r from-blue-600 to-indigo-700 text-white p-8 rounded-3xl shadow-xl mb-8">

                    <div className="flex justify-between items-center flex-wrap gap-4">

                        <div>
                            <h1 className="text-xl md:text-5xl font-bold">
                                {profile?.name
                                    ? `👋 Welcome, ${profile.name}`
                                    : `🏢 Welcome, ${profile?.companyName || "User"}`
                                }
                            </h1>

                            <p className="mt-3 text-lg text-blue-100">
                                Manage your professional identity and verification status.
                            </p>
                        </div>

                        <button
                            onClick={() => setEditing(!editing)}
                            className="bg-yellow-500 hover:bg-yellow-600 text-white px-6 py-3 rounded-xl font-semibold"
                        >
                            {editing ? "Cancel Edit" : "Edit Profile"}
                        </button>

                    </div>

                </div>

                {/* Worker Statistics */}

                {localStorage.getItem("role") === "worker" && (

                    <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-8">

                        <div className="bg-white p-5 rounded-2xl shadow">
                            <p className="text-gray-500">
                                Completion
                            </p>

                            <h2 className="text-3xl font-bold text-green-600 mt-2">
                                {completionPercentage}%
                            </h2>
                        </div>

                        <div className="bg-white p-5 rounded-2xl shadow">
                            <p className="text-gray-500">
                                Rating
                            </p>

                            <h2 className="text-3xl font-bold text-yellow-500 mt-2">
                                ⭐ {Number(profile.rating || 0).toFixed(1)}
                            </h2>

                            <p className="text-base font-medium text-gray-500 mt-2">
                                {profile.totalRatings || 0} Ratings
                            </p>
                        </div>

                        <div className="bg-white p-5 rounded-2xl shadow">
                            <p className="text-gray-500">
                                Mobile
                            </p>

                            <h2 className="text-2xl font-bold text-green-600 mt-2">
                                {profile.isMobileVerified
                                    ? "✅ Verified"
                                    : "❌ Pending"}
                            </h2>
                        </div>

                        <div className="bg-white p-5 rounded-2xl shadow">
                            <p className="text-gray-500">
                                Aadhaar
                            </p>

                            <h2 className="text-2xl font-bold text-blue-600 mt-2">
                                {profile.isAadhaarVerified
                                    ? "✅ Verified"
                                    : "⏳ Pending"}
                            </h2>
                        </div>

                    </div>

                )}

                <div className="bg-white rounded-3xl shadow-xl p-8">

                    {/* WORKER EDIT FORM */}

                    {editing &&
                        localStorage.getItem("role") === "worker" && (
                            <>
                                {profile.profilePhoto && (

                                    <img
                                        src={`${import.meta.env.VITE_API_URL}/uploads/${profile.profilePhoto}`}
                                        alt="Profile"
                                        className="w-36 h-36 rounded-full object-cover mx-auto mb-6 border-4 border-blue-100"
                                    />
                                )}

                                <div className="bg-gray-50 rounded-2xl p-6 mb-8 border space-y-4">
                                    <input
                                        type="text"
                                        placeholder="Name"
                                        value={formData.name || ""}
                                        onChange={(e) =>
                                            setFormData({
                                                ...formData,
                                                name: e.target.value,
                                            })
                                        }
                                        className="w-full border p-2 rounded"
                                    />

                                    <input
                                        type="file"
                                        accept="image/*"
                                        onChange={(e) =>
                                            setSelectedFile(e.target.files[0])
                                        }
                                    />
                                    <button
                                        onClick={uploadPhoto}
                                        className="bg-blue-600 text-white w-full py-4 text-lg font-bold rounded-xl rounded"
                                    >
                                        Upload Photo
                                    </button>
                                    <input
                                        type="text"
                                        placeholder="Skill"
                                        value={formData.skill || ""}
                                        onChange={(e) =>
                                            setFormData({
                                                ...formData,
                                                skill: e.target.value,
                                            })
                                        }
                                        className="w-full border p-2 rounded"
                                    />

                                    <input
                                        type="text"
                                        placeholder="Location"
                                        value={formData.location || ""}
                                        onChange={(e) =>
                                            setFormData({
                                                ...formData,
                                                location: e.target.value,
                                            })
                                        }
                                        className="w-full border p-2 rounded"
                                    />

                                    <input
                                        type="number"
                                        placeholder="Daily Wage"
                                        value={formData.wage || ""}
                                        onChange={(e) =>
                                            setFormData({
                                                ...formData,
                                                wage: e.target.value,
                                            })
                                        }
                                        className="w-full border p-2 rounded"
                                    />

                                    <input
                                        type="number"
                                        placeholder="Experience (Years)"
                                        value={formData.experience || ""}
                                        onChange={(e) =>
                                            setFormData({
                                                ...formData,
                                                experience: e.target.value,
                                            })
                                        }
                                        className="w-full border p-2 rounded"
                                    />

                                    <p>
                                        <strong>Rating:</strong>{" "}
                                        ⭐ {profile.rating || 0}
                                        {" "}
                                        ({profile.totalRatings || 0} reviews)
                                    </p>

                                    <textarea
                                        rows="4"
                                        placeholder="About Me"
                                        value={formData.about || ""}
                                        onChange={(e) =>
                                            setFormData({
                                                ...formData,
                                                about: e.target.value,
                                            })
                                        }
                                        className="w-full border p-2 rounded"
                                    />

                                    <button
                                        onClick={updateProfile}
                                        className="bg-green-600 text-white w-full py-4 text-lg font-bold rounded-xl rounded"
                                    >
                                        Update Profile
                                    </button>
                                </div>
                            </>
                        )}

                    {/* EMPLOYER EDIT FORM */}

                    {editing &&
                        localStorage.getItem("role") === "employer" && (
                            <div className="bg-gray-50 rounded-2xl p-6 mb-8 border space-y-4">

                                <input
                                    type="text"
                                    placeholder="Company Name"
                                    value={formData.companyName || ""}
                                    onChange={(e) =>
                                        setFormData({
                                            ...formData,
                                            companyName: e.target.value,
                                        })
                                    }
                                    className="w-full border p-2 rounded"
                                />

                                <input
                                    type="text"
                                    placeholder="Location"
                                    value={formData.location || ""}
                                    onChange={(e) =>
                                        setFormData({
                                            ...formData,
                                            location: e.target.value,
                                        })
                                    }
                                    className="w-full border p-2 rounded"
                                />

                                <button
                                    onClick={updateProfile}
                                    className="bg-green-600 text-white w-full py-4 text-lg font-bold rounded-xl rounded"
                                >
                                    Update Profile
                                </button>
                            </div>
                        )}

                    {/* WORKER PROFILE */}

                    {localStorage.getItem("role") === "worker" ? (
                        <>

                            {profile.profilePhoto && (

                                <img
                                    src={`${import.meta.env.VITE_API_URL}/uploads/${profile.profilePhoto}`}
                                    alt="Profile"
                                    className="w-36 h-36 rounded-full object-cover mx-auto mb-6 border-4 border-blue-100"
                                />
                            )}

                            <div className="mb-6">
                                <div className="flex justify-between mb-2">
                                    <h3 className="text-2xl font-bold text-slate-800 mb-4">
                                        💼 Professional Information
                                    </h3>

                                    <span>
                                        {completionPercentage}%
                                    </span>
                                </div>

                                <div className="w-full bg-gray-200 rounded-full h-4">
                                    <div
                                        className="bg-green-500 h-4 rounded-full"
                                        style={{
                                            width: `${completionPercentage}%`,
                                        }}
                                    />
                                </div>
                            </div>

                            <div className="grid md:grid-cols-2 gap-6">

                                <div className="bg-gray-50 p-4 rounded-xl">
                                    <p className="text-gray-500 text-base font-medium">
                                        Full Name
                                    </p>

                                    <h3 className="text-2xl font-bold text-slate-800">
                                        {profile.name}
                                    </h3>
                                </div>

                                <div className="bg-gray-50 p-4 rounded-xl">
                                    <p className="text-gray-500 text-base font-medium">
                                        Phone Number
                                    </p>

                                    <h3 className="text-2xl font-bold text-slate-800">
                                        {profile.phone}
                                    </h3>
                                </div>

                                <div className="bg-gray-50 p-4 rounded-xl">
                                    <p className="text-gray-500 text-base font-medium">
                                        Skill
                                    </p>

                                    <h3 className="text-2xl font-bold text-slate-800">
                                        {profile.skill}
                                    </h3>
                                </div>

                                <div className="bg-gray-50 p-4 rounded-xl">
                                    <p className="text-gray-500 text-base font-medium">
                                        Location
                                    </p>

                                    <h3 className="text-2xl font-bold text-slate-800">
                                        {profile.location}
                                    </h3>
                                </div>

                                <div className="bg-gray-50 p-4 rounded-xl">
                                    <p className="text-gray-500 text-base font-medium">
                                        Expected Wage
                                    </p>

                                    <h3 className="text-2xl font-bold text-green-600">
                                        ₹{profile.wage}
                                    </h3>
                                </div>

                                <div className="bg-gray-50 p-4 rounded-xl">
                                    <p className="text-gray-500 text-base font-medium">
                                        Experience
                                    </p>

                                    <h3 className="text-2xl font-bold text-purple-600">
                                        {profile.experience || 0} Years
                                    </h3>
                                </div>

                                <div className="md:col-span-2 bg-gray-50 p-4 rounded-xl">
                                    <p className="text-gray-600 text-base font-medium mb-2">
                                        About Me
                                    </p>

                                    <p className="text-lg text-slate-700 leading-relaxed">
                                        {profile.about || "Not added yet"}
                                    </p>
                                </div>

                            </div>

                            <div className="mt-8 bg-gray-50 rounded-2xl p-6 border border-gray-200">
                                <h3 className="text-2xl font-bold text-slate-800 mb-5">
                                    🔒 Verification Status
                                </h3>

                                <div className="mb-4">
                                    <span className={`w-full py-4 text-lg font-bold rounded-xl rounded-full font-semibold ${profile.isMobileVerified
                                        ? "bg-green-100 text-green-700"
                                        : "bg-red-100 text-red-700"
                                        }`}>
                                        {profile.isMobileVerified
                                            ? "📱 Mobile Verified"
                                            : "📱 Mobile Not Verified"}
                                    </span>
                                </div>


                                {!profile.isMobileVerified && (
                                    <div className="mt-3 space-y-2">

                                        {!otpSent ? (

                                            <button
                                                onClick={sendOtp}
                                                className="bg-blue-600 text-white w-full py-4 text-lg font-bold rounded-xl rounded"
                                            >
                                                Send OTP
                                            </button>

                                        ) : (

                                            <>
                                                <input
                                                    type="text"
                                                    placeholder="Enter OTP"
                                                    value={otp}
                                                    onChange={(e) =>
                                                        setOtp(e.target.value)
                                                    }
                                                    className="border p-2 rounded w-full"
                                                />

                                                <button
                                                    onClick={verifyOtp}
                                                    className="bg-green-600 text-white w-full py-4 text-lg font-bold rounded-xl rounded"
                                                >
                                                    Verify OTP
                                                </button>
                                            </>
                                        )}

                                    </div>
                                )}

                                <div className="mb-4">
                                    <span className={`w-full py-4 text-lg font-bold rounded-xl rounded-full font-semibold ${profile.isAadhaarVerified
                                        ? "bg-blue-100 text-blue-700"
                                        : "bg-yellow-100 text-yellow-700"
                                        }`}>
                                        {profile.isAadhaarVerified
                                            ? "🪪 Aadhaar Verified"
                                            : "🪪 Aadhaar Pending"}
                                    </span>
                                </div>

                                {!profile.isAadhaarVerified && (
                                    <div className="mt-3">

                                        <input
                                            type="file"
                                            onChange={(e) =>
                                                setAadhaarFile(
                                                    e.target.files[0]
                                                )
                                            }
                                        />

                                        <button
                                            onClick={uploadAadhaar}
                                            className="bg-blue-600 text-white w-full py-4 text-lg font-bold rounded-xl rounded ml-2"
                                        >
                                            Upload Aadhaar
                                        </button>

                                    </div>
                                )}
                            </div>

                            <div className="mt-6">
                                <a
                                    href={`https://wa.me/91${profile.phone}`}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="w-full md:w-auto bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-xl font-semibold"
                                >
                                    💬 Contact on WhatsApp
                                </a>
                            </div>
                        </>
                    ) : (
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

                            <div>
                                <p className="text-gray-500">
                                    Company Name
                                </p>

                                <h3 className="text-2xl font-bold text-slate-800">
                                    {profile.companyName}
                                </h3>
                            </div>

                            <div>
                                <p className="text-gray-500">
                                    Phone
                                </p>

                                <h3 className="text-2xl font-bold text-slate-800">
                                    {profile.phone}
                                </h3>
                            </div>

                            <div>
                                <p className="text-gray-500">
                                    Location
                                </p>

                                <h3 className="text-2xl font-bold text-slate-800">
                                    {profile.location}
                                </h3>
                            </div>

                            <div>
                                <p className="text-gray-500">
                                    Rating
                                </p>

                                <h3 className="text-2xl font-bold text-yellow-500">
                                    ⭐ {Number(profile.rating || 0).toFixed(1)}
                                </h3>

                                <p className="text-base font-medium text-gray-500">
                                    {profile.totalRatings || 0} Ratings
                                </p>
                            </div>

                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Profile;