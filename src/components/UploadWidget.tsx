"use client";
import { CldUploadWidget } from "next-cloudinary";
import { ImagePlus } from "lucide-react";

interface UploadWidgetProps {
  onUpload: (url: string) => void;
}

export default function UploadWidget({ onUpload }: UploadWidgetProps) {
  return (
    <CldUploadWidget
      uploadPreset="sulawesi-escape" // Pastikan 'Unsigned' aktif di setting Cloudinary
      onSuccess={(result: any) => {
        onUpload(result.info.secure_url);
      }}
    >
      {({ open }) => (
        <button
          type="button"
          onClick={() => open()}
          className="w-full h-32 border-2 border-dashed border-white/10 rounded-2xl flex flex-col items-center justify-center gap-2 hover:border-[#f59e0b]/50 hover:bg-white/5 transition-all group"
        >
          <ImagePlus className="text-zinc-500 group-hover:text-[#f59e0b]" size={24} />
          <span className="text-[10px] font-black uppercase tracking-widest text-zinc-500 group-hover:text-white">
            Upload Trip Photo
          </span>
        </button>
      )}
    </CldUploadWidget>
  );
}