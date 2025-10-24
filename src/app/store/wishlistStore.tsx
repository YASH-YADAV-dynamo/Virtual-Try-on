import { create } from "zustand";
import { persist } from "zustand/middleware";

interface WishlistState {
  wishlist: number[];
  toggleWishlist: (id: number) => void;
}

export const useWishlistStore = create<WishlistState>()(
  persist(
    (set, get) => ({
      wishlist: [],
      toggleWishlist: (id) => {
        const current = get().wishlist;
        set({
          wishlist: current.includes(id)
            ? current.filter((pid) => pid !== id)
            : [...current, id],
        });
      },
    }),
    {
      name: "wishlist-storage", // key in localStorage
    }
  )
);

