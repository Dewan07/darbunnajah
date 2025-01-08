"use client";

import { useSession } from "next-auth/react";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import SignOutButton from "@/components/ButtonLogout";

const Profile = () => {
  const { data: session, status } = useSession();
  const router = useRouter();
  

  useEffect(() => {
    if (status === "unauthenticated") {
      router.push('/masuk');
      alert("Anda belum masuk"); // Mengarahkan ke halaman login
    }
  }, [status]);

  if (status === "loading") {
    return <div>Loading...</div>;
  }

  if (!session) {
    return null; // Atau Anda bisa menampilkan pesan lain
  }

  return (
    <div>
      <h1>Welcome, {session.user?.name}</h1>
      <p>Email: {session.user?.email}</p>
      <div>
        <SignOutButton />
      </div>
    </div>
  );
};

export default Profile;