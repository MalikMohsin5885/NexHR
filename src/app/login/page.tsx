"use client";

import { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import lottie from "lottie-web";
import { FaMicrosoft, FaLinkedin, FaGoogle, FaFacebook, FaTwitter, FaApple } from "react-icons/fa"; // Import icons

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();
  const animationContainer = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (animationContainer.current) {
      const anim = lottie.loadAnimation({
        container: animationContainer.current,
        renderer: "svg",
        loop: true,
        autoplay: true,
        path: "/lottieFiles/login.json", // Path to your Lottie JSON file
      });

      return () => anim.destroy(); // Cleanup animation on unmount
    }
  }, []);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Logging in with", email, password);
    // TODO: Add authentication logic here
    router.push("/dashboard"); // Redirect to dashboard after login
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-blue-50 to-purple-50">
      <div className="flex bg-white rounded-2xl shadow-2xl overflow-hidden max-w-4xl w-full">
        {/* Left Side: Lottie Animation */}
        <div className="w-1/2 p-8 flex items-center justify-center bg-gradient-to-r from-blue-500 to-purple-500 rounded-l-2xl">
          <div ref={animationContainer} className="w-full h-64" />
        </div>

        {/* Right Side: Login Form */}
        <div className="w-1/2 p-8">
          <div className="text-center mb-8">
            <h1 className="text-4xl font-extrabold text-gray-900">Login</h1>
            <p className="text-gray-600 mt-2">
              Enter your details and lets get started.
            </p>
          </div>
          <form onSubmit={handleLogin}>
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2">
                E-MAIL ADDRESS
              </label>
              <input
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-[#363636]"
                required
              />
            </div>
            <div className="mb-6">
              <label className="block text-gray-700 text-sm font-bold mb-2">
                PASSWORD
              </label>
              <input
                type="password"
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-[#363636]"
                required
              />
            </div>
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center">
                <input
                  type="checkbox"
                  id="rememberMe"
                  className="mr-2"
                />
                <label htmlFor="rememberMe" className="text-sm text-gray-700">
                  Remember Me
                </label>
              </div>
              <a href="/forgot-password" className="text-sm text-blue-500 hover:underline">
                Forgot your password?
              </a>
            </div>
            <button
              type="submit"
              className="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 transition duration-300"
            >
              LOGIN
            </button>
          </form>

          {/* Social Login Buttons */}
          <div className="mt-6">
            <p className="text-center text-gray-600 mb-4">Or log in with:</p>
            <div className="flex justify-center space-x-4">
              {/* Microsoft Button */}
              <button
                type="button"
                className="flex items-center justify-center w-10 h-10 bg-gray-800 text-white rounded-full hover:bg-gray-900 transition duration-300"
              >
                <FaMicrosoft className="w-6 h-6" />
              </button>

              {/* LinkedIn Button */}
              <button
                type="button"
                className="flex items-center justify-center w-10 h-10 bg-blue-600 text-white rounded-full hover:bg-blue-700 transition duration-300"
              >
                <FaLinkedin className="w-6 h-6" />
              </button>

              {/* Google Button */}
              <button
                type="button"
                className="flex items-center justify-center w-10 h-10 bg-red-600 text-white rounded-full hover:bg-red-700 transition duration-300"
              >
                <FaGoogle className="w-6 h-6" />
              </button>

              {/* Facebook Button */}
              <button
                type="button"
                className="flex items-center justify-center w-10 h-10 bg-blue-800 text-white rounded-full hover:bg-blue-900 transition duration-300"
              >
                <FaFacebook className="w-6 h-6" />
              </button>

              {/* Twitter Button */}
              <button
                type="button"
                className="flex items-center justify-center w-10 h-10 bg-blue-400 text-white rounded-full hover:bg-blue-500 transition duration-300"
              >
                <FaTwitter className="w-6 h-6" />
              </button>

              {/* Apple Button */}
              <button
                type="button"
                className="flex items-center justify-center w-10 h-10 bg-black text-white rounded-full hover:bg-gray-900 transition duration-300"
              >
                <FaApple className="w-6 h-6" />
              </button>
            </div>
          </div>

          <p className="text-center mt-6 text-gray-600">
            Don’t have an account?{" "}
            <a href="/register" className="text-blue-500 hover:underline">
              Sign Up
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}