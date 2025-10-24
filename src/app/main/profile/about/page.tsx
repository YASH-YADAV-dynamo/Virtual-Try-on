"use client";
import { useRouter } from "next/navigation";
import { ArrowLeft, ClipboardList } from "lucide-react";

export default function AboutPage() {
  const router = useRouter();

  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      {/* 🔹 Header */}
      <div className="flex items-center justify-between px-4 py-3 bg-white shadow-sm rounded-b-xl">
        <button
          onClick={() => router.back()}
          className="p-1 rounded-full hover:bg-gray-100"
        >
          <ArrowLeft className="w-5 h-5 text-gray-800" />
        </button>
        <h1 className="text-lg font-bold text-gray-900">About</h1>
        <div className="w-5" /> {/* spacing placeholder */}
      </div>

      {/* 🔹 Version Box */}
      <div className="px-4 mt-6">
        <div className="bg-white border border-gray-200 rounded-xl p-4 shadow-sm flex flex-col">
          <div className="flex items-center gap-2 mb-1">
            <ClipboardList className="w-4 h-4 text-gray-700" />
            <span className="text-sm font-medium text-gray-800">version</span>
          </div>
          <span className="text-sm text-gray-600">0.1.0</span>
        </div>
      </div>
    </div>
  );
}
