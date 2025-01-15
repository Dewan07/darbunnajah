"use client";

import "../../app/globals.css";
import { SetStateAction, useState } from "react";
import { Button } from "../../components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../../components/ui/card";
import { Input } from "../../components/ui/input";
import { Label } from "../../components/ui/label";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import Footer from "../../components/footer";
import Link from "next/link";
import ButtonGoogle from "../../components/ButtonGoogle";
import { useRouter } from "next/navigation";
import { signIn } from "next-auth/react";
import React from "react";

export default function Masuk() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const router = useRouter();

  const handleEmailChange = (e: {
    target: { value: SetStateAction<string> };
  }) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e: {
    target: { value: SetStateAction<string> };
  }) => {
    setPassword(e.target.value);
  };

  const handleSubmit = async (e: { preventDefault: () => void }) => {
    e.preventDefault();
    //validasi email yang ada di database

    // Validasi panjang email
    if (email.length < 3) {
      alert("Email harus memiliki minimal 3 karakter.");
      return;
    }

    // Validasi panjang password
    try {
      const result = await signIn("credentials", {
        redirect: false, // Jangan redirect otomatis
        email,
        password,
      });

      if (result?.error) {
        alert(result.error);
      } else {
        router.push("/dashboardUser");
      }

      // const data = await response.json();

      // if(response.ok){

      //   router.push("/dashboardUser");
      // }else{
      //   alert(data.message || "Email atau password salah.");
      // }

      // Perlindungan dasar SQL Injection
      const sqlInjectionRegex =
        /(\b(SELECT|INSERT|DELETE|UPDATE|DROP|ALTER|CREATE|TRUNCATE|EXEC)\b)/gi;
      if (sqlInjectionRegex.test(email) || sqlInjectionRegex.test(password)) {
        alert("Input tidak valid.");
        return;
      }
    } catch (error) {
      console.error("Terjadi kesalahan:", error);
      alert("Terjadi kesalahan. Coba lagi nanti.");
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <>
      <div className="flex items-center justify-center min-h-screen bg-gray-50 bg-gradient-to-r from-green-500 flex-col">
        <Card className="w-full max-w-md shadow-lg rounded-lg p-4 md:p-6 lg:p-8">
          <CardHeader>
            <CardTitle className="text-2xl font-semibold text-center">
              Selamat Datang Kembali
            </CardTitle>
            <CardDescription className="text-center">
              Masukkan email dan password Anda untuk masuk.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit}>
              <div className="grid w-full items-center gap-4">
                {/* Input Email */}
                <div className="flex flex-col space-y-1.5">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="Masukkan email Anda"
                    value={email}
                    onChange={handleEmailChange}
                  />
                </div>

                {/* Input Password */}
                <div className="flex flex-col space-y-1.5">
                  <Label htmlFor="password">Password</Label>
                  <div className="relative flex items-center">
                    <Input
                      id="password"
                      type={showPassword ? "text" : "password"}
                      placeholder="Masukkan password Anda"
                      value={password}
                      onChange={handlePasswordChange}
                      className="pr-10"
                    />
                    <button
                      type="button"
                      className="absolute right-3 text-gray-600 hover:text-gray-800"
                      onClick={togglePasswordVisibility}
                    >
                      <FontAwesomeIcon
                        icon={showPassword ? faEyeSlash : faEye}
                        size="sm"
                      />
                    </button>
                  </div>
                </div>

                {/* Lupa Password */}
                <div className="text-right">
                  <a
                    href="/forgot-password"
                    className="text-sm text-blue-600 hover:underline"
                  >
                    Lupa Password?
                  </a>
                </div>
              </div>

              <CardFooter className="flex flex-col space-y-2 mt-4">
                <Button type="submit" className="w-full">
                  Masuk
                </Button>
              </CardFooter>
            </form>
            {/* Tombol Masuk dengan Google */}

            <ButtonGoogle />
            <p className="text-center mt-5 border-t-4 border-green-400">
              {" "}
              atau daftar di bawah ini 👇
            </p>
            <Link href="/daftar">
              <Button className="w-full mt-2">DAFTAR</Button>
            </Link>
          </CardContent>

          <CardFooter className="flex flex-col space-y-1 mt-2"></CardFooter>
        </Card>
      </div>
      <Footer />
    </>
  );
}
