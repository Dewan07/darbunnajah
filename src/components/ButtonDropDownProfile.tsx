import React, { useState } from "react";
import { useSession, signIn } from "next-auth/react";
import Link from "next/link";
import Image from "next/image";
import SignOutButton from "./ButtonLogout";
import { Button } from "./ui/button";

const ButtonProfile: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);

  // Toggle dropdown visibility
  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const { data: session } = useSession();
  const profileImageSrc = session?.user?.image || "/assets/user.png";
  const userName = session?.user?.name || "Guest";
  const userEmail = session?.user?.email || "guest@example.com";

  return (
    <div className="relative inline-block text-left align-middle">
      {session ? (
        <>
          {/* Jika sudah login, tampilkan gambar profil */}
          <button
            onClick={toggleDropdown}
            className="text-white focus:ring-2 focus:outline-none font-medium rounded-full text-sm p-1 flex items-center"
          >
            <div className="relative w-10 h-10 rounded-full overflow-hidden group">
              <Image
                src={profileImageSrc}
                alt="Profile"
                width={40}
                height={40}
                className="rounded-full group-hover:opacity-80"
              />
            </div>
          </button>

          {/* Dropdown Menu */}
          {isOpen && (
            <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg dark:bg-gray-800">
              <div className="py-2">
                <div className="px-4 py-2 text-sm text-gray-900 dark:text-white border-b-2">
                  <div>{userName || userEmail}</div>
                  <div className="font-medium truncate">{userEmail||userName}</div>
                </div>
              </div>
              <ul className="py-2 text-sm text-gray-700 dark:text-gray-200">
                <li>
                  <Link
                    href="/profile"
                    className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                  >
                    Profile
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
                <SignOutButton />
              </div>
            </div>
          )}
        </>
      ) : (
        <>
          {/* Jika belum login, tampilkan tombol Sign In */}
          <Button
            onClick={() => signIn()}
          >
            Sign In
          </Button>
        </>
      )}
    </div>
  );
};

export default ButtonProfile;
