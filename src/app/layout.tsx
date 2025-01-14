import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

import React from "react";
import SessionWrapper from "../components/SessionProviderWrapper";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "Darbunnajah",
  description: "Website Untuk Belajar",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable}`}>
        <SessionWrapper>
          {children} {/* Bagian anak yang memerlukan session bisa diletakkan di sini */}
        </SessionWrapper>
      </body>
    </html>
  );
}
