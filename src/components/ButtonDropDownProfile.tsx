import React, { useState } from "react";
import { useSession } from "next-auth/react";
import Link from "next/link";
import Image from "next/image";
import SignOutButton from "./ButtonLogout";

export default function ButtonProfile() {
  const [isOpen, setIsOpen] = useState(false);

  // Toggle dropdown visibility
  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const { data: session } = useSession();
  const profileImageSrc = session?.user?.image || "/assets/user.png";
  const userName = session?.user?.name;
  const userEmail = session?.user?.email;

  return (
    <div className="relative inline-block text-left align-middle">
      {/* Profile Button */}
      <button
        onClick={toggleDropdown}
        className="text-white  focus:ring-2 focus:outline-none  font-medium rounded-full text-sm p-1 flex items-center"
      
      >
        {/* gambar profile */}
        <div className="relative w-10 h-10 rounded-full overflow-hidden group">
          <Image
            src={profileImageSrc} // Gantilah dengan gambar profil
            alt="Profile"
            layout="fill"
            objectFit="cover"
            className="rounded-full group-hover:opacity-80"
          />
        </div>
 
      </button>

      {/* Dropdown Menu */}
      {isOpen && (
        <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg dark:bg-gray-800">
          <div className="py-2">
            <div className="px-4 py-2 text-sm text-gray-900 dark:text-white border-b-2">
              <div>{userName}</div>
              <div className="font-medium truncate">
                {userName || userEmail}
              </div>
            </div>
          </div>
          <ul className="py-2 text-sm text-gray-700 dark:text-gray-200">
            <li>
              <Link
                href="/profile"
                className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
              >
                Dashboard
              </Link>
            </li>
            <li>
              <a
                href="#"
                className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
              >
                Settings
              </a>
            </li>
            <li>
              <a
                href="#"
                className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
              >
                Earnings
              </a>
            </li>
          </ul>
          <div className="py-2 text-center border-t-2">
            <SignOutButton/>
          </div>
        </div>
      )}
    </div>
  );
}
