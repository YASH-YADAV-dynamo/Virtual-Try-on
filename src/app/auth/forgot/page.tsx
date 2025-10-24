"use client";

import React, { useState } from "react";
import { IoArrowBack, IoMail } from "react-icons/io5";
import toast, { Toaster } from "react-hot-toast";
import { sendPasswordResetEmail } from "firebase/auth";
import { auth } from "@/firebase/firebase"; // make sure this path is correct

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [showToast, setShowToast] = useState(false); // Track toast visibility

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!email) {
      toast.error("Please enter your email address");
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      toast.error("Please enter a valid email address");
      return;
    }

    setIsLoading(true);

    try {
      // 🔹 Send Firebase password reset email
      await sendPasswordResetEmail(auth, email);
      setIsLoading(false);

      // 🔹 Show custom success toast
      setShowToast(true);
      toast.custom(() => (
        <div className="fixed inset-0 z-50 flex items-start justify-center pointer-events-none">
          {/* Blurred backdrop */}
          <div className="absolute inset-0 bg-black/30 backdrop-blur-sm"></div>

          {/* Toast card */}
          <div className="relative bg-white rounded-2xl shadow-2xl p-6 w-[320px] pointer-events-auto mt-64 animate-fadeIn">
            {/* Email Icon */}
            <div className="flex justify-center mb-4">
              <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center">
                <div className="w-12 h-8 bg-blue-600 rounded flex items-center justify-center">
                  <IoMail className="w-4 h-4 text-white" />
                </div>
              </div>
            </div>

            {/* Title */}
            <h2 className="text-lg font-semibold text-gray-900 text-center mb-3">
              Check Your Email!
            </h2>

            {/* Description */}
            <p className="text-gray-600 text-center mb-6 text-sm leading-relaxed">
              We've sent a password reset link to your email. It's valid for 24 hours.
            </p>

            {/* Button */}
            <button
              onClick={() => window.open("mailto:" + email, "_blank")}
              className="w-full bg-black text-white py-3 rounded-full font-medium hover:bg-gray-800 transition-colors duration-200"
            >
              Open Mail App
            </button>
          </div>
        </div>
      ));

      // 🔹 Remove blur after toast disappears
      setTimeout(() => setShowToast(false), 5000);
    } catch (err: any) {
      console.error("Password reset error:", err);
      toast.error(err?.message || "Failed to send reset email");
      setIsLoading(false);
    }
  };

  return (
    <div className="relative">
      <Toaster /> {/* Toast container */}

      {/* Main content wrapper */}
      <div className={`${showToast ? "blur-sm" : ""} transition-all duration-300`}>
        <div className="flex items-center justify-center min-h-screen bg-gray-100">
          <div className="w-[380px] h-[500px] bg-white p-6 rounded-2xl shadow-md flex flex-col justify-start pt-10">
            {/* Header */}
            <div className="relative flex items-center justify-center mb-6">
              <button
                type="button"
                className="absolute left-0 text-xl hover:text-blue-600 transition-colors"
                onClick={() => window.history.back()}
              >
                <IoArrowBack />
              </button>
              <h2 className="text-2xl font-semibold">Forgot Password</h2>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit} className="flex flex-col flex-1">
              <div className="mb-4">
                <label htmlFor="email" className="block text-sm font-medium mb-1">
                  Email
                </label>
                <input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email"
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400 disabled:bg-gray-100 disabled:cursor-not-allowed"
                  disabled={isLoading}
                  required
                />
              </div>

              <button
                type="submit"
                disabled={isLoading || !email.trim()}
                className="w-full bg-blue-500 text-white py-3 rounded-lg hover:bg-blue-600 disabled:opacity-50 disabled:cursor-not-allowed transition-colors flex items-center justify-center"
              >
                {isLoading ? (
                  <div className="flex items-center">
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
                    Sending...
                  </div>
                ) : (
                  "Submit"
                )}
              </button>
            </form>
          </div>
        </div>
      </div>

      {/* Tailwind animation */}
      <style>
        {`
          @keyframes fadeIn {
            from { opacity: 0; transform: translateY(20px); }
            to { opacity: 1; transform: translateY(0); }
          }
          .animate-fadeIn {
            animation: fadeIn 0.3s ease-out forwards;
          }
        `}
      </style>
    </div>
  );
}
