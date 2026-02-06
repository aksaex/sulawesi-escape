"use client";

import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ChevronRight, Anchor } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

// Import gambar lokal dari folder yang sama
import sulawesiImg from "./sulawesi.png";

export default function Hero() {
  return (
    <section className="relative h-screen w-full overflow-hidden flex items-center justify-center bg-[#031a1b]">
      {/* Background Section */}
      <div className="absolute inset-0 z-0">
        {/* Overlay Gradient untuk kemewahan dan keterbacaan teks */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/20 to-[#031a1b] z-10" />
        
        {/* Menggunakan Next.js Image Component untuk performa maksimal */}
        <Image 
          src={sulawesiImg}
          alt="Luxury Sulawesi Landscape"
          placeholder="blur"
          priority
          fill
          className="object-cover opacity-60 scale-105"
        />
      </div>

      <div className="container relative z-20 px-6 text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: "easeOut" }}
        >
          <span className="inline-block px-5 py-2 mb-8 text-[10px] font-black tracking-[0.4em] text-[#f59e0b] uppercase border border-[#f59e0b]/30 rounded-full bg-[#f59e0b]/5 backdrop-blur-md italic">
            A journey full of stories
          </span>
          
          <h1 className="text-6xl md:text-9xl font-black tracking-tighter text-white mb-6 leading-[0.85]">
            EXPLORE<br /> 
            <span className="text-[#f59e0b] italic">SULAWESI</span>
          </h1>
          
          <p className="max-w-2xl mx-auto text-sm md:text-base text-zinc-400 mb-12 leading-relaxed tracking-wide uppercase font-medium">
            A special journey exploring all the charms of Sulawesi's <br className="hidden md:block" /> 
            culture, sea and amazing nature.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
            <Button 
  onClick={() => document.getElementById('destinations')?.scrollIntoView({ behavior: 'smooth' })}
  size="lg" 
  className="bg-[#f59e0b] hover:bg-white text-[#062c2d] font-black px-10 py-7 text-xs rounded-2xl transition-all duration-500 uppercase tracking-widest shadow-2xl shadow-orange-500/20"
>
  Start Adventure <ChevronRight className="ml-2 h-4 w-4" />
</Button>
            
            <button className="flex items-center gap-4 text-white hover:text-[#f59e0b] transition-all group py-4">
              <div className="w-12 h-12 rounded-full border border-white/10 flex items-center justify-center group-hover:border-[#f59e0b]/50 group-hover:bg-white/5 transition-all duration-500">
                <Anchor size={16} className="text-[#f59e0b]" />
              </div>
              <span className="text-[10px] font-black uppercase tracking-[0.3em]">Private & Tailored</span>
            </button>
          </div>
        </motion.div>
      </div>

      {/* Info Badge Ganti ke Lokasi (Lebih Realistis daripada suhu statis) */}
      <motion.div 
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 1.2 }}
        className="absolute bottom-12 right-12 hidden lg:flex items-center gap-4 bg-white/[0.03] backdrop-blur-xl border border-white/5 p-5 rounded-[2rem]"
      >
        <div className="w-10 h-10 rounded-full bg-[#f59e0b]/10 flex items-center justify-center">
            <div className="w-2 h-2 rounded-full bg-[#f59e0b] animate-ping" />
        </div>
        <div>
          <p className="text-[9px] text-zinc-500 uppercase font-black tracking-widest mb-1">Base Location</p>
          <p className="text-sm font-bold text-white tracking-tighter italic uppercase">Barru, Sulsel</p>
        </div>
      </motion.div>
    </section>
  );
}