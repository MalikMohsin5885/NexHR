"use client";
import { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import lottie from "lottie-web";
import { FaGoogle } from "react-icons/fa"; // Only Google needed now

interface LoginErrors {
  email?: string;
  password?: string;
  credentials?: string;
}

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState<LoginErrors>({});
  const router = useRouter();
  const animationContainer = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (animationContainer.current) {
      const anim = lottie.loadAnimation({
        container: animationContainer.current,
        renderer: "svg",
        loop: true,
        autoplay: true,
        path: "/lottieFiles/login.json",
      });
      return () => anim.destroy();
    }
  }, []);

  // Normal-case to avoid forced uppercase
  const inputClass = (fieldError?: string) =>
    `w-full p-2 border rounded-lg focus:outline-none text-[#363636] 
     placeholder:normal-case placeholder:text-sm normal-case
     ${
       fieldError
         ? "border-red-500 focus:ring-2 focus:ring-red-500"
         : "border-gray-300 focus:ring-2 focus:ring-[#5C5470]"
     }`;

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    const newErrors: LoginErrors = {};

    if (!email.trim()) {
      newErrors.email = "Email is required.";
    }
    if (!password.trim()) {
      newErrors.password = "Password is required.";
    }
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }
    setErrors({});

    const storedUsers = localStorage.getItem("registeredUsers");
    if (storedUsers) {
      const users = JSON.parse(storedUsers);
      const userExists = users.some(
        (user: { email: string; password: string }) =>
          user.email === email && user.password === password
      );
      if (userExists) {
        router.push("/dashboard");
      } else {
        setErrors({
          credentials:
            "User not found or incorrect credentials. Please register or try again.",
        });
      }
    } else {
      setErrors({
        credentials: "No registered users found. Please register first.",
      });
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#2A2438] px-4 font-nura">
      <div className="relative max-w-5xl w-full p-[3px] bg-gradient-to-r from-[#5C5470] to-[#DBD8E3] rounded-[5rem] shadow-2xl">
        <div className="flex bg-[#F2F1F7] rounded-[5rem] overflow-hidden">
          {/* Left Side: Lottie Animation */}
          <div className="w-1/2 p-8 flex items-center justify-center bg-transparent">
            <div ref={animationContainer} className="w-full h-64" />
          </div>

          {/* Neon vertical gradient divider */}
          <div className="w-[2px] bg-gradient-to-b from-[#352F44] to-[#5C5470] shadow-[0_0_10px_3px_rgba(80,0,80,0.8)]" />

          {/* Right Side: Login Form */}
          <div className="w-1/2 p-8">
            <div className="text-center mb-8">
              <h1 className="text-4xl font-extrabold text-[#352F44]">Login</h1>
              <p className="text-gray-600 mt-2">Enter your details and let’s get started.</p>
            </div>

            <form onSubmit={handleLogin}>
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

              <div className="mb-6">
                <label className="block text-gray-700 text-sm font-bold mb-1">
                  Password
                </label>
                <input
                  type="password"
                  placeholder="Enter your password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className={inputClass(errors.password)}
                  required
                />
                {errors.password && (
                  <p className="text-red-500 text-xs mt-1">{errors.password}</p>
                )}
              </div>

              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center">
                  <input type="checkbox" id="rememberMe" className="mr-2" />
                  <label htmlFor="rememberMe" className="text-sm text-gray-700">
                    Remember Me
                  </label>
                </div>
                <a
                  href="/forgot-password"
                  className="text-sm text-[#5C5470] hover:text-[#352F44] hover:underline"
                >
                  Forgot your password?
                </a>
              </div>

              {errors.credentials && (
                <p className="text-red-500 text-xs mb-4">{errors.credentials}</p>
              )}

              <button
                type="submit"
                className="w-full bg-[#5C5470] text-white py-2 rounded-lg hover:bg-[#352F44] transition duration-300"
              >
                LOGIN
              </button>
            </form>

            {/* Single Google Auth Button */}
            <div className="mt-6">
              {/* Optional lines around "Or log in with Google" */}
              {/* 
              <div className="flex items-center my-4">
                <hr className="flex-grow border-gray-300" />
                <span className="mx-2 text-gray-600">Or log in with:</span>
                <hr className="flex-grow border-gray-300" />
              </div>
              */}
              <p className="text-center text-gray-600 mb-4">Or log in with:</p>
              <div className="flex justify-center">
                <button
                  type="button"
                  className="
                    flex items-center justify-center 
                    w-10 h-10 
                    bg-red-600 
                    text-white 
                    rounded-full 
                    transition 
                    duration-300 
                    hover:scale-105
                    hover:shadow-lg 
                    hover:shadow-[#5C5470]/50
                  "
                >
                  <FaGoogle className="w-6 h-6" />
                </button>
              </div>
            </div>

            <p className="text-center mt-6 text-gray-600">
              Don’t have an account?{" "}
              <a
                href="/register"
                className="text-[#5C5470] hover:text-[#352F44] hover:underline"
              >
                Sign Up
              </a>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
