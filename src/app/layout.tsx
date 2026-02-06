import type { Metadata } from "next";
import { Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/shared/Navbar";
import { SessionProvider } from "next-auth/react";

// Konfigurasi Font Plus Jakarta Sans
const plusJakartaSans = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--font-plus-jakarta",
  display: "swap", // Menghindari layout shift saat font dimuat
});

// Metadata untuk SEO
export const metadata: Metadata = {
  title: "Sulawesi Escape | Luxury Curated Travel",
  description: "Explore the hidden beauty of Sulawesi with premium concierge services.",
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
        {/* SessionProvider menjaga status login admin di sisi client */}
        <SessionProvider>
          {/* Navbar tetap Fixed di atas */}
          <Navbar />

          {/* Main wrapper: 
              Kita berikan min-h-screen agar background selalu penuh.
              Konten di dalamnya akan otomatis menyesuaikan posisi jika Navbar menghilang (pada Login/Admin)
              berkat logika CSS di dalam masing-masing page.
          */}
          <main className="min-h-screen relative">
            {children}
          </main>
        </SessionProvider>

        {/* Tips: Jika nanti ingin menambahkan notifikasi popup (toast), 
            Anda bisa memasang <Toaster /> dari library 'sonner' atau 'react-hot-toast' di sini. 
        */}
      </body>
    </html>
  );
}