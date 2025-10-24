"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { signOut } from "firebase/auth";
import { auth } from "@/firebase/firebase";

export default function LogoutPage() {
  const [showPopup, setShowPopup] = useState(false);
  const router = useRouter();

  const handleLogout = async () => {
    try {
      await signOut(auth);
      router.push("/login"); // Redirect after logout
    } catch (error) {
      console.error("Logout error:", error);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-white relative">
      {/* Logout Button */}
      <button
        onClick={() => setShowPopup(true)}
        className="px-6 py-3 bg-red-600 text-white rounded-md hover:bg-red-700 text-lg shadow-md transition-all"
      >
        Logout
      </button>

      {/* Confirmation Card Popup */}
      {showPopup && (
        <div className="fixed inset-0 bg-black bg-opacity-30 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl shadow-2xl p-6 w-[320px] relative animate-in fade-in zoom-in duration-300">
            {/* Close Button */}
            <button
              onClick={() => setShowPopup(false)}
              className="absolute top-3 right-3 text-gray-400 hover:text-gray-600 transition-colors p-1"
            >
              ✕
            </button>

            {/* Card Content */}
            <h2 className="text-lg font-semibold text-gray-900 text-center mb-3">
              Are you sure you want to log out?
            </h2>
            <p className="text-gray-600 text-center mb-6 text-sm leading-relaxed">
              Clicking "Yes" will sign you out of your account.
            </p>

            {/* Buttons */}
            <div className="flex justify-center gap-4">
              <button
                onClick={handleLogout}
                className="px-5 py-2 bg-gray-300 rounded-md text-black font-semibold hover:bg-gray-400 transition-all"
              >
                Yes
              </button>
              <button
                onClick={() => setShowPopup(false)}
                className="px-5 py-2 bg-red-600 rounded-md text-white font-semibold hover:bg-red-700 transition-all"
              >
                No
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
