"use client";

import { useSession } from "next-auth/react";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import React from "react";
import Navbar from "../../components/navbar";
import SignOutButton from "../../components/ButtonLogout";

const Profile = () => {
  const { data: session, status } = useSession();
  const router = useRouter();

  // Menggunakan useEffect untuk redirect ketika status unauthenticated
  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/masuk");
    }
  }, [status, router]);

  if (status === "loading") {
    return (
      <div className="flex justify-center items-center">
        <div className="spinner-border animate-spin"></div>
      </div>
    ); // Menampilkan spinner loading saat status masih loading
  }

  if (!session) {
    return <div>Gagal memuat sesi. Silakan coba lagi.</div>; // Pesan error jika session tidak ada
  }

  // Menentukan image profile atau default jika tidak ada
  const profileImageSrc = session?.user?.image || "/assets/user.png";
  const userName = session?.user?.name;
  const userEmail = session?.user?.email;

  return (
    <div>
      <Navbar />
      <div className="flex flex-col items-center justify-center">
        <Image
          src={profileImageSrc}
          alt="Profile picture"
          width={200}
          height={200}
          className="rounded-full"
        />
        <h1 className="text-2xl font-bold mt-4">{userName}</h1>
        <p className="text-gray-500">{userEmail}</p>
        <SignOutButton />
      </div>
    </div>
  );
};

export default Profile;
