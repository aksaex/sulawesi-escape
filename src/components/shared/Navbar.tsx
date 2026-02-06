"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation"; // Import ini
import { Menu, X, Compass } from "lucide-react";

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname(); // Ambil path saat ini

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // LOGIKA SEMBUNYIKAN NAVBAR
  // Jika path dimulai dengan /admin atau tepat di /login, jangan tampilkan apa pun
  if (pathname.startsWith("/admin") || pathname === "/login") {
    return null;
  }

  return (
    <nav className={`fixed top-0 w-full z-50 transition-all duration-500 ${
      isScrolled || isOpen ? "bg-[#062c2d]/95 backdrop-blur-xl py-4" : "bg-transparent py-8"
    }`}>
      <div className="container mx-auto px-6 flex justify-between items-center">
        <Link href="/" className="flex items-center gap-2 group">
          <div className="w-10 h-10 bg-[#f59e0b] rounded-xl flex items-center justify-center rotate-3 group-hover:rotate-0 transition-transform">
            <Compass className="text-[#062c2d]" size={24} />
          </div>
          <span className="text-xl font-black tracking-tighter text-white uppercase italic">
            Sulawesi<span className="text-[#f59e0b]">Escape</span>
          </span>
        </Link>
        
        <div className="hidden md:flex items-center gap-10 text-[11px] font-bold uppercase tracking-[0.3em] text-zinc-400">
          <Link href="/" className="hover:text-[#f59e0b] transition-colors">Home</Link>
          <Link href="#destinations" className="hover:text-[#f59e0b] transition-colors">Destinations</Link>
          <Link href="#booking" className="bg-[#f59e0b] text-[#062c2d] px-8 py-3 rounded-full hover:scale-105 transition-all">
            Book Journey
          </Link>
        </div>

        <button className="md:hidden text-white" onClick={() => setIsOpen(!isOpen)}>
          {isOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>

      {isOpen && (
        <div className="md:hidden bg-[#062c2d] border-t border-white/5 p-6 flex flex-col gap-6 text-[12px] font-bold uppercase tracking-[0.2em] text-zinc-300">
          <Link href="/" onClick={() => setIsOpen(false)}>Home</Link>
          <Link href="#destinations" onClick={() => setIsOpen(false)}>Destinations</Link>
          <Link href="#booking" onClick={() => setIsOpen(false)} className="text-[#f59e0b]">Book Journey</Link>
        </div>
      )}
    </nav>
  );
}