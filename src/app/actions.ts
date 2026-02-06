"use server";

import db from "@/lib/prisma";
import { revalidatePath } from "next/cache";

/**
 * ==========================================
 * ACTIONS: BOOKING (Untuk User & Admin)
 * ==========================================
 */

// Create Booking - Digunakan user di Landing Page
export async function createBooking(formData: FormData) {
  const name = formData.get("name") as string;
  const whatsapp = formData.get("whatsapp") as string;
  const guests = parseInt(formData.get("guests") as string);
  const dateString = formData.get("date") as string;
  const destinationId = formData.get("destinationId") as string;

  if (!name || !whatsapp || !destinationId || isNaN(guests)) {
    return { success: false, message: "Data tidak lengkap atau tidak valid" };
  }

  try {
    await db.booking.create({
      data: {
        customerName: name,
        customerWa: whatsapp,
        guestCount: guests,
        bookingDate: new Date(dateString),
        destinationId: destinationId,
      },
    });
    
    revalidatePath("/admin"); 
    return { success: true };
  } catch (error) {
    console.error("Database Error (Booking):", error);
    return { success: false, message: "Gagal mengirim permintaan booking" };
  }
}

// Delete Booking - Digunakan admin di Dashboard Admin
export async function deleteBooking(id: string) {
  if (!id) return { success: false, message: "ID diperlukan" };
  try {
    await db.booking.delete({ where: { id } });
    revalidatePath("/admin");
    return { success: true };
  } catch (error) {
    console.error("Database Error (Delete Booking):", error);
    return { success: false };
  }
}

/**
 * ==========================================
 * ACTIONS: DESTINATION (Untuk Manajemen Wisata)
 * ==========================================
 */

// Create Destination - Post wisata baru
export async function createDestination(formData: FormData) {
  const title = formData.get("title") as string;
  const location = formData.get("location") as string;
  const description = formData.get("description") as string;
  const price = parseInt(formData.get("price") as string);
  const image = formData.get("image") as string;

  if (!title || !location || !description || isNaN(price) || !image) {
    return { success: false, message: "Semua field wajib diisi" };
  }

  try {
    await db.destination.create({
      data: { title, location, description, price, image },
    });

    revalidatePath("/");
    revalidatePath("/admin/wisata"); 
    return { success: true };
  } catch (error) {
    console.error("Database Error (Create Destination):", error);
    return { success: false };
  }
}

// Update Destination - Edit wisata yang sudah ada
export async function updateDestination(id: string, formData: FormData) {
  const title = formData.get("title") as string;
  const location = formData.get("location") as string;
  const description = formData.get("description") as string;
  const price = parseInt(formData.get("price") as string);
  const image = formData.get("image") as string;

  try {
    await db.destination.update({
      where: { id },
      data: { title, location, description, price, image },
    });
    revalidatePath("/");
    revalidatePath("/admin/wisata");
    return { success: true };
  } catch (error) {
    console.error("Database Error (Update Destination):", error);
    return { success: false };
  }
}

// Delete Destination - Hapus paket wisata
export async function deleteDestination(id: string) {
  try {
    await db.destination.delete({ where: { id } });
    revalidatePath("/");
    revalidatePath("/admin/wisata");
    return { success: true };
  } catch (error) {
    console.error("Database Error (Delete Destination):", error);
    return { success: false };
  }
}