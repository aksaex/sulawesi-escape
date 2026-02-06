import db from "@/lib/prisma";
import { deleteDestination } from "@/app/actions";
import { Trash2, Edit, Plus, MapPin, ArrowLeft } from "lucide-react";
import Link from "next/link";

export default async function ManageWisataPage() {
  const destinations = await db.destination.findMany({
    orderBy: { createdAt: "desc" },
  });

  return (
    <div className="min-h-screen bg-[#031a1b] text-white p-6 md:p-10 font-sans relative overflow-hidden">
      {/* Glow Effect */}
      <div className="absolute -top-24 -left-24 w-64 h-64 bg-[#f59e0b]/5 blur-[100px] -z-10" />

      <div className="max-w-5xl mx-auto pt-16 md:pt-20">
        
        {/* TOMBOL BACK KE DASHBOARD UTAMA */}
        <Link 
          href="/admin" 
          className="group inline-flex items-center gap-3 text-zinc-400 hover:text-white transition-all mb-8"
        >
          <div className="flex items-center justify-center w-10 h-10 rounded-xl bg-white/5 border border-white/10 group-hover:border-[#f59e0b]/50 group-hover:bg-[#f59e0b] group-hover:text-[#062c2d] transition-all duration-300">
            <ArrowLeft size={18} />
          </div>
          <div className="flex flex-col">
            <span className="text-[9px] font-black uppercase tracking-[0.2em] leading-none">Back</span>
            <span className="text-[7px] text-zinc-600 group-hover:text-zinc-400 uppercase tracking-widest mt-1 transition-colors">Admin Dashboard</span>
          </div>
        </Link>

        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-black tracking-tighter uppercase italic leading-none">
            Manage<span className="text-[#f59e0b]">Trips</span>
          </h1>
          <Link href="/admin/wisata/new" className="bg-[#f59e0b] text-[#062c2d] px-6 py-2.5 rounded-xl text-[10px] font-black uppercase tracking-widest flex items-center gap-2 hover:brightness-110 transition-all shadow-lg shadow-orange-500/10">
            <Plus size={14}/> Add New Trip
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {destinations.map((trip) => (
            <div key={trip.id} className="glass p-4 rounded-2xl border-white/5 flex gap-4 items-center group hover:border-white/10 transition-all">
              <img src={trip.image} className="w-20 h-20 rounded-xl object-cover border border-white/10 group-hover:scale-105 transition-transform duration-500" alt={trip.title} />
              
              <div className="flex-1">
                <h3 className="font-bold text-white leading-tight">{trip.title}</h3>
                <p className="text-[#f59e0b] text-[10px] font-bold uppercase flex items-center gap-1 mt-1">
                  <MapPin size={10}/> {trip.location}
                </p>
                <p className="text-zinc-300 text-[10px] mt-1 font-mono tracking-wider">Rp {trip.price.toLocaleString('id-ID')}</p>
              </div>
              
              <div className="flex flex-col gap-2">
                {/* TOMBOL EDIT */}
                <Link 
                  href={`/admin/wisata/edit/${trip.id}`} 
                  className="p-2.5 bg-white/5 text-zinc-400 rounded-lg hover:bg-blue-500/20 hover:text-blue-400 transition-all text-center border border-white/5"
                >
                  <Edit size={14} />
                </Link>

                {/* TOMBOL DELETE */}
                <form action={async () => { "use server"; await deleteDestination(trip.id); }}>
                  <button className="p-2.5 bg-white/5 text-zinc-400 rounded-lg hover:bg-red-500/20 hover:text-red-500 transition-all border border-white/5 w-full flex justify-center">
                    <Trash2 size={14} />
                  </button>
                </form>
              </div>
            </div>
          ))}
        </div>

        {destinations.length === 0 && (
           <div className="glass p-20 text-center rounded-[2.5rem] border-white/5">
              <p className="text-zinc-600 italic text-sm">No destinations available Start by adding one</p>
           </div>
        )}
      </div>
    </div>
  );
}