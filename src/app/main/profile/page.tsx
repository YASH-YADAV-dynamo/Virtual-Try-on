"use client";
import { ArrowLeft, Heart, MapPin, Info, LogOut, FileText, Edit } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { IoArrowBack } from "react-icons/io5";


export default function ProfilePage() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
        <div className="relative flex items-center justify-center mb-6">
                <button
                  type="button"
                  className="absolute left-3 text-xl"
                  onClick={() => window.history.back()} 
                >
                  <IoArrowBack />
                </button>
                <h2 className="text-3xl font-semibold">Profile</h2>
              </div>

      {/* Profile Section */}
      <div className="flex flex-col items-center mt-6">
        <Image
          src="/profile1.png"
          alt="Profile"
          width={90}
          height={90}
          className="rounded-full"
        />
        <h2 className="mt-3 text-lg font-semibold">Sahil Srivastava</h2>
        <p className="text-gray-500 text-sm">sahil@gmail.com</p>
      </div>

      {/* Options List */}
      <div className="mt-8 space-y-5 px-6">
        <ProfileItem icon={<Edit size={20} />} label="Edit profile" />
        <ProfileItem icon={<Heart size={20} />} label="Favourites" />
        <ProfileItem icon={<MapPin size={20} />} label="Location" />
        <ProfileItem icon={<Info size={20} />} label="About" />
        <ProfileItem icon={<LogOut size={20} />} label="Logout" />
        <ProfileItem icon={<FileText size={20} />} label="Terms & Conditions" />
      </div>
    </div>
  );
}

function ProfileItem({ icon, label }: { icon: React.ReactNode; label: string }) {
  return (
    <button className="w-full flex items-center justify-between bg-white border border-gray-300 rounded-xl px-4 py-5 rounded-lg shadow-sm">
      <div className="flex items-center gap-3 text-gray-700">
        {icon}
        <span className="text-sm font-medium">{label}</span>
      </div>
      <span className="text-gray-500">&gt;</span>
    </button>
  );
}
