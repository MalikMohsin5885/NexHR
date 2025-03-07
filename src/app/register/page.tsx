"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function RegisterPage() {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [agree, setAgree] = useState(false);
  const router = useRouter();

  const handleRegister = (e: React.FormEvent) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      alert("Passwords do not match!");
      return;
    }
    if (!agree) {
      alert("You must agree to the Privacy Statement and Disclaimer.");
      return;
    }
    console.log("Registering with", firstName, lastName, email, password);
    // TODO: Add registration logic here
    router.push("/dashboard"); // Redirect after registration
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-blue-50 to-purple-50">
      <div className="flex bg-white rounded-lg shadow-lg overflow-hidden max-w-4xl w-full">
        {/* Left Side: Video */}
        <div className="w-1/2 p-8 flex items-center justify-center bg-blue-500">
          <video
            autoPlay
            loop
            muted
            className="w-full h-auto rounded-lg"
          >
            <source src="/lottieFiles/register_animation.mp4" type="video/mp4" />
            Your browser does not support the video tag.
          </video>
        </div>

        {/* Right Side: Registration Form */}
        <div className="w-1/2 p-8">
          <div className="text-center mb-8">
            <h1 className="text-4xl font-extrabold text-gray-900">Sign Up</h1>
            <p className="text-gray-600 mt-2">
              Enter your details and let's get started.
            </p>
          </div>
          <form onSubmit={handleRegister}>
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2">
                First Name
              </label>
              <input
                type="text"
                placeholder="Enter your first name"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2">
                Last Name
              </label>
              <input
                type="text"
                placeholder="Enter your last name"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2">
                Email Address
              </label>
              <input
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2">
                Password
              </label>
              <input
                type="password"
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>
            <div className="mb-6">
              <label className="block text-gray-700 text-sm font-bold mb-2">
                Confirm Password
              </label>
              <input
                type="password"
                placeholder="Confirm your password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>
            <div className="mb-6 flex items-center">
              <input
                type="checkbox"
                id="agree"
                checked={agree}
                onChange={(e) => setAgree(e.target.checked)}
                className="mr-2"
              />
              <label htmlFor="agree" className="text-sm text-gray-700">
                I agree with Privacy Statement and Disclaimer
              </label>
            </div>
            <button
              type="submit"
              className="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 transition duration-300"
            >
              REGISTER
            </button>
          </form>

          {/* Social Login Buttons */}
          <div className="mt-6">
            <p className="text-center text-gray-600 mb-4">Or sign up with:</p>
            <div className="flex justify-center space-x-4">
              <button
                type="button"
                className="flex items-center justify-center w-10 h-10 bg-blue-600 text-white rounded-full hover:bg-blue-700 transition duration-300"
              >
                <i className="fab fa-facebook-f"></i>
              </button>
              <button
                type="button"
                className="flex items-center justify-center w-10 h-10 bg-red-600 text-white rounded-full hover:bg-red-700 transition duration-300"
              >
                <i className="fab fa-google"></i>
              </button>
              <button
                type="button"
                className="flex items-center justify-center w-10 h-10 bg-blue-400 text-white rounded-full hover:bg-blue-500 transition duration-300"
              >
                <i className="fab fa-twitter"></i>
              </button>
            </div>
          </div>

          <p className="text-center mt-6 text-gray-600">
            Already have an account?{" "}
            <a href="/login" className="text-blue-500 hover:underline">
              Sign In
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}