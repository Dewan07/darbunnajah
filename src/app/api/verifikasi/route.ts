import { prisma } from "../../../lib/prisma";
import { sign } from "jsonwebtoken";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const { kode } = await req.json(); // Receive 'kode' from frontend

  // Validate input
  if (!kode || kode.length !== 6) {
    return NextResponse.json(
      { error: "Kode verifikasi tidak valid. Pastikan kode 6 digit." },
      { status: 400 }
    );
  }

  // Search user by verification token (assuming verificationToken is the code sent to the user)
  const user = await prisma.user.findUnique({
    where: {
      verificationToken: kode, // Use the 'kode' as the verification token
    },
  });

  if (!user) {
    return NextResponse.json(
      { error: "Kode verifikasi tidak ditemukan. Cek kembali email Anda." },
      { status: 400 }
    );
  }

  // Update user verification status
  const updatedUser = await prisma.user.update({
    where: { email: user.email }, // Ensure to find the user by email
    data: { isVerified: true }, // Set user as verified
  });

  // Issue JWT token
  if (!process.env.NEXTAUTH_SECRET) {
    throw new Error("NEXTAUTH_SECRET is not defined");
  }

  const token = sign(
    { id: updatedUser.id, email: updatedUser.email },
    process.env.NEXTAUTH_SECRET,
    { expiresIn: "1h" }
  );

  // Create session in the database
  await prisma.session.create({
    data: {
      sessionToken: token, // Store the JWT token in session
      userId: updatedUser.id, // Link session with the user
      expires: new Date(Date.now() + 3600 * 1000), // Set session expiration time (1 hour)
    },
  });

  // Return success response with JWT
  const response = NextResponse.json({
    message: "Pendaftaran berhasil! Silakan verifikasi email Anda.",
  });

  // Set the JWT session token cookie
  response.cookies.set("next-auth.session-token", token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    maxAge: 3600, // 1 hour
    path: "/",
  });

  return response;
}
