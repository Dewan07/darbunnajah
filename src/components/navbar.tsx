"use client";
import Image from "next/image"; // Ganti dengan next/image
import Link from "next/link"; // Ganti navigasi internal dengan Link
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars, faTimes } from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";
import { Button } from "./ui/button";
import { signIn } from "next-auth/react";
import { useSession } from "next-auth/react";
import ButtonSession from "./ButtonSession";

function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const { data: session } = useSession(); // Mengambil sesi dari NextAuth

  // Toggle navbar untuk mengubah status isOpen
  const toggleNavbar = () => {
    setIsOpen(!isOpen);
  };

  return (
    <>
    <div className="bg-gray-50 dark:bg-gray-900"> 
    <div className=" text-gray-800 font-sans dark:bg-gray-900 dark:text-white">
    </div>
      {/* Header */}
      <div className="flex justify-between items-center p-5">
        <div className="flex items-center">
          <Link href="/" className="flex items-center">
            {/* Gunakan next/image untuk gambar */}
            <Image
              className="w-10 rounded"
              src="/assets/logo.png" // Path relatif untuk Next.js
              alt="logo"
              width={40}
              height={40}
            />
            <h2 className="md:font-extrabold ml-2 md:text-xl text-center font-bold text-sm">
              DARBUNNAJAH
            </h2>
          </Link>
        </div>

        {/* Navbar untuk screen besar */}
        <nav className="hidden md:flex md:space-x-4 text-center md:font-extrabold md:text-xl font-bold text-md dark:text-white text-black bg-dark">
          <li className="list-none">
           
          </li>
          <li className="list-none">
            <Link href="/komunitas">
              Komunitas
            </Link>
          </li>

          <li className="list-none">
          {session? (

            <ButtonSession/>  
          ):
          <Link href="/masuk">
            <Button className="bg-green-600 hover:bg-green-700">Masuk / Daftar</Button>
            </Link>
        }

          </li>
              
        </nav>

        {/* Navbar untuk scree  n kecil */}
        <div className="md:hidden">
          <FontAwesomeIcon
            icon={isOpen ? faTimes : faBars}
            className="cursor-pointer text-xl"
            onClick={toggleNavbar}
          />
        </div>
      </div>

      {/* Navbar untuk layar kecil dengan animasi slide-in dan slide-out */}
      <div
        className={`flex flex-col items-center dark:bg-gray-900 text-white bg-gray-600 p-5 fixed top-0 right-0 h-full w-64 transform transition-all duration-500 ${
          isOpen ? "translate-x-0 opacity-100" : "translate-x-full opacity-0"
        } ease-in-out`}
      >
        <FontAwesomeIcon
          icon={faTimes}
          className="absolute top-5 right-5 cursor-pointer text-2xl"
          onClick={toggleNavbar} // Menambahkan fungsi close untuk navbar
        />
        <Link href="/komunitas" className="font-bold mt-4">
          Komunitas
        </Link>
              <Button
              className="w-full"
                onClick={ () => {
                   signIn("Credentials");
                }}
              >Masuk / Daftar</Button>
           
      </div>
      </div>

    </>
  );
}

export default Navbar;