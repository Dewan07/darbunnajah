"use client";

import { useSession } from "next-auth/react";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import SignOutButton from "@/components/ButtonLogout";
import NavbarProfile from "@/components/navbarProfile";
import Image from "next/image";

const Profile = () => {
  const { data: session, status } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/masuk");
      alert("Anda belum masuk"); // Mengarahkan ke halaman login
    }
  }, [status]);

  if (status === "loading") {
    return <div>Loading...</div>;
  }

  if (!session) {
    return null; // Atau Anda bisa menampilkan pesan lain
    alert("sesi anda tidak ada silahkan masuk kembali")
  }

  // Check if the user has a profile image, otherwise use a logo image
  const profileImageSrc = session?.user?.image || "/assets/user.png";
  const userName = session?.user?.name;
  const userEmail = session?.user?.email;
  

  return (
    <div>
      <NavbarProfile />

      {/* Ini halaman profile */}
      <div className="flex flex-col items-center justify-center">
        <Image
          src={profileImageSrc} // Using logo if no profile image
          alt="Profile picture"
          width={200}
          height={200}
          className="rounded-full"
        />
        <h1 className="text-2xl font-bold mt-4">{session.user.name}</h1>
        <p className="text-gray-500">{session.user.email}</p>
        <SignOutButton />
      </div>
    </div>
  );
};

export default Profile;
