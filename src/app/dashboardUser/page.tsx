"use client";
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useSession } from 'next-auth/react';

const Dashboard = () => {
  const router = useRouter();
  const { data: session, status } = useSession();

  useEffect(() => {
    if (status === 'unauthenticated') {
      router.push('/login');
    }
  }, [status, router]);

  if (status === 'loading') {
    return <div>Loading...</div>;
  }

  if (!session) {
    return <div>Anda belum login</div>;
  }

  return (
    <div>
      <h1>Dashboard</h1>
      <p>Selamat datang, {session.user.name}!</p>
    </div>
  );
};

export default Dashboard;