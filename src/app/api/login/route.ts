import { prisma } from "@/lib/prisma";
import bcrypt from "bcryptjs";
import { NextResponse } from "next/server";
import { NextRequest } from "next/server";


const SECRET_KEY = process.env.NEXTAUTH_SECRET as string;

export async function POST(req: NextRequest) {
  const { email, password }: { email: string; password: string } =
    await req.json();

  // Periksa apakah pengguna sudah login
  const token = req.cookies.get("token");
  if (token) {
    return NextResponse.json({ message: "Anda sudah login" }, { status: 400 });
  }

  // Periksa apakah email dan password valid
  if (email.length < 3) {
    return NextResponse.json(
      { message: "Email harus memiliki minimal 3 karakter" },
      { status: 400 }
    );
  }

  try {
    // Cari pengguna di database
    const user = await prisma.user.findUnique({
      where: { email },
    });

    if (!user) {
      return NextResponse.json({ message: "User not found" }, { status: 404 });
    }

    // Periksa apakah password sudah di-hash
    if (!user.password) {
      return NextResponse.json(
        { message: "Invalid password" },
        { status: 400 }
      );
    }

    // Periksa apakah password yang diinputkan sudah benar
    const isValidPassword = await bcrypt.compare(password, user.password);
    if (!isValidPassword) {
      return NextResponse.json(
        { message: "Invalid password" },
        { status: 400 }
      );
    }

    //membuat foto profile jika belum ada
    


  } catch (error) {
    const errorMessage =
      error instanceof Error ? error.message : "Unknown error";
    return NextResponse.json(
      { message: "Server error", error: errorMessage },
      { status: 500 }
    );
  }
}
