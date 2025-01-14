// src/app/kelas/page.tsx
"use client"
import React, { useState } from 'react';

const KelasPage = () => {
  const [darkMode, setDarkMode] = useState(false);

  // Toggle dark mode
  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
    document.documentElement.classList.toggle('dark', !darkMode);
  };

  // Daftar kelas contoh
  const classes = [
    {
      title: "Kelas Pemrograman Web",
      description: "Belajar HTML, CSS, dan JavaScript untuk membangun website.",
    },
    {
      title: "Kelas ReactJS",
      description: "Memahami konsep dasar dan lanjutan ReactJS.",
    },
    {
      title: "Kelas Next.js",
      description: "Membangun aplikasi web modern dengan Next.js.",
    },
  ];

  return (
    <div className="min-h-screen p-4">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-semibold">Daftar Kelas</h1>
        <button
          onClick={toggleDarkMode}
          className="p-2 rounded-full bg-gray-200 dark:bg-gray-700"
        >
          {darkMode ? (
            <span className="text-gray-900 dark:text-white">🌙</span>
          ) : (
            <span className="text-gray-900 dark:text-white">☀️</span>
          )}
        </button>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {classes.map((kelas, index) => (
          <div key={index} className="border p-4 rounded-lg shadow-lg dark:bg-gray-800 dark:border-gray-700">
            <h2 className="text-2xl font-semibold">{kelas.title}</h2>
            <p className="text-gray-700 dark:text-gray-300">{kelas.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default KelasPage;
