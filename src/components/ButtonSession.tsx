import { useSession, signOut } from 'next-auth/react';
import { useState } from 'react';
import { Button } from './ui/button';
import Link from 'next/link';

export default function ButtonSession() {
  const { data: session } = useSession();
  const [isDropdownOpen, setDropdownOpen] = useState(false);

  // Toggle dropdown visibility
  const toggleDropdown = () => {
    setDropdownOpen(!isDropdownOpen);
  };

  // Handle logout
  const handleLogout = () => {
    signOut(); // Memanggil signOut dari NextAuth untuk logout
  };

  return (
    <>
      <Button onClick={toggleDropdown}>
        {session ? `Welcome, ${session.user?.name || session.user?.email}` : 'Sign In'}
      </Button>

      {isDropdownOpen && session && (
        <div className="absolute mt-2 right-0 w-48 bg-white border border-gray-200 shadow-lg rounded-md">
          <ul>
            <li>
              <Link href="/profile">
              <button>
                Profile Settings
              </button>
              </Link>
              
            </li>
            <li>
              <button
                className="w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-100"
                onClick={handleLogout}
              >
                Logout
              </button>
            </li>
          </ul>
        </div>
      )}
    </>
  );
}
