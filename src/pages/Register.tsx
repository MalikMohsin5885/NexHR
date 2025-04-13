
import React, { useEffect, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import lottie from "lottie-web";
import { FaGoogle, FaFacebook, FaTwitter, FaLinkedin, FaWindows, FaApple } from "react-icons/fa";
import { useAuth } from "../contexts/AuthContext";
import { RegisterForm } from "@/components/auth/RegisterForm";

const RegisterPage = () => {
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
      
      console.log("Register animation loaded with path:", animationPath);
      
      return () => anim.destroy();
    }
  }, []);

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#2A2438] px-4 py-8">
      <div className="relative w-full max-w-5xl p-[3px] bg-gradient-to-r from-[#5C5470] to-[#DBD8E3] rounded-[5rem] shadow-2xl">
        <div className="flex flex-col md:flex-row bg-[#F2F1F7] rounded-[5rem] overflow-hidden">
          {/* Left Side: Lottie Animation - visible on desktop */}
          <div className="hidden md:flex md:w-1/2 items-center justify-center p-8">
            <div 
              ref={animationContainer} 
              className="w-full h-full min-h-[400px]" 
              style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}
            />
          </div>
          
          {/* Neon vertical gradient divider - only visible on desktop */}
          <div className="hidden md:block w-[2px] bg-gradient-to-b from-[#352F44] to-[#5C5470] shadow-[0_0_10px_3px_rgba(80,0,80,0.8)]" />
          
          {/* Right Side: Register Form */}
          <div className="w-full md:w-1/2 p-8">
            <div className="text-center mb-6">
              <h1 className="text-4xl font-extrabold text-[#352F44] uppercase">Sign Up</h1>
              <p className="text-gray-600 mt-2 uppercase">
                Experience NexHR—Get started today!
              </p>
            </div>

            {/* Mobile animation container */}
            <div className="md:hidden w-full h-48 mb-4">
              <div ref={animationContainer} className="w-full h-full" />
            </div>

            <RegisterForm onSuccess={() => navigate('/login')} />

            {/* Social Login Buttons */}
            <div className="mt-6">
              <p className="text-center text-gray-600 mb-4 uppercase">Or sign up with:</p>
              <div className="flex justify-center gap-2">
                <button className="p-2 rounded-full bg-[#0077B5] text-white">
                  <FaWindows className="w-5 h-5" />
                </button>
                <button className="p-2 rounded-full bg-[#0077B5] text-white">
                  <FaLinkedin className="w-5 h-5" />
                </button>
                <button className="p-2 rounded-full bg-[#DB4437] text-white">
                  <FaGoogle className="w-5 h-5" />
                </button>
                <button className="p-2 rounded-full bg-[#1877F2] text-white">
                  <FaFacebook className="w-5 h-5" />
                </button>
                <button className="p-2 rounded-full bg-[#1DA1F2] text-white">
                  <FaTwitter className="w-5 h-5" />
                </button>
                <button className="p-2 rounded-full bg-black text-white">
                  <FaApple className="w-5 h-5" />
                </button>
              </div>
            </div>

            <p className="text-center mt-6 text-gray-600 uppercase">
              Already have an account?{" "}
              <Link
                to="/login"
                className="text-[#5C5470] hover:text-[#352F44] hover:underline uppercase"
              >
                Sign In
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RegisterPage;
