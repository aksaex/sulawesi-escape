"use client";
import { useState } from "react";
import { MapPin } from "lucide-react";
import TripModal from "./TripModal";

export default function BentoGridClient({ destinations }: { destinations: any[] }) {
  const [selectedTrip, setSelectedTrip] = useState<any>(null);

  return (
    <section id="destinations" className="py-24 bg-[#062c2d]">
      <div className="container px-6 mx-auto">
        <div className="flex justify-between items-end mb-12">
          <div>
            <h2 className="text-[#f59e0b] font-medium mb-2 tracking-widest uppercase text-[10px]">Curated Destinations</h2>
            <h3 className="text-4xl md:text-5xl font-black text-white tracking-tight italic uppercase">
              One Island <br /> Thousands of Stories
            </h3>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 auto-rows-[400px]">
          {destinations.map((item, index) => (
            <div
              key={item.id}
              className={`group relative overflow-hidden rounded-[2.5rem] border border-white/5 shadow-2xl transition-all duration-500 hover:border-[#f59e0b]/30
                ${index === 0 ? "md:col-span-2" : ""} 
                ${index === 3 ? "md:col-span-2" : ""}`}
            >
              <img
                src={item.image}
                alt={item.title}
                className="absolute inset-0 w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110 opacity-80"
              />
              
              <div className="absolute inset-0 bg-gradient-to-t from-[#031a1b] via-[#031a1b]/20 to-transparent opacity-90" />
              
              <div className="absolute bottom-0 left-0 p-8 w-full translate-y-2 group-hover:translate-y-0 transition-transform duration-500">
                <div className="flex items-center gap-2 text-[#f59e0b] mb-3">
                  <MapPin size={14} />
                  <span className="text-[10px] font-black uppercase tracking-[0.3em]">{item.location}</span>
                </div>
                <h4 className="text-2xl md:text-3xl font-black text-white mb-2 leading-none uppercase italic">{item.title}</h4>
                <p className="text-zinc-400 text-xs line-clamp-2 mb-6 font-medium leading-relaxed opacity-0 group-hover:opacity-100 transition-opacity duration-700">
                  {item.description}
                </p>
                
                <div className="flex justify-between items-center pt-4 border-t border-white/5">
                   <div className="flex flex-col">
                      <span className="text-[10px] text-zinc-500 uppercase font-bold tracking-widest">PRICE</span>
                      <span className="text-white font-bold font-mono">Rp {item.price.toLocaleString('id-ID')}</span>
                   </div>
                   
                   <button 
                    onClick={() => setSelectedTrip(item)}
                    className="bg-[#f59e0b] text-[#062c2d] py-3 px-8 rounded-2xl text-[10px] font-black uppercase tracking-widest hover:scale-105 transition-all shadow-lg shadow-orange-500/10"
                   >
                    Read More
                   </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Modal untuk membaca deskripsi panjang */}
      <TripModal 
        trip={selectedTrip} 
        isOpen={!!selectedTrip} 
        onClose={() => setSelectedTrip(null)} 
      />
    </section>
  );
}