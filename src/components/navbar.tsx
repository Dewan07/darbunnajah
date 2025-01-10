"use client";
import Image from "next/image"; // Ganti dengan next/image
import Link from "next/link"; // Ganti navigasi internal dengan Link
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars, faTimes, faHeadSideCough, faBook } from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";
import { useSession } from "next-auth/react";
import ButtonProfile from "./ButtonDropDownProfile";

function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const { data: session } = useSession(); // Mengambil sesi dari NextAuth
  const profileImageSrc = session?.user?.image || "asset/user.png";
  const userName = session?.user?.name;
  const userEmail = session?.user?.email;

  // Toggle navbar untuk mengubah status isOpen
  const toggleNavbar = () => {
    setIsOpen(!isOpen);
  };

  return (
    <>
      <nav className="hidden md:flex md:space-x-4 text-center md:font-extrabold md:text-xl font-bold text-md dark:text-white text-black bg-dark"></nav>
      <div className="bg-gray-50 dark:bg-gray-900">
        <div className="text-gray-800 font-sans dark:bg-gray-900 dark:text-white"></div>
        {/* Header */}
        <div className="flex justify-between items-center p-3"> {/* Mengurangi padding */}
          <div className="flex items-center">
            <Link href="/" className="flex items-center">
              {/* Ganti gambar logo */}
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
          <ul className="hidden md:flex justify-center flex-grow items-center px-1"> {/* Menempatkan di tengah */}
            <li className="list-none mx-4">
              <Link href="/komunitas">
                <FontAwesomeIcon icon={faHeadSideCough} className="text-4xl hover:opacity-80 " title="Komunitas" />
              </Link>
            </li>
            <li className="list-none mx-4">
              <Link href="/buku">
              <FontAwesomeIcon icon={faBook} className="text-4xl hover:opacity-80" title="Buku"/>
              </Link>
            </li>
          </ul>

          {/* Profil di sebelah kanan */}
          <div className="hidden md:flex items-center">
            <ButtonProfile />
          </div>

          {/* Navbar untuk screen kecil */}
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
          <div className="relative w-20 h-20 rounded-full overflow-hidden group">
            <Image
              src={profileImageSrc} // Gantilah dengan gambar profil
              alt="Profile"
              layout="fill"
              objectFit="cover"
              className="rounded-full group-hover:opacity-80"
            />
          </div>
          {/* list */}
          <div className="py-2">
            <div className="px-4 py-2 text-sm text-gray-900 dark:text-white">
              <div>{userName}</div>
              <div className="font-medium truncate">
                {userEmail || userName}
              </div>
            </div>
          </div>
          {/* komunitas */}
          <Link href="/komunitas" className="font-bold mt-4">
            Komunitas
          </Link>
        </div>
      </div>
    </>
  );
}

export default Navbar;
