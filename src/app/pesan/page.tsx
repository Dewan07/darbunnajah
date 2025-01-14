// src/app/pesan/page.tsx
"use client";   
import React, { useState } from 'react';

const PesanPage = () => {
  const [messages, setMessages] = useState([
    { sender: 'Anda', text: 'Halo, ada yang bisa saya bantu?' },
    { sender: 'Pengguna', text: 'Saya butuh bantuan untuk proyek saya.' },
    { sender: 'Anda', text: 'Tentu, proyek apa yang sedang Anda kerjakan?' },
  ]);
  const [newMessage, setNewMessage] = useState('');

  // Fungsi untuk mengirim pesan
  const handleSendMessage = () => {
    if (newMessage.trim() !== '') {
      setMessages([...messages, { sender: 'Anda', text: newMessage }]);
      setNewMessage(''); // Kosongkan input setelah pesan dikirim
    }
  };

  return (
    <div className="flex flex-col p-4 h-screen">
      <h1 className="text-3xl font-semibold mb-4">Halaman Pesan</h1>
      
      {/* Area chat */}
      <div className="flex-1 overflow-auto mb-4 p-4 bg-gray-100 dark:bg-gray-800 rounded-lg shadow-lg">
        <div className="space-y-4">
          {messages.map((message, index) => (
            <div
              key={index}
              className={`flex ${message.sender === 'Anda' ? 'justify-end' : 'justify-start'}`}
            >
              <div
                className={`px-4 py-2 rounded-lg max-w-xs ${message.sender === 'Anda' ? 'bg-blue-500 text-white' : 'bg-gray-300 text-gray-900'}`}
              >
                <p className="font-semibold">{message.sender}</p>
                <p>{message.text}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Input pesan */}
      <div className="flex items-center">
        <input
          type="text"
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          placeholder="Tulis pesan..."
          className="flex-1 p-2 border border-gray-300 dark:border-gray-700 rounded-l-lg focus:outline-none dark:bg-gray-700 dark:text-white"
        />
        <button
          onClick={handleSendMessage}
          className="p-2 bg-blue-500 text-white rounded-r-lg hover:bg-blue-600"
        >
          Kirim
        </button>
      </div>
    </div>
  );
};

export default PesanPage;
