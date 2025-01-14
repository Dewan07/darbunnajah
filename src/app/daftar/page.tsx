"use client";
import { useState, ChangeEvent, FormEvent, useEffect } from "react";
import { Button } from "../../components/ui/button";
import { Input } from "../../components/ui/input";
import { Label } from "../../components/ui/label";
import Footer from "../../components/footer";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import { useRouter } from "next/navigation";


// Type for form state
interface FormState {
  email: string;
  password: string;
}



export default function Daftar() {
  const router = useRouter();


  const [formData, setFormData] = useState<FormState>({
    email: "",
    password: "",
  });

  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [message, setMessage] = useState<string | null>(null);
// Handle input change
const handleInputChange = (e: ChangeEvent<HTMLInputElement>): void => {
  const { id, value } = e.target;

  setFormData((prevData) => ({
    ...prevData,
    [id]: value,
  }));

  // Reset error for the specific input if error exists
  setErrors((prevErrors) => ({
    ...prevErrors,
    
    [id]: '', // Reset the error message for the field
    general :'',
  }));
};


  // Simplified password validation (with more checks)
  const validatePassword = (password: string): string | null => {
    const regex = /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{6,}$/;
    if (!regex.test(password)) {
      return "Password must be at least 6 characters, contain an uppercase letter, a number, and a special character.";
    }
    return null;
  };

  // Email/Phone validation
  const validateemail = (email: string): string | null => {
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    const phoneRegex = /^[0-9]{10,15}$/;
    if (!email) {
      return "masukan email anda.";
    }
    if (!emailRegex.test(email) && !phoneRegex.test(email)) {
      return "masukan alamat email yang valid.";
    }
    return null;
  };

  // Handle form submission
  const handleSubmit = async (e: FormEvent) => {    
    e.preventDefault();
    const { email, password } = formData;
    let newErrors: { [key: string]: string } = {};
    
    // Validasi form
    const emailError = validateemail(email);
    if (emailError) newErrors.email = emailError;
  
    if (!password) newErrors.password = "Memerlukan password";
  
    // Validasi kekuatan password
    const passwordError = validatePassword(password);
    if (passwordError) {
      newErrors.password = passwordError;
    }
  
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }
  
    try {
      // Pastikan hanya mengirim email dan password
      const response = await fetch("http://localhost:3000/api/daftar", {
        method: "POST",
        body: JSON.stringify({
          email: formData.email,
          password: formData.password,
        }),
        headers: {
          "Content-Type": "application/json",
        },
      });
      // Tangani hasil response
      const data = await response.json();

      if (response.ok) {
        // Jika berhasil
        // Lakukan navigasi atau update UI sesuai kebutuhan
        router.push("/verifikasi");
      } else {
        // Jika ada error pada API
        // console.error("Error creating user:", data.error);
        setErrors({ general: data.error || "Something went wrong!" });
      }
    } catch (error: any) {
      // console.error("An error occurred:", error);
      setErrors({ general: "Something went wrong. Please try again." });
    } finally {
      setIsSubmitting(false);
      setMessage("Pendaftaran berhasil, silahkan cek email anda untuk verifikasi.");
    }
  };
  


  // Clear password error when user starts typing
  useEffect(() => {
    if (formData.password) {
      const passwordError = validatePassword(formData.password);
      if (!passwordError && errors.password) {
        setErrors((prevErrors) => {
          const { password, ...rest } = prevErrors; // Remove password error
          return rest;
        });
      }
    }
  }, [formData.password, errors.password]);

  // Toggle password visibility
  const togglePasswordVisibility = (): void => {
    setShowPassword((prevState) => !prevState);
  };


  return (
    <>
      <div className="flex items-center justify-center min-h-screen bg-gradient-to-r from-green-500">
        <form className="w-96 bg-white p-8 rounded-lg shadow-lg" onSubmit={handleSubmit}>
          <h2 className="text-center text-2xl font-bold mb-6">Formulir Pendaftaran</h2>

          {/* Input Email or Phone */}
          <div className="mb-4">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="text"
              placeholder="Email"
              value={formData.email}
              onChange={handleInputChange}
              required
            />
            {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
          
          </div>

          {/* Input Password */}
          <div className="mb-4 relative">
            <Label htmlFor="password">Password</Label>
            <Input
              id="password"
              type={showPassword ? "text" : "password"}
              placeholder="Password Anda"
              value={formData.password}
              onChange={handleInputChange}
              required
            />
            <button
              type="button"
              className="absolute right-2 top-9 text-gray-500"
              onClick={togglePasswordVisibility}
            >
              <FontAwesomeIcon icon={showPassword ? faEyeSlash : faEye} />
            </button>
            {errors.password && <p className="text-red-500 text-sm mt-1">{errors.password}</p>}
          </div>
             {/* Error Message */}
             {errors.general && (
            <div className="text-red-500 text-sm mb-4">
              {errors.general}
            </div>
          )}
            
          {/* Submit Button */}   
          <Button
            type="submit"
            className="w-full transition-transform duration-300 ease-in-out hover:scale-105"
          >
            {isSubmitting ? 'Memverifikasi...' : 'Daftar' }
          </Button>
        </form>
      </div>
      <Footer />
    </>
  );
}
