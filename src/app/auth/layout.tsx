// app/(auth)/layout.tsx
// NOTE: Do NOT include <html> or <body> here

import { Outfit } from "next/font/google";
import "../globals.css"; // make sure this exists at app/globals.css

const outfit = Outfit({
  subsets: ["latin"],
  weight: ["400", "600"], // Regular & SemiBold
});

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className={`min-h-screen bg-white ${outfit.className}`}>
      {children}
    </div>
  );
}
