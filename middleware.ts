import { NextResponse } from "next/server";
import { NextRequest } from "next/server";
import jwt from "jsonwebtoken";

const SECRET_KEY = process.env.JWT_SECRET || "your-secret-key";

export async function middleware(req: NextRequest) {
  const token = req.cookies.get("token")?.value;

  // Jika token tidak ada, redirect ke halaman login
  if (!token) {
    return NextResponse.redirect(new URL("/profile", req.url));
  }

  try {
    // Verifikasi token
    jwt.verify(token, SECRET_KEY);
    return NextResponse.next(); // Lanjutkan request
  } catch (err) {
    return NextResponse.redirect(new URL("/masuk", req.url));
  }
}

// Tentukan route mana yang diproteksi
export const config = {
  matcher: ["/profile/:path*", "/dashboard/:path*","/ai/:path*"], // Proteksi halaman tertentu
};
