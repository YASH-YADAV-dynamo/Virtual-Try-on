"use client";
import Image from "next/image";
import { Search } from "lucide-react";
import { useState } from "react";
import { AiOutlineHeart, AiFillHeart } from "react-icons/ai";
import { useWishlistStore } from "../store/wishlistStore";

export default function HomePage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const { wishlist, toggleWishlist } = useWishlistStore();

  // ✅ Products with category info
  const products = [
    { id: 1, name: "Top man black", price: "₹540", image: "/image1.png", category: "Glasses" },
    { id: 2, name: "Deep grey essential jogger", price: "₹840", image: "/image1.png", category: "Hats" },
    { id: 3, name: "Top man black with Trousers", price: "₹690", image: "/image1.png", category: "Earrings" },
    { id: 4, name: "Grey coat and white T-shirt", price: "₹710", image: "/image1.png", category: "Nose Pins" },
    { id: 5, name: "Grey coat and white T-shirt", price: "₹599", image: "/image1.png", category: "Glasses" },
    { id: 6, name: "Grey coat and white T-shirt", price: "₹409", image: "/image1.png", category: "Hats" },
  ];

  // ✅ Categories
  const categories = [
    { name: "Glasses", icon: "/glasses.png" },
    { name: "Hats", icon: "/hat.jpg" },
    { name: "Earrings", icon: "/earrings.jpg" },
    { name: "Nose Pins", icon: "/nosepin.jpg" },
  ];

  // ✅ Combined search + category filter
  const filteredProducts = products.filter((p) => {
  const matchesSearch = p.name.toLowerCase().includes(searchTerm.toLowerCase());

  const matchesCategory =
    selectedCategory === "All" ||
    p.name.toLowerCase().includes(selectedCategory.toLowerCase());

  return matchesSearch && matchesCategory;
});



  return (
    <div className="flex flex-col min-h-screen bg-white overflow-y-auto scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-transparent">
      {/* 🔹 Header with background video */}
      <div className="relative w-full h-64">
        <video
          src="/BV.mp4"
          autoPlay
          loop
          muted
          playsInline
          className="object-cover brightness-90 w-full h-full"
        />
        <div className="absolute inset-0 bg-black/20" />

        {/* 🔍 Search Bar */}
        <div className="absolute top-5 left-0 w-full px-4">
          <div className="flex items-center gap-2 w-full bg-white/80 backdrop-blur-md rounded-full px-4 py-2">
            <Search className="w-5 h-5 text-gray-500" />
            <input
              type="text"
              placeholder="Search your style..."
              value={searchTerm}
              onChange={(e) => {
                setSearchTerm(e.target.value);
                setSelectedCategory("All"); // optional: reset category on search
              }}
              className="bg-transparent outline-none text-sm w-full text-gray-700 placeholder-gray-500"
            />
          </div>
        </div>

        {/* Header Text */}
        <div className="absolute bottom-5 left-5 text-white">
          <h1 className="text-2xl font-semibold">Discover your Style</h1>
          <p className="text-sm opacity-90">Try fashion that fits you best</p>
        </div>
      </div>

      {/* 🔹 Categories with icons */}
      <div className="px-4 mt-4">
        <h2 className="text-lg font-semibold mb-3">Categories</h2>
        <div className="flex gap-4 overflow-x-auto scrollbar-none pb-2">
          {/* "All" category */}
          <div
            onClick={() => setSelectedCategory("All")}
            className={`flex flex-col items-center justify-center min-w-[80px] p-3 rounded-2xl cursor-pointer transition-all ${
              selectedCategory === "All"
                ? "bg-black text-white"
                : "bg-gray-100 hover:bg-gray-200 text-gray-800"
            }`}
          >
            <span className="text-sm font-medium">All</span>
          </div>

          {categories.map((cat, index) => (
            <div
              key={index}
              onClick={() => setSelectedCategory(cat.name)}
              className={`flex flex-col items-center justify-center min-w-[80px] p-3 rounded-2xl cursor-pointer transition-all ${
                selectedCategory === cat.name
                  ? "bg-black text-white"
                  : "bg-gray-100 hover:bg-gray-200 text-gray-800"
              }`}
            >
              <Image
                src={cat.icon}
                alt={cat.name}
                width={40}
                height={40}
                className="object-contain mb-2 rounded-full"
              />
              <span className="text-sm font-medium">{cat.name}</span>
            </div>
          ))}
        </div>
      </div>

      {/* 🔹 Product List */}
      <div className="grid grid-cols-2 gap-4 p-4">
        {filteredProducts.length > 0 ? (
          filteredProducts.map((product) => (
            <div key={product.id} className="flex flex-col items-start">
              {/* Product Card */}
              <div className="relative bg-[#f4f4f4] w-full h-[370px] rounded-[10px] overflow-hidden flex justify-center items-center">
                {/* Logo (top-left corner) */}
                <div className="absolute top-2 left-2">
                  <Image
                    src="/logo.png"
                    alt="Brand Logo"
                    width={50}
                    height={50}
                    className="object-contain"
                  />
                </div>

                {/* Product Image */}
                <Image
                  src={product.image}
                  alt={product.name}
                  width={260}
                  height={320}
                  className="object-contain"
                />
              </div>

              {/* Product Info */}
              <div className="mt-2 flex flex-col w-full">
                <p className="text-[15px] text-gray-800 font-medium truncate">
                  {product.name}
                </p>

                <div className="flex items-center justify-between mt-1">
                  <span className="text-[15px] font-semibold text-black">
                    {product.price}
                  </span>

                  {/* Wishlist Heart */}
                  <button
                    onClick={() => toggleWishlist(product.id)}
                    className="text-gray-600 hover:scale-110 transition-all"
                  >
                    {wishlist.includes(product.id) ? (
                      <AiFillHeart className="text-red-500 text-[22px]" />
                    ) : (
                      <AiOutlineHeart className="text-gray-600 text-[22px]" />
                    )}
                  </button>
                </div>
              </div>
            </div>
          ))
        ) : (
          <p className="col-span-2 text-center text-gray-500 py-10">
            No products found for “{searchTerm || selectedCategory}”
          </p>
        )}
      </div>

      
    </div>
  );
}
