import type { Metadata } from "next";
import { Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/shared/Navbar";
import Footer from "@/components/sections/Footer"; // Import Footer Baru
import { SessionProvider } from "next-auth/react";

// Konfigurasi Font Plus Jakarta Sans
const plusJakartaSans = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--font-plus-jakarta",
  display: "swap", 
});

// Metadata untuk SEO - Membantu web Anda lebih mudah ditemukan di Google
export const metadata: Metadata = {
  title: "Sulawesi Escape | Luxury Curated Travel",
  description: "Explore the hidden beauty of Sulawesi with premium concierge services. Tailored journeys through Toraja, Bunaken, and beyond.",
  keywords: ["Sulawesi Travel", "Luxury Tour Celebes", "Toraja Heritage", "Bunaken Diving"],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="id" className="dark scroll-smooth"> 
      <body 
        className={`${plusJakartaSans.variable} font-sans antialiased bg-[#031a1b] text-white selection:bg-[#f59e0b] selection:text-[#062c2d]`}
      >
        {/* SessionProvider menjaga status login admin di seluruh aplikasi */}
        <SessionProvider>
          {/* Navbar tetap Fixed di atas untuk navigasi utama */}
          <Navbar />

          {/* Main Content Area */}
          <main className="min-h-screen relative">
            {children}
          </main>

          {/* Footer & Socket Section: Muncul di bawah setiap halaman */}
          <Footer />
        </SessionProvider>

        {/* Catatan: Jika Anda ingin menambahkan Toast (notifikasi sukses/gagal),
          Anda bisa menginstal library 'sonner' dan meletakkan <Toaster /> di sini.
        */}
      </body>
    </html>
  );
}