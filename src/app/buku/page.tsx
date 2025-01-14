// src/app/buku/page.tsx

import React from "react";

const BookPage = () => {
  // Daftar buku contoh
  const books = [
    {
      title: "Belajar Next.js",
      author: "Dedik Kurniawan",
      description: "Panduan lengkap untuk menguasai Next.js dari awal hingga mahir.",
    },
    {
      title: "Pemrograman JavaScript",
      author: "John Doe",
      description: "Buku ini membahas konsep-konsep dasar dan lanjutan JavaScript.",
    },
    {
      title: "React for Beginners",
      author: "Jane Smith",
      description: "Buku untuk pemula yang ingin belajar React dengan mudah dan menyenangkan.",
    },
  ];

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold text-center mb-6">Daftar Buku</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {books.map((book, index) => (
          <div key={index} className="border p-4 rounded-lg shadow-lg">
            <h2 className="text-2xl font-semibold">{book.title}</h2>
            <p className="text-gray-600">Penulis: {book.author}</p>
            <p className="mt-2 text-gray-700">{book.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default BookPage;
