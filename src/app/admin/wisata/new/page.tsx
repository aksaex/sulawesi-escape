"use client";
import { createDestination } from "@/app/actions";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useState } from "react";
import { ArrowLeft, Sparkles, Image as ImageIcon, CheckCircle2 } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import UploadWidget from "@/components/UploadWidget"; // Import widget yang kita buat tadi

export default function NewDestinationPage() {
  const [loading, setLoading] = useState(false);
  const [imageUrl, setImageUrl] = useState(""); // State untuk menyimpan URL dari Cloudinary
  const router = useRouter();

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!imageUrl) return alert("Silakan upload gambar terlebih dahulu!");
    
    setLoading(true);
    const formData = new FormData(e.currentTarget);
    formData.set("image", imageUrl); // Pastikan URL gambar yang baru diupload ikut terkirim

    const result = await createDestination(formData);
    if (result.success) {
      router.push("/admin/wisata");
      router.refresh();
    } else {
      alert("Gagal memposting wisata.");
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen bg-[#031a1b] p-4 md:p-10 text-white font-sans relative overflow-hidden">
      <div className="absolute -top-24 -right-24 w-64 h-64 bg-[#f59e0b]/10 blur-[100px] -z-10" />
      
      <div className="max-w-xl mx-auto pt-16 md:pt-20">
        <Link href="/admin/wisata" className="group inline-flex items-center gap-3 text-zinc-400 hover:text-white transition-all mb-8">
          <div className="flex items-center justify-center w-10 h-10 rounded-xl bg-white/5 border border-white/10 group-hover:border-[#f59e0b]/50 group-hover:bg-[#f59e0b] group-hover:text-[#062c2d] transition-all duration-300">
            <ArrowLeft size={18} />
          </div>
          <span className="text-[9px] font-black uppercase tracking-[0.2em]">Back</span>
        </Link>

        <div className="glass p-6 md:p-10 rounded-[2.5rem] border-white/5 shadow-2xl">
          <div className="flex items-center gap-3 mb-8">
             <div className="p-2.5 bg-[#f59e0b] rounded-xl text-[#062c2d]">
                <Sparkles size={18} />
             </div>
             <div>
                <h1 className="text-2xl font-black uppercase italic tracking-tighter">New <span className="text-[#f59e0b]">Journey</span></h1>
                <p className="text-zinc-500 text-[9px] font-bold uppercase tracking-widest">Travel Publications</p>
             </div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-4">
              {/* AREA UPLOAD GAMBAR */}
              <div className="space-y-1.5">
                <Label className="text-[9px] uppercase tracking-[0.2em] text-zinc-500 ml-1 font-bold">Cover Image</Label>
                {imageUrl ? (
                  <div className="relative group rounded-2xl overflow-hidden border border-[#f59e0b]/30">
                    <img src={imageUrl} alt="Preview" className="w-full h-48 object-cover" />
                    <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                      <button type="button" onClick={() => setImageUrl("")} className="bg-red-500 text-white px-4 py-2 rounded-lg text-xs font-bold uppercase tracking-widest">Replace Photo</button>
                    </div>
                    <div className="absolute top-3 right-3 bg-[#f59e0b] text-[#062c2d] p-1.5 rounded-full shadow-lg">
                      <CheckCircle2 size={16} />
                    </div>
                  </div>
                ) : (
                  <UploadWidget onUpload={(url) => setImageUrl(url)} />
                )}
                {/* Input hidden agar form data menangkap URL gambar */}
                <input type="hidden" name="image" value={imageUrl} />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <Label className="text-[9px] uppercase tracking-[0.2em] text-zinc-500 ml-1 font-bold">Trip Title</Label>
                  <Input name="title" placeholder="Mount Latimojong" className="bg-white/5 border-white/10 h-12 rounded-xl focus:ring-[#f59e0b]" required />
                </div>
                <div className="space-y-1.5">
                  <Label className="text-[9px] uppercase tracking-[0.2em] text-zinc-500 ml-1 font-bold">Location</Label>
                  <Input name="location" placeholder="South Sulawesi" className="bg-white/5 border-white/10 h-12 rounded-xl focus:ring-[#f59e0b]" required />
                </div>
              </div>

              <div className="space-y-1.5">
                <Label className="text-[9px] uppercase tracking-[0.2em] text-zinc-500 ml-1 font-bold">Price (IDR)</Label>
                <Input name="price" type="number" placeholder="5500000" className="bg-white/5 border-white/10 h-12 rounded-xl focus:ring-[#f59e0b]" required />
              </div>

              <div className="space-y-1.5">
                <Label className="text-[9px] uppercase tracking-[0.2em] text-zinc-500 ml-1 font-bold">Description</Label>
                <Textarea name="description" placeholder="Write down the details of this trip..." className="bg-white/5 border-white/10 h-32 rounded-xl focus:ring-[#f59e0b] resize-none" required />
              </div>
            </div>

            <Button type="submit" disabled={loading || !imageUrl} className="w-full bg-[#f59e0b] hover:brightness-110 text-[#062c2d] font-black h-14 rounded-xl transition-all shadow-xl shadow-orange-500/10 uppercase tracking-[0.2em] text-[11px]">
              {loading ? "Processing..." : "Publish Journey"}
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
}