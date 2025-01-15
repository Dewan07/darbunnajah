"use client";
import { faBars, faCompass, faSearch } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useState } from "react";

export default function Chat() {
  // State untuk mengatur ukuran elemen
  const [isExpanded, setIsExpanded] = useState(false);
  // const [isSerachuser, setIsSearchUser] = useState(false);

  const toggleExpand = () => {
    setIsExpanded((prev) => !prev);
  };

  // const HandleSearchUser = () => {
  //   setIsSearchUser(true);
  // };
  return (
    <>
      {/* Navbar */}

      {/* Main Content */}
      <div className="flex h-screen flex-row">
        {/* Section Kontak */}
        <section
          id="kontak"
          className={`md:w-1/5 bg-slate-500 p-4 md:bg-pink-400 
            transition-all
            ease-in-out
            duration-300
            ${
              isExpanded ? "w-1/3" : "w-1/6" // Memperbesar lebar hanya di perangkat mobile
            }`}
        >
          <FontAwesomeIcon
            icon={faBars}
            onClick={toggleExpand}
            className="cursor-pointer "
          />{" "}
          <br />
          {/* Konten kontak */}
          <div className="inline-flex items-center">
            <FontAwesomeIcon
              icon={faSearch}
              className="mt-5 cursor-pointer"
              
            />
            <h2 className="ml-2">Cari</h2>
          </div>
        </section>

        {/* Section Chat */}
        <section id="chat" className="flex-grow bg-green-800 p-4">
          <h2 className="text-white">CHAT</h2>
          {/* Konten chat */}
        </section>

        {/* Section Status */}
        <section id="status" className="md:w-1/6 flex-grow-0 bg-red-500 p-4">
          <FontAwesomeIcon icon={faCompass} />
          {/* Konten status */}
        </section>
      </div>
    </>
  );
}
