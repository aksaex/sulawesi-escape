"use client";

import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useState, useEffect } from "react";
import { createBooking } from "@/app/actions";
import { CheckCircle2, AlertCircle, MapPin } from "lucide-react";
import { useSearchParams } from "next/navigation";

interface BookingFormProps {
  destinations: {
    id: string;
    title: string;
  }[];
}

export default function BookingForm({ destinations }: BookingFormProps) {
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState<"idle" | "success" | "error">("idle");
  const [selectedDest, setSelectedDest] = useState(""); // State untuk dropdown dinamis
  
  const searchParams = useSearchParams();

  // Efek untuk menangkap ID dari URL saat tombol "Detail Trip" diklik
  useEffect(() => {
    const destId = searchParams.get("id");
    if (destId) {
      setSelectedDest(destId);
      
      // Scroll halus ke form jika ID terdeteksi di URL
      const element = document.getElementById("booking-section");
      if (element) {
        element.scrollIntoView({ behavior: "smooth" });
      }
    }
  }, [searchParams]);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);
    setStatus("idle");
    
    const formData = new FormData(e.currentTarget);

    try {
      const result = await createBooking(formData);
      
      if (result.success) {
        setStatus("success");
        setSelectedDest(""); // Reset pilihan
        (e.target as HTMLFormElement).reset();
      } else {
        setStatus("error");
      }
    } catch (err) {
      console.error("Booking Error:", err);
      setStatus("error");
    } finally {
      setLoading(false);
    }
  }

  return (
    <section id="booking-section" className="py-24 bg-[#031a1b] relative overflow-hidden scroll-mt-20">
      {/* Background Decor - Glow Effect */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-[#f59e0b]/5 blur-[120px] rounded-full" />
      <div className="absolute bottom-0 left-0 w-[300px] h-[300px] bg-[#062c2d] blur-[100px] rounded-full" />
      
      <div className="container px-6 mx-auto relative z-10">
        <div className="max-w-4xl mx-auto glass p-8 md:p-12 rounded-[2.5rem] border-white/5 shadow-2xl">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            
            {/* Left Side: Branding & Info */}
            <div className="flex flex-col justify-center">
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6 }}
              >
                <h2 className="text-[#f59e0b] font-medium mb-2 tracking-[0.2em] text-sm uppercase">Ready to Escape?</h2>
                <h3 className="text-4xl md:text-5xl font-bold text-white mb-6 tracking-tight leading-tight">
                  Plan Your <br /> <span className="text-[#f59e0b]">Adventure.</span>
                </h3>
                <p className="text-zinc-400 leading-relaxed mb-6">
                  Sulawesi Escape's team of specialists will create a curated itinerary tailored to your profile. Simply fill in your travel details.
                </p>
                <div className="flex items-center gap-4 text-white/60 text-sm italic">
                  <div className="w-12 h-[1px] bg-white/20"></div>
                  premium services
                </div>
              </motion.div>
            </div>

            {/* Right Side: The Form */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
            >
              <form onSubmit={handleSubmit} className="space-y-5">
                {/* Dropdown Pilihan Destinasi */}
                <div className="space-y-2">
                  <Label className="text-zinc-300 ml-1 font-bold text-[10px] uppercase tracking-widest">Select A Package</Label>
                  <div className="relative">
                    <select 
                      name="destinationId" 
                      required
                      value={selectedDest}
                      onChange={(e) => setSelectedDest(e.target.value)}
                      className="w-full bg-white/5 border border-white/10 text-white h-14 rounded-xl px-4 focus:ring-2 focus:ring-[#f59e0b] outline-none appearance-none transition-all cursor-pointer text-sm"
                    >
                      <option value="" className="bg-[#062c2d]">Select Sulawesi Destination</option>
                      {destinations.map((dest) => (
                        <option key={dest.id} value={dest.id} className="bg-[#062c2d]">
                          {dest.title}
                        </option>
                      ))}
                    </select>
                    <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-zinc-500">
                      <MapPin size={16} />
                    </div>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label className="text-zinc-300 ml-1 font-bold text-[10px] uppercase tracking-widest">Full Name</Label>
                  <Input 
                    name="name" 
                    placeholder="Example: Aksa Adventure" 
                    className="bg-white/5 border-white/10 text-white h-14 rounded-xl focus:ring-[#f59e0b] text-sm" 
                    required 
                  />
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label className="text-zinc-300 ml-1 font-bold text-[10px] uppercase tracking-widest">WhatsApp</Label>
                    <Input 
                      name="whatsapp" 
                      placeholder="0812..." 
                      className="bg-white/5 border-white/10 text-white h-14 rounded-xl focus:ring-[#f59e0b] text-sm" 
                      required 
                    />
                  </div>
                  <div className="space-y-2">
                    <Label className="text-zinc-300 ml-1 font-bold text-[10px] uppercase tracking-widest">Number of Guests</Label>
                    <Input 
                      name="guests" 
                      type="number" 
                      min="1"
                      placeholder="2" 
                      className="bg-white/5 border-white/10 text-white h-14 rounded-xl focus:ring-[#f59e0b] text-sm" 
                      required 
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label className="text-zinc-300 ml-1 font-bold text-[10px] uppercase tracking-widest">Planned Date</Label>
                  <Input 
                    name="date" 
                    type="date" 
                    className="bg-white/5 border-white/10 text-white h-14 rounded-xl focus:ring-[#f59e0b] [color-scheme:dark] text-sm px-4" 
                    required 
                  />
                </div>

                <Button 
                  type="submit" 
                  disabled={loading} 
                  className="w-full bg-[#f59e0b] hover:bg-[#d97706] text-[#062c2d] font-black h-14 rounded-xl transition-all shadow-xl shadow-orange-500/10 active:scale-[0.98] uppercase tracking-widest text-xs"
                >
                  {loading ? "Processing..." : "Submit Request"}
                </Button>

                {/* Feedback Messages */}
                {status === "success" && (
                  <motion.div 
                    initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
                    className="flex items-center gap-2 text-emerald-400 bg-emerald-400/10 p-4 rounded-xl text-xs border border-emerald-400/20 font-bold uppercase tracking-tight"
                  >
                    <CheckCircle2 size={16} />
                    We have received your request!
                  </motion.div>
                )}

                {status === "error" && (
                  <motion.div 
                    initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
                    className="flex items-center gap-2 text-red-400 bg-red-400/10 p-4 rounded-xl text-xs border border-red-400/20 font-bold uppercase tracking-tight"
                  >
                    <AlertCircle size={16} />
                    An error occurred. Please try again.
                  </motion.div>
                )}
              </form>
            </motion.div>

          </div>
        </div>
      </div>
    </section>
  );
}