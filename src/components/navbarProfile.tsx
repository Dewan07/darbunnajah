"use client";
import Image from "next/image"; 
import Link from "next/link"; 
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars, faTimes, faUserCircle } from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";
import { useSession } from "next-auth/react";
import SignOutButton from "@/components/ButtonLogout";

function NavbarProfile() {
  const [isOpen, setIsOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const { data: session } = useSession();

  // Toggle navbar untuk mengubah status isOpen
  const toggleNavbar = () => {
    setIsOpen(!isOpen);
  };

  // Toggle profile dropdown
  const toggleProfileDropdown = () => {
    setIsProfileOpen(!isProfileOpen);
  };

  return (
    <>
      <div className="bg-gray-50 dark:bg-gray-900">
        <div className="text-gray-800 font-sans dark:text-white">
        </div>
        {/* Header */}
        <div className="flex justify-between items-center p-5">
          <div className="flex items-center">
            <Link href="/" className="flex items-center">
              <Image
                className="w-10 rounded"
                src="/assets/logo.png" 
                alt="logo"
                width={30}
                height={30}
              />
              <h2 className="md:font-extrabold ml-2 md:text-xl text-center font-bold text-sm">
                DARBUNNAJAH
              </h2>
            </Link>
          </div>

          {/* Navbar untuk screen besar */}
          <nav className="hidden md:flex md:space-x-6 text-center md:font-extrabold md:text-xl font-bold text-md dark:text-white text-black">
            
            <div className="relative flex items-center cursor-pointer" onClick={toggleProfileDropdown}>
              <span className="mt-auto mx-auto ml-3 flex items-center border-2 border-green-500 rounded-full p-2">
                {/* Menampilkan nama user */}
                <span className="mr-2 text-lg font-semibold text-gray-800 dark:text-white">
                  {session?.user?.name}
                </span>

                {/* Menampilkan gambar atau ikon user */}
                {session?.user?.image ? (
                  <Image
                    src={session.user.image}
                    alt={session.user.name || "User"}
                    width={30}
                    height={30}
                    className="rounded-full"
                  />
                ) : (
                  <FontAwesomeIcon icon={faUserCircle} className="text-xl text-gray-800 dark:text-white" />
                )}
              </span>

              {/* Profile Dropdown */}
              {isProfileOpen && (
                <ul className="absolute top-12 right-0 bg-white shadow-lg rounded-md py-2 w-48 dark:bg-gray-800 transform transition-all duration-200 ease-in-out z-50">
                  <li className="px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-700">
                    <Link href="/profile" className="text-gray-800 dark:text-white">Edit Profile</Link>
                  </li>
                  <li className="px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-700">
                    <Link href="/settings" className="text-gray-800 dark:text-white">Settings</Link>
                  </li>
                  <li className="px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-700">
                    <SignOutButton />
                  </li>
                </ul>
              )}
            </div>
          </nav>

          {/* Navbar untuk screen kecil */}
          <div className="md:hidden">
            <FontAwesomeIcon
              icon={isOpen ? faTimes : faBars}
              className="cursor-pointer text-xl"
              onClick={toggleNavbar}
            />
          </div>
        </div>

        {/* Navbar untuk layar kecil */}
        <div
          className={`fixed top-0 right-0 h-full w-64 bg-gray-600 dark:bg-gray-900 text-white p-5 transform transition-all duration-500 ${isOpen ? "translate-x-0 opacity-100" : "translate-x-full opacity-0"} ease-in-out z-50`}
        >
          <FontAwesomeIcon
            icon={faTimes}
            className="absolute top-5 right-5 cursor-pointer text-2xl"
            onClick={toggleNavbar}
          />
          {/* mobile */}
          
          <ul className="rounded-md py-2 w-48 dark:bg-gray-800 transform transition-all duration-200 ease-in-out z-50">
          <Image src={session?.user?.image || "/assets/user.png"} alt={session?.user?.name || "User"} width={50} height={50} className=" flex rounded-full justify-center items-center" />
                  <li>
                <span className="mr-2 text-lg font-semibold text-gray-800 dark:text-white">
                
                  {session?.user?.name}
                </span>
                  </li>
                  <li className="px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-700">
                    <Link href="/profile" className="text-gray-800 dark:text-white">Edit Profile</Link>
                  </li>
                  <li className="px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-700">
                    <Link href="/settings" className="text-gray-800 dark:text-white">Settings</Link>
                  </li> 
                  <li className="px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-700">
                    <SignOutButton />
                  </li>
                </ul>
        </div>
      </div>
    </>
  );
}

export default NavbarProfile;
