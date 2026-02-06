import db from "@/lib/prisma";
import { notFound } from "next/navigation";
import EditTripForm from "@/components/admin/EditTripForm";

export default async function EditWisataPage({ 
  params 
}: { 
  params: Promise<{ id: string }> 
}) {
  const { id } = await params;

  // Ambil data langsung di server (Tidak perlu API route)
  const trip = await db.destination.findUnique({
    where: { id },
  });

  if (!trip) {
    notFound();
  }

  // Kirim data ke Client Component
  return <EditTripForm trip={trip} />;
}