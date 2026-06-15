import React, { useEffect, useState } from "react";
import axios from "axios";

const Profile = () => {
    // console.log("profile page loaded")
    const [profile, setProfile] = useState(null);
    const [editing, setEditing] = useState(false);
    const [formData, setFormData] = useState({});

    useEffect(() => {

        fetchProfile();

    }, []);

    const fetchProfile = async () => {

        try {

            const role =
                localStorage.getItem("role");

            const phone =
                localStorage.getItem("userPhone");

            const response = await axios.get(
                `${import.meta.env.VITE_API_URL}/api/profile/${role}/${phone}`
            );

            setProfile(response.data);
            console.log(response.data);

        } catch (error) {

            console.log(error);

        }

    };

    if (!profile) {

        return (
            <div className="p-6">
                Loading...
            </div>
        );

    }

    const updateProfile = async () => {

        try {

            const role =
                localStorage.getItem("role");

            const phone =
                localStorage.getItem("userPhone");

            const response = await axios.put(
                `http://localhost:5000/api/profile/${role}/${phone}`,
                formData
            );

            // alert(response.data.message);

            setEditing(false);

            fetchProfile();

        } catch (error) {

            // alert(
            //     error.response?.data?.message ||
            //     "Something went wrong"
            // );

        }

    };

    return (
        <div className="min-h-screen bg-gray-100 p-6">

            <div className="max-w-xl mx-auto bg-white p-6 rounded-lg shadow">

                <button
                    onClick={() => setEditing(true)}
                    className="bg-yellow-500 text-white px-4 py-2 rounded mb-4"
                >
                    Edit Profile
                </button>
                {/* <p>Editing: {editing ? "YES" : "NO"}</p> */}
                {editing && localStorage.getItem("role") === "worker" && (

                    <div className="mb-6 space-y-3">

                        <input
                            type="text"
                            placeholder="Name"
                            value={formData.name || ""}
                            onChange={(e) =>
                                setFormData({
                                    ...formData,
                                    name: e.target.value
                                })
                            }
                            className="w-full border p-2"
                        />

                        <input
                            type="text"
                            placeholder="Skill"
                            value={formData.skill || ""}
                            onChange={(e) =>
                                setFormData({
                                    ...formData,
                                    skill: e.target.value
                                })
                            }
                            className="w-full border p-2"
                        />

                        <input
                            type="text"
                            placeholder="Location"
                            value={formData.location || ""}
                            onChange={(e) =>
                                setFormData({
                                    ...formData,
                                    location: e.target.value
                                })
                            }
                            className="w-full border p-2"
                        />

                        <input
                            type="number"
                            placeholder="Wage"
                            value={formData.wage || ""}
                            onChange={(e) =>
                                setFormData({
                                    ...formData,
                                    wage: e.target.value
                                })
                            }
                            className="w-full border p-2"
                        />

                        <button
                            onClick={updateProfile}
                            className="bg-green-600 text-white px-4 py-2 rounded"
                        >
                            Update Profile
                        </button>

                    </div>

                )}

                {editing && localStorage.getItem("role") === "employer" && (

                    <div className="mb-6 space-y-3">

                        <input
                            type="text"
                            placeholder="Company Name"
                            value={formData.companyName || ""}
                            onChange={(e) =>
                                setFormData({
                                    ...formData,
                                    companyName: e.target.value
                                })
                            }
                            className="w-full border p-2"
                        />

                        <input
                            type="text"
                            placeholder="Location"
                            value={formData.location || ""}
                            onChange={(e) =>
                                setFormData({
                                    ...formData,
                                    location: e.target.value
                                })
                            }
                            className="w-full border p-2"
                        />

                        <button
                            onClick={updateProfile}
                            className="bg-green-600 text-white px-4 py-2 rounded"
                        >
                            Update Profile
                        </button>

                    </div>

                )}










                {localStorage.getItem("role") === "worker" ? (

                    <>

                        <p>
                            <strong>Name:</strong>
                            {" "}
                            {profile.name}
                        </p>

                        <p>
                            <strong>Phone:</strong>
                            {" "}
                            {profile.phone}
                        </p>

                        <p>
                            <strong>Skill:</strong>
                            {" "}
                            {profile.skill}
                        </p>

                        <p>
                            <strong>Location:</strong>
                            {" "}
                            {profile.location}
                        </p>

                        <p>
                            <strong>Wage:</strong>
                            {" "}
                            ₹{profile.wage}
                        </p>

                    </>

                ) : (

                    <>

                        <p>
                            <strong>Company Name:</strong>
                            {" "}
                            {profile.companyName}
                        </p>

                        <p>
                            <strong>Phone:</strong>
                            {" "}
                            {profile.phone}
                        </p>

                        <p>
                            <strong>Location:</strong>
                            {" "}
                            {profile.location}
                        </p>

                    </>

                )}

            </div>

        </div>
    );
};

export default Profile;