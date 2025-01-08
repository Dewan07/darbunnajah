import { createCanvas } from "canvas";
import { NextResponse } from "next/server";

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const name = searchParams.get("name") || "User";

  // Membuat kanvas dengan ukuran 128x128
  const canvas = createCanvas(128, 128);
  const ctx = canvas.getContext("2d");

  // Warna latar belakang acak
  ctx.fillStyle = `hsl(${Math.random() * 360}, 70%, 80%)`;
  ctx.fillRect(0, 0, 128, 128);

  // Inisial nama
  const initials = name
    .split(" ")
    .map((word) => word[0])
    .join("")
    .toUpperCase();

  // Tulis inisial di tengah
  ctx.fillStyle = "#ffffff";
  ctx.font = "bold 64px Arial";
  ctx.textAlign = "center";
  ctx.textBaseline = "middle";
  ctx.fillText(initials, 64, 64);

  // Kirim gambar sebagai respons
  const buffer = canvas.toBuffer("image/png");
  return new NextResponse(buffer, {
    headers: {
      "Content-Type": "image/png",
      "Content-Length": buffer.length.toString(),
    },
  });
}
