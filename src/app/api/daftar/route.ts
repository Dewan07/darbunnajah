import { prisma } from "@/lib/prisma";
import { NextResponse, NextRequest } from "next/server";
import bcrypt from "bcryptjs";
import { sendEmail } from "@/lib/nodemailer";
import { sign } from "jsonwebtoken";


export async function POST(req: NextRequest, res: NextResponse) {
  try {
    // Parsing body dari request
    const { email, password } = await req.json();

    // Validasi input
    if (!email || !password) {
      return NextResponse.json({ error: "Email dan password wajib diisi." }, { status: 400 });
    } 

    // Cek apakah email sudah terdaftar
    const existingUser = await prisma.user.findUnique({
      where: { email },
    });

    // Jika email sudah digunakan, kembalikan respons tanpa mencetak log
    if (existingUser) {
      return NextResponse.json({ error: "Tidak bisa mendaftar email sudah digunakan." }, { status: 409 });
    }

    // Enkripsi password
    const hashedPassword = await bcrypt.hash(password, 10); // Salt rounds = 10
    // verivikasi kode
    const verificationToken = Math.floor(100000 + Math.random() * 900000).toString();
    // Buat pengguna baru di database
    const newUser = await prisma.user.create({
      data: {
        email,
        password: hashedPassword, // Simpan password yang sudah di-hash
        verificationToken ,
        isVerified: false,
      },
    });

    //mengrim kode ke email
    const verificationEmail = `
          <h1>Verifikasi Email Anda</h1>
          <p>Gunakan kode berikut untuk memverifikasi akun Anda:</p>
          <h2>${verificationToken}</h2>
          <p>Kode ini berlaku selama 10 menit.</p>
        `;
    
        await sendEmail(email, "Verifikasi Email Anda", verificationEmail);
    // Berikan respon sukses
    return NextResponse.json({ message: "Pendaftaran berhasil!,", user: { email: newUser.email } }, { status: 201 });
  } catch (error) {
    // Cetak log hanya untuk error yang tidak terduga
    console.error("Unexpected error:", error);
    return NextResponse.json({ error: "Terjadi kesalahan server." }, { status: 500 });
  }
}
