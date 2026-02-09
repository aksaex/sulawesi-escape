export default function Footer() {
  return (
    <footer className="bg-[#031a1b] py-12 border-t border-white/5">
      <div className="container mx-auto px-6">
        <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-center md:text-left">
          {/* Sisi Kiri: Hak Cipta */}
          <p className="text-[10px] text-zinc-600 font-black uppercase tracking-[0.4em]">
            © 2026 Sulawesi Escape.
          </p>

          {/* Sisi Kanan: Penulis */}
          <p className="text-[10px] text-zinc-700 font-bold uppercase tracking-[0.2em]">
            Crafted by <span className="text-zinc-500">@aksaex</span>
          </p>
        </div>
      </div>
    </footer>
  );
}