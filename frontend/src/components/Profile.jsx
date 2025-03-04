import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom"; // Import useNavigate
import { handleError, handleSuccess } from "../utils";

const API_BASE_URL = import.meta.env.VITE_APP_API_BASE_URL;

function Profile() {
  const navigate = useNavigate(); // Initialize useNavigate hook
  const [userData, setUserData] = useState(null);
  const [editMode, setEditMode] = useState(false);
  const [formData, setFormData] = useState({ username: "", email: "", address: "", mobile: "" });

  const userType = localStorage.getItem("type");

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const response = await fetch(`${API_BASE_URL}/profile/view`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: localStorage.getItem("token"),
          },
        });
        if (!response.ok) {
          handleError("Failed to fetch user data");
          return;
        }
        const result = await response.json();
        // handleSuccess(result.message);
        const data = result.user;
        setUserData(data);
        setFormData({
          username: data.username,
          email: data.email,
          address: data.address,
          mobile: data.mobile,
        });
      } catch (error) {
        handleError("Error fetching user data:", error);
      }
    };
    fetchProfile();
  }, [userType]);

  const handleEditToggle = () => setEditMode(!editMode);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleUpdate = async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/profile/update`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: localStorage.getItem("token"),
        },
        body: JSON.stringify(formData),
      });
      if (!response.ok) {
        handleError("Failed to update user data");
        return;
      }
      const result = await response.json();
      handleSuccess(result.message);
      setUserData(result.updatedUser);
      setEditMode(false);
    } catch (error) {
      handleError("Error updating user data:", error);
    }
  };

  return (
    <div className="p-8 bg-gray-100 min-h-screen flex justify-center items-center">
      <div className="bg-white shadow-lg rounded-lg p-6 max-w-md w-full">
        <button
          onClick={() => navigate(-1)} // Navigate back to the previous page
          className="mb-4 p-2 bg-gray-500 text-white rounded"
        >
          Back
        </button>
        {userData ? (
          <div>
            <div className="flex items-center mb-6">
              <img
                src="https://www.dropbox.com/scl/fi/cesaynt6a06ycp7csnhec/profile.jpg?rlkey=kky5tveen1lqnk561dy1parfk&st=pyr22bf4&dl=1"
                alt="Profile"
                className="w-24 h-24 rounded-full object-cover mr-4 border"
              />
              <div>
                <h2 className="text-2xl font-bold">{userData.username}</h2>
                <p className="text-gray-600">{userType}</p>
              </div>
            </div>
            {editMode ? (
              <div>
                <div className="mb-4">
                  <label className="block text-gray-700 font-medium">Username</label>
                  <input
                    type="text"
                    name="username"
                    value={formData.username}
                    onChange={handleInputChange}
                    className="border p-2 w-full rounded"
                  />
                </div>
                <div className="mb-4">
                  <label className="block text-gray-700 font-medium">Email</label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    className="border p-2 w-full rounded"
                  />
                </div>
                <div className="mb-4">
                  <label className="block text-gray-700 font-medium">Address</label>
                  <input
                    type="text"
                    name="address"
                    value={formData.address}
                    onChange={handleInputChange}
                    className="border p-2 w-full rounded"
                  />
                </div>
                <div className="mb-4">
                  <label className="block text-gray-700 font-medium">Mobile</label>
                  <input
                    type="text"
                    name="mobile"
                    value={formData.mobile}
                    onChange={handleInputChange}
                    className="border p-2 w-full rounded"
                  />
                </div>
                <button
                  onClick={handleUpdate}
                  className="mt-4 p-2 bg-green-500 text-white rounded w-full"
                >
                  Save Changes
                </button>
              </div>
            ) : (
              <div>
                <p className="mb-2">
                  <strong>Username:</strong> {userData.username}
                </p>
                <p className="mb-2">
                  <strong>Email:</strong> {userData.email}
                </p>
                <p className="mb-2">
                  <strong>Address:</strong> {userData.address}
                </p>
                <p className="mb-2">
                  <strong>Mobile:</strong> {userData.mobile}
                </p>

                {userType === "Farmer" && 
                    <p className="mb-2">
                    <strong>My Earnings:</strong> {userData.myEarnings}
                    </p>
                }
                <button
                  onClick={handleEditToggle}
                  className="mt-4 p-2 bg-yellow-500 text-white rounded w-full"
                >
                  Edit Profile
                </button>
              </div>
            )}
          </div>
        ) : (
          <p className="text-gray-500 text-center">Loading...</p>
        )}
      </div>
    </div>
  );
}

export default Profile;
