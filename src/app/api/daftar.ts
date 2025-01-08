// pages/api/daftar.js

import bcrypt from 'bcryptjs';

export default async function handler(req: { method: string; body: { email: any; password: any; confirmPassword: any; namaLengkap: any; nomorTelepon: any; alamat: any; }; }, res: { status: (arg0: number) => { (): any; new(): any; json: { (arg0: { message: string; }): void; new(): any; }; }; }) {
  if (req.method === 'POST') {
    const { email, password, confirmPassword, namaLengkap, nomorTelepon, alamat } = req.body;

    if (password !== confirmPassword) {
      return res.status(400).json({ message: "Konfirmasi password tidak cocok." });
    }

    // Validasi password yang kuat
    const passwordRegex = /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    if (!passwordRegex.test(password)) {
      return res.status(400).json({ message: "Password tidak cukup kuat." });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Lakukan penyimpanan data ke database di sini (misalnya menggunakan MongoDB, MySQL, dll)
    // Contoh:
    // await UserModel.create({ email, hashedPassword, namaLengkap, nomorTelepon, alamat });

    res.status(201).json({ message: 'Registrasi berhasil' });
  } else {
    res.status(405).json({ message: 'Method Not Allowed' });
  }
}
