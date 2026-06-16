import React, { useEffect, useState } from "react";
import axios from "axios";

const Profile = () => {
  const [profile, setProfile] = useState(null);
  const [editing, setEditing] = useState(false);
  const [formData, setFormData] = useState({});

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
      <div className="max-w-2xl mx-auto bg-white rounded-lg shadow-lg p-6">

        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold">
            My Profile
          </h1>

          <button
            onClick={() => setEditing(!editing)}
            className="bg-yellow-500 text-white px-4 py-2 rounded"
          >
            {editing ? "Cancel" : "Edit Profile"}
          </button>
        </div>

        {/* WORKER EDIT FORM */}

        {editing &&
          localStorage.getItem("role") === "worker" && (
            <div className="space-y-3 mb-6 border-b pb-6">

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
                className="bg-green-600 text-white px-4 py-2 rounded"
              >
                Update Profile
              </button>
            </div>
          )}

        {/* EMPLOYER EDIT FORM */}

        {editing &&
          localStorage.getItem("role") === "employer" && (
            <div className="space-y-3 mb-6 border-b pb-6">

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
                className="bg-green-600 text-white px-4 py-2 rounded"
              >
                Update Profile
              </button>
            </div>
          )}

        {/* WORKER PROFILE */}

        {localStorage.getItem("role") === "worker" ? (
          <>
            <div className="mb-6">
              <div className="flex justify-between mb-2">
                <span className="font-semibold">
                  Profile Completion
                </span>

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

            <div className="space-y-2">
              <p>
                <strong>Name:</strong> {profile.name}
              </p>

              <p>
                <strong>Phone:</strong> {profile.phone}
              </p>

              <p>
                <strong>Skill:</strong> {profile.skill}
              </p>

              <p>
                <strong>Location:</strong> {profile.location}
              </p>

              <p>
                <strong>Wage:</strong> ₹{profile.wage}
              </p>

              <p>
                <strong>Experience:</strong>{" "}
                {profile.experience || 0} Years
              </p>

              <p>
                <strong>About:</strong>{" "}
                {profile.about || "Not added yet"}
              </p>
            </div>

            <div className="mt-6 border-t pt-4">
              <h3 className="font-bold mb-3">
                Verification Status
              </h3>

              <p>
                Mobile:{" "}
                {profile.isMobileVerified
                  ? "✅ Verified"
                  : "❌ Not Verified"}
              </p>

              <p>
                Aadhaar:{" "}
                {profile.isAadhaarVerified
                  ? "✅ Verified"
                  : "⏳ Pending"}
              </p>
            </div>

            <div className="mt-6">
              <a
                href={`https://wa.me/91${profile.phone}`}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-green-600 text-white px-4 py-2 rounded inline-block"
              >
                WhatsApp
              </a>
            </div>
          </>
        ) : (
          <>
            <p>
              <strong>Company Name:</strong>{" "}
              {profile.companyName}
            </p>

            <p>
              <strong>Phone:</strong>{" "}
              {profile.phone}
            </p>

            <p>
              <strong>Location:</strong>{" "}
              {profile.location}
            </p>
          </>
        )}
      </div>
    </div>
  );
};

export default Profile;