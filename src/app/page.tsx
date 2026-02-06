import { Suspense } from "react"; // 1. Import Suspense
import Hero from "@/components/sections/Hero";
import BentoGrid from "@/components/sections/BentoGrid";
import BookingForm from "@/components/sections/BookingForm";
import db from "@/lib/prisma";

export default async function Home() {
  const destinations = await db.destination.findMany({
    select: {
      id: true,
      title: true,
    },
    orderBy: {
      title: "asc",
    },
  });

  return (
    <main className="min-h-screen bg-[#062c2d]">
      <Hero />
      <BentoGrid />

      <section id="booking" className="relative z-10">
        {/* 2. Bungkus BookingForm dengan Suspense */}
        <Suspense fallback={
          <div className="py-20 text-center text-zinc-500 uppercase text-[10px] tracking-widest">
            Loading Booking Engine...
          </div>
        }>
          <BookingForm destinations={destinations} />
        </Suspense>
      </section>
      
      {/* Footer bisa dibiarkan atau dihapus jika Anda sudah pakai komponen Footer.tsx yang kita buat tadi */}
    </main>
  );
}