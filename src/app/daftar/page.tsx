"use client";
import { useState, ChangeEvent, FormEvent, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Footer from "@/components/footer";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";


// Type for form state
interface FormState {
  emailOrPhone: string;
  password: string;
}

export default function Daftar() {
  const [formData, setFormData] = useState<FormState>({
    emailOrPhone: "",
    password: "",
  });


  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
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
  const validateEmailOrPhone = (emailOrPhone: string): string | null => {
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    const phoneRegex = /^[0-9]{10,15}$/;
    if (!emailOrPhone) {
      return "Email or Phone number is required.";
    }
    if (!emailRegex.test(emailOrPhone) && !phoneRegex.test(emailOrPhone)) {
      return "Please enter a valid email or phone number.";
    }
    return null;
  };

  // Handle form submission
  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    const { emailOrPhone, password } = formData;
    let newErrors: { [key: string]: string } = {};

    // Validate form
    const emailOrPhoneError = validateEmailOrPhone(emailOrPhone);
    if (emailOrPhoneError) newErrors.emailOrPhone = emailOrPhoneError;
    if (!password) newErrors.password = "Password is required.";

    // Validate password strength
    const passwordError = validatePassword(password);
    if (passwordError) {
      newErrors.password = passwordError;
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setIsSubmitting(true);

    try {
      // Simulate backend request (Replace this with actual API call)
      await new Promise((resolve) => setTimeout(resolve, 2000));
     
      alert("Form submitted successfully!");
      window.location.href = "/api/auth/verifikasi";
    } catch (error) {
      console.error("Form submission error:", error);
      alert("There was an error. Please try again.");
    } finally {
      setIsSubmitting(false);
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
        <form onSubmit={handleSubmit} className="w-96 bg-white p-8 rounded-lg shadow-lg">
          <h2 className="text-center text-2xl font-bold mb-6">Formulir Pendaftaran</h2>

          {/* Input Email or Phone */}
          <div className="mb-4">
            <Label htmlFor="emailOrPhone">Email atau Nomor Telepon</Label>
            <Input
              id="emailOrPhone"
              type="text"
              placeholder="Email atau Nomor Telepon"
              value={formData.emailOrPhone}
              onChange={handleInputChange}
              required
            />
            {errors.emailOrPhone && <p className="text-red-500 text-sm mt-1">{errors.emailOrPhone}</p>}
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

          <Button
            type="submit"
            className="w-full"
          >
            {isSubmitting ? "Submitting..." : "Daftar"}
          </Button>
        </form>
      </div>
      <Footer />
    </>
  );
}
