"use client";

import "@/app/globals.css";
import { SetStateAction, useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import Footer from "@/components/footer";
import Link from "next/link";
import ButtonGoogle from "@/components/ButtonGoogle";

export default function Masuk() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

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

  const handleSubmit = (e: { preventDefault: () => void }) => {
    e.preventDefault();

    // Validasi panjang email
    if (email.length < 3) {
      alert("Email harus memiliki minimal 3 karakter.");
      return;
    }

    // Perlindungan dasar SQL Injection
    const sqlInjectionRegex =
      /(\b(SELECT|INSERT|DELETE|UPDATE|DROP|ALTER|CREATE|TRUNCATE|EXEC)\b)/gi;
    if (sqlInjectionRegex.test(email) || sqlInjectionRegex.test(password)) {
      alert("Input tidak valid.");
      return;
    }

    console.log("Form submitted with:", { email, password });
    // Implementasi login manual bisa dilakukan di sini jika diperlukan
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <>
      <div className="flex items-center justify-center min-h-screen bg-gray-50 bg-gradient-to-r from-green-500">
        <Card className="w-[480px] shadow-lg rounded-lg">
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
                <Link href="/daftar">
                  <Button>Daftar</Button>
                </Link>
              </CardFooter>
            </form>
            {/* Tombol Masuk dengan Google */}
            <ButtonGoogle />
          </CardContent>

          <CardFooter className="flex flex-col space-y-1 mt-2"></CardFooter>
        </Card>
      </div>
      <Footer />
    </>
  );
}
