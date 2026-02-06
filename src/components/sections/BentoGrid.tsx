// src/components/sections/BentoGrid.tsx
import db from "@/lib/prisma";
import BentoGridClient from "@/components/sections/BentoGridClient"; // Gunakan alias @ agar lebih pasti

export default async function BentoGrid() {
  const destinations = await db.destination.findMany({
    orderBy: { createdAt: "desc" },
    take: 6,
  });

  if (destinations.length === 0) return null;

  return <BentoGridClient destinations={destinations} />;
}