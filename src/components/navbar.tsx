"use client";
import React from "react";

import Image from "next/image";
import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBars,
  faTimes,
  faHeadSideCough,
  faBook,
  faHouse,
  faEnvelope,
  faChalkboardTeacher,
  faBrain,
} from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";
import { useSession,  } from "next-auth/react";
import ButtonProfile from "./ButtonDropDownProfile";
import SignOutButton from "./ButtonLogoutMobile";

const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const { data: session } = useSession();

  const profileImageSrc: string = session?.user?.image || "/assets/user.png";
  const userName: string = session?.user?.name || "Guest";
  const userEmail: string = session?.user?.email || "guest@example.com";

  const toggleNavbar = (): void => setIsOpen(!isOpen);
  const closeNavbar = (): void => setIsOpen(false);
  
  return (
    <>
      {/* Navbar untuk layar besar */}
      <nav className="hidden md:flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-900 text-gray-800 dark:text-white">
        <div className="flex items-center">
          <Link href="/" className="flex items-center">
            <Image
              className="w-10 h-10 rounded"
              src="/assets/logo.png"
              alt="DARBUNNAJAH Logo"
              width={40}
              height={40}
              priority
            />
            <h2 className="ml-2 text-xl font-extrabold">DARBUNNAJAH</h2>
          </Link>
        </div>
        <ul className="flex space-x-6">
          <li>
            <Link href="/" aria-label="beranda" title="Beranda">
              <FontAwesomeIcon icon={faHouse} className="text-3xl hover:text-gray-600" />
            </Link>
          </li>
          <li>
            <Link href="/komunitas" aria-label="Komunitas" title="Komunitas">
              <FontAwesomeIcon icon={faHeadSideCough} className="text-3xl hover:text-gray-600" />
            </Link>
          </li>
          <li>
            <Link href="/ai" aria-label="KecerdasanBuatan" title="Ai">
              <FontAwesomeIcon icon={faBrain} className="text-3xl hover:text-gray-600" />
            </Link>
          </li>
          <li>
            <Link href="/buku" aria-label="Buku" title="Buku">
              <FontAwesomeIcon icon={faBook} className="text-3xl hover:text-gray-600" />
            </Link>
          </li>
          <li>
            <Link href="/kelas" aria-label="Kelas" title="Kelas">
              <FontAwesomeIcon icon={faChalkboardTeacher} className="text-3xl hover:text-gray-600" />
            </Link>
          </li>
          <li>
            <Link href="/pesan" aria-label="Pesan" title="Pesan">
              <FontAwesomeIcon icon={faEnvelope} className="text-3xl hover:text-gray-600" />
            </Link>
          </li>
        </ul>
        <div>
          <ButtonProfile />
        </div>
      </nav>

      {/* Navbar untuk layar kecil */}
      <div className="md:hidden bg-gray-50 dark:bg-gray-900">
        <div className="flex justify-between items-center p-4">
          <Link href="/" className="flex items-center">
            <Image
              className="w-8 h-8 rounded"
              src="/assets/logo.png"
              alt="DARBUNNAJAH Logo"
              width={32}
              height={32}
              priority
            />
            <h2 className="ml-2 text-lg font-bold">DARBUNNAJAH</h2>
          </Link>
          <FontAwesomeIcon
            icon={isOpen ? faTimes : faBars}
            className="text-3xl cursor-pointer"
            onClick={toggleNavbar}
          />
        </div>

        {/* Sidebar menu */}
        <div
          className={`fixed top-0 right-0 h-full w-64 bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-white transform transition-transform duration-300 ${
            isOpen ? "translate-x-0" : "translate-x-full"
          }`}
        >
          <div className="flex flex-col items-center p-6">
            <FontAwesomeIcon
              icon={faTimes}
              className="self-end text-3xl cursor-pointer"
              onClick={closeNavbar}
            />
            <div className="w-20 h-20 relative rounded-full overflow-hidden mt-4">
              <Image
                src={profileImageSrc}
                alt="User Profile"
                width={80}
                height={80}
                className="rounded-full"
                priority
              />
            </div>
            <div className="mt-4 text-center">
              <p className="font-bold">{userName}</p>
              <p className="text-sm text-gray-600 dark:text-gray-300">{userEmail}</p>
            </div>
            <ul className="mt-6 space-y-3 w-full">
              <li className="flex items-center space-x-4">
                <FontAwesomeIcon icon={faHeadSideCough} className="text-3xl hover:text-gray-600" />
                <Link href="/komunitas" onClick={closeNavbar} className="font-semibold">
                  Komunitas
                </Link>
              </li>
              <li className="flex items-center space-x-4">
                <FontAwesomeIcon icon={faBrain} className="text-3xl hover:text-gray-600" />
                <Link href="/ai" onClick={closeNavbar} className="font-semibold">
                  Ai
                </Link>
              </li>
              <li className="flex items-center space-x-4">
                <FontAwesomeIcon icon={faBook} className="text-3xl hover:text-gray-600" />
                <Link href="/buku" onClick={closeNavbar} className="font-semibold">
                  Buku
                </Link>
              </li>
              <li className="flex items-center space-x-4">
                <FontAwesomeIcon icon={faChalkboardTeacher} className="text-3xl hover:text-gray-600" />
                <Link href="/kelas" onClick={closeNavbar} className="font-semibold">
                  Kelas
                </Link>
              </li>
              <li className="flex items-center space-x-4">
                <FontAwesomeIcon icon={faEnvelope} className="text-3xl hover:text-gray-600" />
                <Link href="/pesan" onClick={closeNavbar} className="font-semibold">
                  Pesan
                </Link>
              </li>
            </ul>
            <SignOutButton/>
          </div>
        </div>
      </div>
    </>
  );
};

export default Navbar;
