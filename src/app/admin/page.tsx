import db from "@/lib/prisma";
import { deleteBooking } from "@/app/actions";
import { signOut } from "@/auth";
import { Trash2, Phone, Calendar, Users, LogOut, LayoutDashboard, Map, Bell } from "lucide-react";
import Link from "next/link";

export default async function AdminDashboard() {
  const bookings = await db.booking.findMany({
    include: { destination: true },
    orderBy: { createdAt: "desc" },
  });

  return (
    <div className="min-h-screen bg-[#031a1b] text-white p-4 md:p-10 font-sans">
      <div className="max-w-5xl mx-auto pt-16 md:pt-20">
        
        {/* Header Section */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mb-8">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></div>
              <span className="text-[10px] uppercase tracking-[0.3em] text-zinc-500 font-bold">System Online</span>
            </div>
            <h1 className="text-3xl md:text-4xl font-black tracking-tighter uppercase italic">
              Admin <span className="text-[#f59e0b]">Panel</span>
            </h1>
          </div>
          
          <div className="flex gap-2 w-full md:w-auto">
            <Link href="/admin/wisata/new" className="flex-1 md:flex-none flex items-center justify-center gap-2 bg-[#f59e0b] text-[#062c2d] px-4 py-2.5 rounded-xl text-[10px] font-black uppercase tracking-widest hover:brightness-110 transition-all">
              <Map size={14} /> Post Trip
            </Link>
            <form action={async () => { "use server"; await signOut(); }}>
              <button className="flex items-center gap-2 bg-white/5 border border-white/10 px-4 py-2.5 rounded-xl text-[10px] font-black uppercase tracking-widest hover:bg-red-500 hover:border-red-500 transition-all group">
                <LogOut size={14} className="group-hover:rotate-12 transition-transform" /> Logout
              </button>
            </form>
          </div>
        </div>

        {/* Minimalist Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-8">
          <div className="glass p-4 rounded-2xl border-white/5 bg-gradient-to-br from-white/5 to-transparent">
            <p className="text-zinc-500 text-[9px] uppercase font-bold tracking-widest mb-1">Trip Orders</p>
            <h2 className="text-2xl font-black text-[#f59e0b]">{bookings.length}</h2>
          </div>
          <Link href="/admin/wisata" className="flex-1 md:flex-none flex items-center justify-center gap-2 bg-white/5 border border-white/10 text-white px-4 py-2.5 rounded-xl text-[10px] font-black uppercase tracking-widest hover:bg-[#f59e0b] hover:text-[#062c2d] transition-all">
          <LayoutDashboard size={14} /> Manage trips
          </Link>
        </div>

        <h3 className="text-[10px] font-bold uppercase tracking-[0.3em] text-zinc-500 mb-6 flex items-center gap-2">
          <Bell size={12} className="text-[#f59e0b]" /> Recent Activity
        </h3>

        {bookings.length === 0 ? (
          <div className="glass p-12 text-center rounded-[2rem] border-white/5">
            <p className="text-zinc-600 text-sm italic">No requests found.</p>
          </div>
        ) : (
          <div className="grid gap-3">
            {bookings.map((item) => (
              <div key={item.id} className="glass p-4 md:p-6 rounded-2xl border-white/5 flex flex-col md:flex-row justify-between items-start md:items-center gap-4 hover:border-[#f59e0b]/20 transition-all group relative overflow-hidden">
                <div className="absolute top-0 left-0 w-1 h-full bg-[#f59e0b] opacity-0 group-hover:opacity-100 transition-opacity"></div>
                
                <div className="flex-1">
                  <h4 className="font-bold text-lg md:text-xl leading-none mb-1">{item.customerName}</h4>
                  <p className="text-[#f59e0b] text-[10px] md:text-xs font-bold uppercase tracking-widest italic">{item.destination.title}</p>
                </div>

                <div className="flex flex-wrap md:flex-nowrap items-center gap-4 w-full md:w-auto text-[10px] text-zinc-400 font-bold uppercase tracking-tight">
                  <div className="flex items-center gap-1.5"><Phone size={12} className="text-[#f59e0b] opacity-70"/> {item.customerWa}</div>
                  <div className="flex items-center gap-1.5"><Users size={12} className="text-[#f59e0b] opacity-70"/> {item.guestCount} Pax</div>
                </div>

                <form action={async () => { "use server"; await deleteBooking(item.id); }} className="w-full md:w-auto">
                  <button className="w-full md:w-auto p-3 rounded-xl bg-white/5 text-zinc-600 hover:bg-red-500/20 hover:text-red-500 transition-all flex justify-center">
                    <Trash2 size={16} />
                  </button>
                </form>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}