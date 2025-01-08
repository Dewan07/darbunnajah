"use client";
import React, { FormEvent, useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";

const VerifikasiPage: React.FC = () => {
  const [kode, setKode] = useState("");
  const [isVerified, setIsVerified] = useState(false);
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [resendMessage, setResendMessage] = useState(""); // Feedback for resend
  const router = useRouter();
  const { data: session, status } = useSession();

  useEffect(() => {
    // If the user is unauthenticated, redirect them to the login page
    if (status === "unauthenticated") {
      router.push("/masuk"); // Redirect to login page
      alert("Anda belum masuk. Silakan masuk terlebih dahulu.");
    }
  }, [status, router]);

  // Handle input change
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const inputKode = e.target.value;
    if (/^\d*$/.test(inputKode)) {
      setKode(inputKode);
      setError(""); // Clear error message if input is valid
    } else {
      setError("Kode hanya boleh berisi angka.");
    }
  };

  // Handle form submission
  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError(""); // Clear previous error messages
    setResendMessage(""); // Clear resend message

    try {
      const response = await fetch("/api/verifikasi", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ kode }),
      });

      if (response.ok) {
        const data = await response.json();
        
        // Only update the status if the user is authenticated
        if (status === "authenticated") {
          setIsVerified(true);
          router.push("/profile");
        } else {
          setError("Anda tidak terautentikasi. Silakan masuk.");
        }
      } else {
        const data = await response.json();
        setError(data.error || "Terjadi kesalahan saat verifikasi.");
      }
    } catch (err) {
      setError("Terjadi kesalahan koneksi. Silakan coba lagi.");
    } finally {
      setIsLoading(false);
    }
  };

  // Handle resend code
  const handleResend = async () => {
    if (!session?.user?.email) {
      setError("Gagal mendapatkan email dari sesi. Coba lagi.");
      return;
    }

    setIsLoading(true);
    setError(""); // Clear previous error messages
    setResendMessage(""); // Clear resend message

    try {
      const response = await fetch("/api/resend", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email: session?.user?.email }), // Use email from session
      });

      if (response.ok) {
        setResendMessage("Kode telah dikirim ulang. Silakan cek email Anda.");
      } else {
        const data = await response.json();
        setError(data.error || "Gagal mengirim ulang kode.");
      }
    } catch (err) {
      setError("Terjadi kesalahan koneksi. Silakan coba lagi.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex h-screen items-center justify-center">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-6 rounded shadow-md w-96"
      >
        <h2 className="text-2xl mb-4">Verifikasi Kode</h2>
        <label htmlFor="kode" className="sr-only">Masukkan kode verifikasi</label>
        <input
          type="text"
          id="kode"
          value={kode}
          onChange={handleInputChange}
          className="border p-2 w-full mb-4"
          placeholder="Masukkan kode verifikasi (6 digit)"
          aria-describedby={error ? "error-message" : undefined}
        />
        {error && (
          <div id="error-message" className="text-red-500 text-sm mb-2">
            {error}
          </div>
        )}
        <button
          type="submit"
          className="bg-blue-500 text-white p-2 rounded w-full"
          disabled={isLoading}
        >
          {isLoading ? "Memverifikasi..." : "Verifikasi"}
        </button>
        {isVerified && (
          <p className="text-green-500 mt-4">Kode berhasil diverifikasi!</p>
        )}
        <p className="text-sm mt-2 text-center">
          Belum menerima kode?{" "}
          <a
            href="#"
            onClick={(e) => {
              e.preventDefault();
              handleResend();
            }}
            className="text-blue-500 hover:text-blue-700 transition"
          >
            Kirim ulang
          </a>
        </p>
        {resendMessage && (
          <p className="text-green-500 text-sm mt-2 text-center">
            {resendMessage}
          </p>
        )}
      </form>
    </div>
  );
};

// Make sure to default export the component
export default VerifikasiPage;
