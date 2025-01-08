import nodemailer from "nodemailer";

export const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com", // Bisa diubah ke SMTP lain seperti Outlook atau SMTP server lain
  port: 587,
  secure: false,
  auth: {
    user: process.env.EMAIL_SERVER_USER, // Email pengirim
    pass: process.env.EMAIL_SERVER_PASSWORD, // Password aplikasi (bukan password biasa)
  },
});

// Fungsi untuk mengirim email
export const sendEmail = async (to: string, subject: string, html: string) => {
  await transporter.sendMail({
    from: `"Darbunnajah" <${process.env.EMAIL_USER}>`, // Nama pengirim
    to, // Email tujuan
    subject, // Subjek email
    html, // Isi email dalam format HTML
  });
};
