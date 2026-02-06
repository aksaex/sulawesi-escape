"use client";
import { signIn } from "next-auth/react";
import { useState } from "react";
import { Compass, Lock, ShieldCheck, ArrowLeft } from "lucide-react";
import Link from "next/link";

export default function LoginPage() {
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);
    const formData = new FormData(e.currentTarget);
    
    await signIn("credentials", {
      email: formData.get("email"),
      password: formData.get("password"),
      redirect: true,
      callbackUrl: "/admin",
    });
  }

  return (
    <div className="min-h-screen bg-[#031a1b] flex items-center justify-center p-4 md:p-6 relative overflow-hidden">
      {/* Glow Effect Background */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden -z-10">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-[#f59e0b]/5 blur-[120px] rounded-full" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-[#f59e0b]/5 blur-[120px] rounded-full" />
      </div>

      <div className="w-full max-w-[440px] animate-in fade-in zoom-in duration-700">
        
        {/* TOMBOL BACK KE PUBLIC SITE (Gaya Manage Wisata) */}
        <Link 
          href="/" 
          className="group inline-flex items-center gap-3 text-zinc-400 hover:text-white transition-all mb-8"
        >
          <div className="flex items-center justify-center w-10 h-10 rounded-xl bg-white/5 border border-white/10 group-hover:border-[#f59e0b]/50 group-hover:bg-[#f59e0b] group-hover:text-[#062c2d] transition-all duration-300 shadow-lg">
            <ArrowLeft size={18} />
          </div>
          <div className="flex flex-col">
            <span className="text-[9px] font-black uppercase tracking-[0.2em] leading-none">Back</span>
            <span className="text-[7px] text-zinc-600 group-hover:text-zinc-400 uppercase tracking-widest mt-1 transition-colors">Public Site</span>
          </div>
        </Link>

        <div className="glass p-8 md:p-12 rounded-[2.5rem] border-white/5 shadow-2xl relative">
          {/* Badge Keamanan */}
          <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-[#062c2d] border border-white/10 px-4 py-1.5 rounded-full flex items-center gap-2">
            <ShieldCheck size={12} className="text-[#f59e0b]" />
            <span className="text-[9px] font-black text-zinc-400 uppercase tracking-widest">Secure Encryption</span>
          </div>

          <div className="text-center mb-10 pt-4">
            <div className="w-20 h-20 bg-[#f59e0b] rounded-[2rem] flex items-center justify-center mx-auto mb-6 rotate-6 shadow-2xl shadow-orange-500/20">
              <Compass className="text-[#062c2d]" size={40} />
            </div>
            <h1 className="text-3xl font-black text-white uppercase tracking-tighter italic leading-none">
              Staff<span className="text-[#f59e0b]">Access</span>
            </h1>
            <p className="text-zinc-500 text-[10px] font-bold uppercase tracking-[0.2em] mt-3 leading-relaxed">
              Restricted Area <br /> Authorized Personnel Only
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="relative group">
              <input
                name="email"
                type="email"
                placeholder="Admin Email"
                className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-4 text-sm text-white focus:outline-none focus:ring-2 focus:ring-[#f59e0b]/30 focus:border-[#f59e0b]/50 transition-all placeholder:text-zinc-600"
                required
              />
            </div>
            <div className="relative group">
              <input
                name="password"
                type="password"
                placeholder="Access Password"
                className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-4 text-sm text-white focus:outline-none focus:ring-2 focus:ring-[#f59e0b]/30 focus:border-[#f59e0b]/50 transition-all placeholder:text-zinc-600"
                required
              />
              <Lock className="absolute right-5 top-1/2 -translate-y-1/2 text-zinc-600" size={16} />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-[#f59e0b] text-[#062c2d] font-black py-5 rounded-2xl hover:brightness-110 transition-all active:scale-[0.98] shadow-xl shadow-orange-500/10 uppercase tracking-[0.2em] text-[11px] mt-4"
            >
              {loading ? "Verifying..." : "Authenticate Access"}
            </button>
          </form>

          <p className="text-center text-[9px] text-zinc-600 uppercase font-bold tracking-widest mt-10">
            System Identity: <span className="text-zinc-400 font-mono">SE-ALPHA-01</span>
          </p>
        </div>
      </div>
    </div>
  );
}