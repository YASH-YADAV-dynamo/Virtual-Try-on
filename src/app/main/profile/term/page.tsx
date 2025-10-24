"use client";
import { useRouter } from "next/navigation";
import { ArrowLeft } from "lucide-react";

export default function TermsPage() {
  const router = useRouter();

  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      {/* 🔹 Header */}
      <div className="flex items-center justify-between px-4 py-3  ">
        <button
          onClick={() => router.back()}
          className="p-1 rounded-full hover:bg-gray-100"
        >
          <ArrowLeft className="w-5 h-5 text-gray-800" />
        </button>
        <h1 className="text-lg font-bold text-gray-900">T&amp;C</h1>
        <div className="w-5" /> {/* spacing placeholder */}
      </div>

      {/* 🔹 Content Section */}
      <div className="flex-1 p-5 bg-white mx-2 my-6 rounded-2xl shadow-md overflow-y-auto">
        <p className="text-sm text-justify text-gray-800 leading-relaxed">
          Lorem ipsum dolor sit amet consectetur. Eget arcu vel bibendum diam
          fringilla. Proin ut orci et nisi. Ac urna neque sagittis donec
          curabitur pellentesque nisl. Viverra condimentum malesuada eget urna
          lorem amet vulputate facilisis tellus.
          <br />
          <br />
          Lorem ipsum dolor sit amet consectetur. Eget arcu vel bibendum diam
          fringilla. Proin ut orci et nisi. Ac urna neque sagittis donec
          curabitur pellentesque nisl. Viverra condimentum malesuada eget urna
          lorem amet vulputate facilisis tellus.
        </p>
      </div>
    </div>
  );
}
