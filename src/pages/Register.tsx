
import React, { useState, useEffect, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import lottie from "lottie-web";
import { useAuth } from "../contexts/AuthContext";
import { toast } from "@/components/ui/use-toast";

interface RegisterErrors {
  firstName?: string;
  lastName?: string;
  email?: string;
  phoneNo?: string;
  password?: string;
  confirmPassword?: string;
  privacy?: string;
}

const RegisterPage = () => {
  // Store all form fields in one object
  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phoneNo: "",
    password: "",
    confirmPassword: "",
    agree: false,
  });

  const [errors, setErrors] = useState<RegisterErrors>({});
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const animationContainer = useRef<HTMLDivElement>(null);
  const { isAuthenticated } = useAuth();

  // Redirect if already logged in
  useEffect(() => {
    if (isAuthenticated) {
      navigate('/dashboard');
    }
  }, [isAuthenticated, navigate]);

  useEffect(() => {
    if (animationContainer.current) {
      const animationPath = "/lottieFiles/register.json";
      
      const anim = lottie.loadAnimation({
        container: animationContainer.current,
        renderer: "svg",
        loop: true,
        autoplay: true,
        path: animationPath,
      });
      return () => anim.destroy();
    }
  }, []);

  // Helper function to update form state dynamically
  const updateField = (field: string, value: string | boolean) => {
    setForm((prev) => ({ ...prev, [field]: value }));
  };

  // Input styling with error states
  const inputClass = (fieldError?: string) =>
    `w-full p-2 border rounded-lg focus:outline-none text-[#363636] 
     placeholder:normal-case placeholder:text-sm normal-case
     ${
       fieldError
         ? "border-red-500 focus:ring-2 focus:ring-red-500"
         : "border-gray-300 focus:ring-2 focus:ring-[#5C5470]"
     }`;

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    const newErrors: RegisterErrors = {};

    // Form validation
    if (!form.firstName.trim()) newErrors.firstName = "First name is required.";
    if (!form.lastName.trim()) newErrors.lastName = "Last name is required.";
    if (!form.email.trim()) {
      newErrors.email = "Email is required.";
    } else {
      const emailRegex = /^(?!\.)(?!.*\.\.)[A-Za-z0-9!#$%&'*+/=?^_`{|}~.]+(?<!\.)@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/;
      if (!emailRegex.test(form.email)) {
        newErrors.email = "Please enter a valid email address.";
      }
    }
    if (!form.phoneNo?.trim()) newErrors.phoneNo = "Phone number is required.";
    if (!form.password.trim()) {
      newErrors.password = "Password is required.";
    } else {
      if (form.password.length < 8 || !/\d/.test(form.password)) {
        newErrors.password = "Must be at least 8 characters and include at least one number.";
      }
    }
    if (form.password !== form.confirmPassword) {
      newErrors.confirmPassword = "Passwords do not match.";
    }
    if (!form.agree) {
      newErrors.privacy = "You must agree to the Privacy Statement and Disclaimer.";
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setIsLoading(true);

    try {
      const response = await fetch('http://127.0.0.1:8000/api/auth/register/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          first_name: form.firstName,
          last_name: form.lastName,
          email: form.email,
          phone_number: form.phoneNo,
          password: form.password,
        }),
      });

      const data = await response.json();
      
      if (response.ok) {
        toast({
          title: "Registration successful",
          description: "Your account has been created. Please log in.",
          variant: "default",
        });
        
        // Redirect to login page
        navigate("/login");
      } else {
        // Handle API errors
        if (data.email) {
          setErrors({ email: data.email[0] });
        } else if (data.detail) {
          setErrors({ email: data.detail });
        } else {
          setErrors({ 
            email: "Registration failed. Please try again or contact support." 
          });
        }
        
        toast({
          title: "Registration failed",
          description: "Please check your information and try again.",
          variant: "destructive",
        });
      }
    } catch (error) {
      console.error('Registration error:', error);
      toast({
        title: "Connection error",
        description: "Could not connect to the server. Please try again later.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#2A2438] px-4">
      <div className="relative max-w-5xl w-full p-[3px] bg-gradient-to-r from-[#5C5470] to-[#DBD8E3] rounded-[5rem] shadow-2xl">
        <div className="flex flex-col md:flex-row bg-[#F2F1F7] rounded-[5rem] overflow-hidden">
          {/* Left Side: Lottie Animation (hidden on mobile) */}
          <div className="hidden md:block w-full md:w-1/2 p-8 flex items-center justify-center bg-transparent">
            <div ref={animationContainer} className="w-full h-64" />
          </div>

          {/* Neon vertical gradient divider (hidden on mobile) */}
          <div className="hidden md:block w-[2px] bg-gradient-to-b from-[#352F44] to-[#5C5470] shadow-[0_0_10px_3px_rgba(80,0,80,0.8)]" />

          {/* Right Side: Register Form */}
          <div className="w-full md:w-1/2 p-6 md:p-8">
            <div className="text-center mb-6 md:mb-8">
              <h1 className="text-3xl md:text-4xl font-extrabold text-[#352F44]">Register</h1>
              <p className="text-gray-600 mt-2 text-sm md:text-base">Experience NexHR—Get started today!</p>
            </div>

            {/* Mobile animation container */}
            <div className="md:hidden w-full h-48 mb-4">
              <div ref={animationContainer} className="w-full h-full" />
            </div>

            <form onSubmit={handleRegister}>
              {/* First Name & Last Name */}
              <div className="flex flex-col sm:flex-row gap-4 mb-4">
                <div className="sm:w-1/2 w-full">
                  <label className="block text-gray-700 text-sm font-bold mb-1">
                    First Name
                  </label>
                  <input
                    type="text"
                    placeholder="Enter first name"
                    value={form.firstName}
                    onChange={(e) => updateField("firstName", e.target.value)}
                    className={inputClass(errors.firstName)}
                    required
                  />
                  {errors.firstName && (
                    <p className="text-red-500 text-xs mt-1">{errors.firstName}</p>
                  )}
                </div>
                <div className="sm:w-1/2 w-full">
                  <label className="block text-gray-700 text-sm font-bold mb-1">
                    Last Name
                  </label>
                  <input
                    type="text"
                    placeholder="Enter last name"
                    value={form.lastName}
                    onChange={(e) => updateField("lastName", e.target.value)}
                    className={inputClass(errors.lastName)}
                    required
                  />
                  {errors.lastName && (
                    <p className="text-red-500 text-xs mt-1">{errors.lastName}</p>
                  )}
                </div>
              </div>

              {/* Email Address */}
              <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-1">
                  Email address
                </label>
                <input
                  type="email"
                  placeholder="Enter your email"
                  value={form.email}
                  onChange={(e) => updateField("email", e.target.value)}
                  className={inputClass(errors.email)}
                  required
                />
                {errors.email && (
                  <p className="text-red-500 text-xs mt-1">{errors.email}</p>
                )}
              </div>

              {/* Phone Number */}
              <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-1">
                  Phone Number
                </label>
                <input
                  type="text"
                  placeholder="Enter phone number"
                  value={form.phoneNo}
                  onChange={(e) => updateField("phoneNo", e.target.value)}
                  className={inputClass(errors.phoneNo)}
                  required
                />
                {errors.phoneNo && (
                  <p className="text-red-500 text-xs mt-1">{errors.phoneNo}</p>
                )}
              </div>

              {/* Password */}
              <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-1">
                  Password
                </label>
                <input
                  type="password"
                  placeholder="Create a password"
                  value={form.password}
                  onChange={(e) => updateField("password", e.target.value)}
                  className={inputClass(errors.password)}
                  required
                />
                {errors.password && (
                  <p className="text-red-500 text-xs mt-1">{errors.password}</p>
                )}
              </div>

              {/* Confirm Password */}
              <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-1">
                  Confirm Password
                </label>
                <input
                  type="password"
                  placeholder="Confirm your password"
                  value={form.confirmPassword}
                  onChange={(e) => updateField("confirmPassword", e.target.value)}
                  className={inputClass(errors.confirmPassword)}
                  required
                />
                {errors.confirmPassword && (
                  <p className="text-red-500 text-xs mt-1">{errors.confirmPassword}</p>
                )}
              </div>

              {/* Privacy Checkbox */}
              <div className="mb-6 flex items-center">
                <input
                  type="checkbox"
                  id="agree"
                  checked={form.agree as boolean}
                  onChange={(e) => updateField("agree", e.target.checked)}
                  className={`mr-2 ${errors.privacy ? "outline-red-500 ring-2 ring-red-500" : ""}`}
                />
                <label htmlFor="agree" className="text-sm text-gray-700">
                  I agree with Privacy Statement and Disclaimer
                </label>
              </div>
              {errors.privacy && (
                <p className="text-red-500 text-xs mb-4">{errors.privacy}</p>
              )}

              <button
                type="submit"
                disabled={isLoading}
                className="w-full bg-[#5C5470] text-white py-2 rounded-lg hover:bg-[#352F44] transition duration-300 flex items-center justify-center"
              >
                {isLoading ? (
                  <span className="inline-block w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></span>
                ) : null}
                {isLoading ? "REGISTERING..." : "REGISTER"}
              </button>
            </form>

            <p className="text-center mt-6 text-gray-600 text-sm">
              Already have an account?{" "}
              <Link
                to="/login"
                className="text-[#5C5470] hover:text-[#352F44] hover:underline"
              >
                Login
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RegisterPage;
