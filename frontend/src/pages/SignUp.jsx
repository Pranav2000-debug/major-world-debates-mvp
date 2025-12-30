/* eslint-disable no-unused-vars */
import React, { useState, useRef, useCallback } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import { toast, Toaster } from "react-hot-toast";
import { useUsernameAvailability } from "../hooks/usernameAvailibility";

const Signup = () => {
  const navigate = useNavigate();
  const { status: usernameStatus, checkUsername, reset } = useUsernameAvailability();

  const [formData, setFormData] = useState({
    fullname: "",
    username: "",
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (name === "username") {
      const trimmed = value.trim();

      // too short → stop checking + clear state
      if (trimmed.length < 4) {
        reset();
        return;
      }
      checkUsername(trimmed);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const { fullname, username, email, password } = formData;

    // -------- Frontend sanity checks --------

    if (!fullname.trim() || !username.trim() || !email.trim() || !password.trim()) {
      toast.error("All fields are required.");
      return;
    }

    // fullname: letters and spaces only
    const nameRegex = /^[A-Za-z\s]+$/;
    if (!nameRegex.test(fullname)) {
      toast.error("Full name can only contain letters and spaces.");
      return;
    }

    // username: basic length check (backend will enforce uniqueness)
    if (username.length < 4) {
      toast.error("Username must be at least 3 characters.");
      return;
    }

    // email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      toast.error("Please enter a valid email address.");
      return;
    }

    // password constraints (keep light; backend is authority)
    if (password.length < 6) {
      toast.error("Password must be at least 6 characters.");
      return;
    }

    // -------- API call --------

    try {
      const res = await axios.post("http://localhost:4000/api/v1/auth/sign-up", { fullname, username, email, password }, { withCredentials: true });
      toast.success("Signup successful! Please verify your email.");
      navigate("/login");
    } catch (error) {
      if (error.response?.data?.message) {
        toast.error(error.response.data.message);
      } else {
        toast.error("Signup failed. Please try again.");
      }
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-900 px-4">
      <Toaster
        position="top-center"
        toastOptions={{
          style: {
            background: "#363636",
            color: "#fff",
          },
        }}
      />

      <div className="max-w-md w-full bg-gray-800 p-8 rounded-xl shadow-lg">
        <h2 className="text-3xl font-bold text-white text-center mb-6">Sign Up</h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-gray-300 mb-1">Full Name</label>
            <input
              type="text"
              name="fullname"
              value={formData.fullname}
              onChange={handleChange}
              className="w-full px-4 py-2 rounded-lg bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-yellow-400"
            />
          </div>

          <div>
            <label className="block text-gray-300 mb-1">Username</label>
            <input
              type="text"
              name="username"
              value={formData.username}
              onChange={handleChange}
              className="w-full px-4 py-2 rounded-lg bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-yellow-400"
            />
            {usernameStatus === "checking" && <p className="text-sm text-gray-400 mt-1">Checking username…</p>}

            {usernameStatus === "available" && <p className="text-sm text-green-400 mt-1">Username available ✓</p>}

            {usernameStatus === "taken" && <p className="text-sm text-red-400 mt-1">Username already taken</p>}
          </div>

          <div>
            <label className="block text-gray-300 mb-1">Email</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="w-full px-4 py-2 rounded-lg bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-yellow-400"
            />
          </div>

          <div>
            <label className="block text-gray-300 mb-1">Password</label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              className="w-full px-4 py-2 rounded-lg bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-yellow-400"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-yellow-400 text-black font-semibold py-2 rounded-lg hover:bg-yellow-300 transition-colors duration-300">
            Sign Up
          </button>
        </form>

        <p className="text-gray-400 text-sm mt-4 text-center">
          Already have an account?{" "}
          <Link to="/login" className="text-yellow-400 hover:text-yellow-300">
            Log In
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Signup;
