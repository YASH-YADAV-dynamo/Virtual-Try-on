"use client";
import Image from "next/image";
import Link from "next/link";
import { useWishlistStore } from "../../store/wishlistStore";
import { IoArrowBack } from "react-icons/io5";

export default function FavouritesPage() {
  const { wishlist } = useWishlistStore();

  // Reuse same product data (since store now only has IDs)
  const products = [
    { id: 1, name: "Top man black", price: "₹540", image: "/image1.png" },
    { id: 2, name: "Deep grey essential jogger", price: "₹840", image: "/image1.png" },
    { id: 3, name: "Top man black with Trousers", price: "₹690", image: "/image1.png" },
    { id: 4, name: "Grey coat and white T-shirt", price: "₹710", image: "/image1.png" },
    { id: 5, name: "Grey coat and white T-shirt", price: "₹599", image: "/image1.png" },
    { id: 6, name: "Grey coat and white T-shirt", price: "₹409", image: "/image1.png" },
  ];

  // Filter only wishlist products by ID
  const favouriteProducts = products.filter((p) => wishlist.includes(p.id));

  return (
    <div className="min-h-screen bg-white pb-20">
      {/* Header */}
      <div className="flex items-center justify-between p-4 border-b border-gray-200">
        <Link href="/">
          <IoArrowBack className="text-2xl text-gray-700" />
        </Link>
        <h2 className="text-lg font-semibold">Favourites</h2>
        <div className="w-6"></div>
      </div>

      {/* Wishlist Products */}
      <div className="grid grid-cols-2 gap-4 p-4">
        {favouriteProducts.length > 0 ? (
          favouriteProducts.map((product) => (
            <div key={product.id} className="flex flex-col items-start">
              <div className="relative bg-[#f4f4f4] w-full h-[370px] rounded-[10px] overflow-hidden flex justify-center items-center">
                <div className="absolute top-2 left-2">
                  <Image
                    src="/logo.png"
                    alt="Brand Logo"
                    width={50}
                    height={50}
                    className="object-contain"
                  />
                </div>
                <Image
                  src={product.image}
                  alt={product.name}
                  width={260}
                  height={320}
                  className="object-contain"
                />
              </div>

              <div className="mt-2 flex flex-col w-full">
                <p className="text-[15px] text-gray-800 font-medium truncate">
                  {product.name}
                </p>
                <span className="text-[15px] font-semibold text-black">
                  {product.price}
                </span>
              </div>
            </div>
          ))
        ) : (
          <p className="col-span-2 text-center text-gray-500 mt-10">
            No favourites added yet ❤️
          </p>
        )}
      </div>
    </div>
  );
}
