
import React, { useState, useEffect, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import lottie from "lottie-web";
import { useAuth } from "../contexts/AuthContext";

interface RegisterErrors {
  name?: string;
  email?: string;
  password?: string;
  confirmPassword?: string;
}

const RegisterPage = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errors, setErrors] = useState<RegisterErrors>({});
  const navigate = useNavigate();
  const animationContainer = useRef<HTMLDivElement>(null);
  const { isAuthenticated } = useAuth();

  // Redirect if already logged in
  useEffect(() => {
    if (isAuthenticated) {
      navigate('/');
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

  // Input styling with error states
  const inputClass = (fieldError?: string) =>
    `w-full p-2 border rounded-lg focus:outline-none text-[#363636] 
     placeholder:normal-case placeholder:text-sm normal-case
     ${
       fieldError
         ? "border-red-500 focus:ring-2 focus:ring-red-500"
         : "border-gray-300 focus:ring-2 focus:ring-[#5C5470]"
     }`;

  const handleRegister = (e: React.FormEvent) => {
    e.preventDefault();
    const newErrors: RegisterErrors = {};

    // Form validation
    if (!name.trim()) newErrors.name = "Name is required.";
    if (!email.trim()) newErrors.email = "Email is required.";
    if (!password.trim()) newErrors.password = "Password is required.";
    if (password !== confirmPassword) {
      newErrors.confirmPassword = "Passwords do not match.";
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    // Store user in localStorage
    const newUser = { name, email, password };
    const existingUsers = localStorage.getItem("registeredUsers");
    const users = existingUsers ? JSON.parse(existingUsers) : [];
    
    // Check if email already exists
    const emailExists = users.some((user: { email: string }) => user.email === email);
    if (emailExists) {
      setErrors({ email: "Email already registered. Please login instead." });
      return;
    }
    
    users.push(newUser);
    localStorage.setItem("registeredUsers", JSON.stringify(users));
    
    // Redirect to login page
    navigate("/login");
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
              <p className="text-gray-600 mt-2 text-sm md:text-base">Create your account and get started.</p>
            </div>

            {/* Mobile animation container */}
            <div className="md:hidden w-full h-48 mb-4">
              <div ref={animationContainer} className="w-full h-full" />
            </div>

            <form onSubmit={handleRegister}>
              <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-1">
                  Full Name
                </label>
                <input
                  type="text"
                  placeholder="Enter your full name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className={inputClass(errors.name)}
                  required
                />
                {errors.name && (
                  <p className="text-red-500 text-xs mt-1">{errors.name}</p>
                )}
              </div>

              <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-1">
                  Email address
                </label>
                <input
                  type="email"
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className={inputClass(errors.email)}
                  required
                />
                {errors.email && (
                  <p className="text-red-500 text-xs mt-1">{errors.email}</p>
                )}
              </div>

              <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-1">
                  Password
                </label>
                <input
                  type="password"
                  placeholder="Create a password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className={inputClass(errors.password)}
                  required
                />
                {errors.password && (
                  <p className="text-red-500 text-xs mt-1">{errors.password}</p>
                )}
              </div>

              <div className="mb-6">
                <label className="block text-gray-700 text-sm font-bold mb-1">
                  Confirm Password
                </label>
                <input
                  type="password"
                  placeholder="Confirm your password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  className={inputClass(errors.confirmPassword)}
                  required
                />
                {errors.confirmPassword && (
                  <p className="text-red-500 text-xs mt-1">{errors.confirmPassword}</p>
                )}
              </div>

              <button
                type="submit"
                className="w-full bg-[#5C5470] text-white py-2 rounded-lg hover:bg-[#352F44] transition duration-300"
              >
                REGISTER
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
