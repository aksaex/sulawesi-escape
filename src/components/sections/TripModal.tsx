"use client";
import { X, MapPin, Sparkles } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useRouter } from "next/navigation";

interface TripModalProps {
  trip: any;
  isOpen: boolean;
  onClose: () => void;
}

export default function TripModal({ trip, isOpen, onClose }: TripModalProps) {
  const router = useRouter();

  if (!trip) return null;

  // Fungsi untuk menangani booking agar stabil
  const handleBookNow = (e: React.MouseEvent) => {
    e.preventDefault();
    onClose(); // Tutup modal terlebih dahulu
    
    // Gunakan router untuk navigasi ke ID booking dengan smooth scroll
    router.push(`/?id=${trip.id}#booking`);
    
    // Backup scroll jika hash tidak terdeteksi otomatis oleh browser
    setTimeout(() => {
      const element = document.getElementById("booking");
      if (element) {
        element.scrollIntoView({ behavior: "smooth" });
      }
    }, 100);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-8">
          {/* Backdrop Blur - Klik di luar untuk tutup */}
          <motion.div 
            initial={{ opacity: 0 }} 
            animate={{ opacity: 1 }} 
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-[#031a1b]/95 backdrop-blur-md"
          />
          
          {/* Content Modal */}
          <motion.div 
            initial={{ scale: 0.9, opacity: 0, y: 30 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.9, opacity: 0, y: 30 }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
            className="relative w-full max-w-5xl bg-[#062c2d] border border-white/10 rounded-[2.5rem] overflow-hidden shadow-2xl max-h-[90vh] flex flex-col md:flex-row"
          >
            {/* Tombol Tutup */}
            <button 
              onClick={onClose} 
              className="absolute top-6 right-6 z-50 bg-black/40 hover:bg-[#f59e0b] text-white hover:text-[#062c2d] p-3 rounded-2xl transition-all duration-300"
            >
              <X size={20} />
            </button>

            {/* Sisi Kiri: Gambar Wisata */}
            <div className="w-full md:w-1/2 h-64 md:h-auto relative overflow-hidden">
              <img 
                src={trip.image} 
                className="w-full h-full object-cover" 
                alt={trip.title} 
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#062c2d] via-transparent to-transparent md:bg-gradient-to-r" />
            </div>

            {/* Sisi Kanan: Detail & Narasi */}
            <div className="w-full md:w-1/2 p-8 md:p-12 overflow-y-auto custom-scrollbar flex flex-col justify-between bg-[#062c2d]">
              <div className="space-y-6">
                <div>
                  <div className="flex items-center gap-2 text-[#f59e0b] mb-4">
                    <Sparkles size={14} className="animate-pulse" />
                    <span className="text-[10px] font-black uppercase tracking-[0.3em]">{trip.location}</span>
                  </div>
                  <h2 className="text-4xl font-black text-white leading-none uppercase italic tracking-tighter">
                    {trip.title}
                  </h2>
                </div>

                <div className="space-y-5 text-zinc-400 text-sm leading-relaxed text-justify pr-2">
                  {/* Menangani teks panjang dengan paragraf */}
                  {trip.description.split('\n').map((paragraph: string, i: number) => (
                    paragraph.trim() !== "" && <p key={i}>{paragraph}</p>
                  ))}
                </div>
              </div>

              {/* Bagian Bawah: Harga & Tombol Konfirmasi */}
              <div className="mt-10 pt-8 border-t border-white/10 flex flex-col sm:flex-row justify-between items-center gap-6">
                <div className="text-center sm:text-left">
                  <span className="text-[10px] text-zinc-500 uppercase font-black tracking-widest block mb-1">
                    Investment for Journey
                  </span>
                  <span className="text-3xl font-black text-white font-mono tracking-tighter">
                    Rp {trip.price.toLocaleString('id-ID')}
                  </span>
                </div>
                
                <button 
                  onClick={handleBookNow}
                  className="w-full sm:w-auto bg-[#f59e0b] text-[#062c2d] px-12 py-5 rounded-2xl font-black uppercase text-[11px] tracking-[0.2em] hover:scale-105 active:scale-95 transition-all shadow-xl shadow-orange-500/10"
                >
                  Confirm & Book Now
                </button>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}