
import React, { useState, useEffect, useRef } from "react";
import { useNavigate, Link } from "react-router-dom";
import lottie from "lottie-web";
import { FaGoogle } from "react-icons/fa";
import { useAuth } from "../contexts/AuthContext";
import { toast } from "@/components/ui/use-toast";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Form, FormField, FormItem, FormLabel, FormControl } from "@/components/ui/form";

interface LoginErrors {
  email?: string;
  password?: string;
  credentials?: string;
}

const TEST_EMAIL = "admin@admin.com";
const TEST_PASSWORD = "admin";

const LoginPage = () => {
  const [form, setForm] = useState({
    email: "",
    password: "",
  });
  const [errors, setErrors] = useState<LoginErrors>({});
  const [isLoading, setIsLoading] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const navigate = useNavigate();
  const animationContainer = useRef<HTMLDivElement>(null);
  const { login, isAuthenticated } = useAuth();

  // Redirect if already logged in
  useEffect(() => {
    if (isAuthenticated) {
      navigate('/dashboard');
    }
  }, [isAuthenticated, navigate]);

  useEffect(() => {
    if (animationContainer.current) {
      const animationPath = "/lottieFiles/login.json";
      
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

  // Helper function to update individual form fields
  const updateField = (field: string, value: string) => {
    setForm((prev) => ({ ...prev, [field]: value }));
    
    // Clear error when field is updated
    if (errors[field as keyof LoginErrors]) {
      setErrors(prev => {
        const newErrors = { ...prev };
        delete newErrors[field as keyof LoginErrors];
        return newErrors;
      });
    }
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    const newErrors: LoginErrors = {};

    if (!form.email.trim()) {
      newErrors.email = "Email is required.";
    }
    if (!form.password.trim()) {
      newErrors.password = "Password is required.";
    }
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }
    setErrors({});

    // Set loading state during API call
    setIsLoading(true);

    try {
      // If using test credentials, use the provided tokens
      if (form.email === TEST_EMAIL && form.password === TEST_PASSWORD) {
        const testAccessToken = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNzQ0MzA1NjczLCJpYXQiOjE3NDQyMTkyNzMsImp0aSI6ImQ0ZjM4MmJkOTk0YTQzMzdiNmFhNjdjZWQwNzA3YmY2IiwidXNlcl9pZCI6NCwiZm5hbWUiOiJTYWlyYSIsImxuYW1lIjoiTmFzaXIiLCJlbWFpbCI6InNhaXJhbmFzaXIxMDAxNEBnbWFpbC5jb20ifQ.TEpncQ2Hyp7LEglCl1wNLe4JahRpWTkrcNkTbPZkeFs";
        const testRefreshToken = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoicmVmcmVzaCIsImV4cCI6MTc0NDgyNDA3MywiaWF0IjoxNzQ0MjE5MjczLCJqdGkiOiIwNWM3ZjU5Nzk1YmM0NTdkOTdkNTYyMzQ2Y2FmMGQzMiIsInVzZXJfaWQiOjQsImZuYW1lIjoiU2FpcmEiLCJsbmFtZSI6Ik5hc2lyIiwiZW1haWwiOiJzYWlyYW5hc2lyMTAwMTRAZ21haWwuY29tIn0.2ByayaMlNWwR7ZMh3-v_qcatZbPBXBAZZKcGZqjvxlU";
        
        const result = await login(form.email, form.password, testAccessToken, testRefreshToken);
        
        if (result.success) {
          toast({
            title: "Login successful",
            description: "Welcome back!",
            variant: "default",
          });
          
          navigate('/dashboard');
        } else {
          toast({
            title: "Login failed",
            description: result.message || "Invalid credentials. Please try again.",
            variant: "destructive",
          });
          
          setErrors({
            credentials: result.message || "Invalid credentials. Please try again.",
          });
        }
      } else {
        // Regular login with API
        const result = await login(form.email, form.password);
        
        if (result.success) {
          toast({
            title: "Login successful",
            description: "Welcome back!",
            variant: "default",
          });
          
          navigate('/dashboard');
        } else {
          toast({
            title: "Login failed",
            description: result.message || "Invalid credentials. Please try again.",
            variant: "destructive",
          });
          
          setErrors({
            credentials: result.message || "Invalid credentials. Please try again.",
          });
        }
      }
    } catch (error) {
      console.error('Login error:', error);
      toast({
        title: "Connection error",
        description: "Could not connect to the server. Please try again later.",
        variant: "destructive",
      });
      
      setErrors({
        credentials: "Network error. Please check your connection and try again.",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#2A2438] px-4 py-8">
      <div className="relative w-full max-w-5xl p-[2px] bg-gradient-to-r from-[#5C5470] to-[#DBD8E3] rounded-[3rem] shadow-2xl">
        <div className="flex flex-col md:flex-row bg-white rounded-[3rem] overflow-hidden min-h-[600px]">
          {/* Left side with illustration */}
          <div className="hidden md:flex md:w-1/2 bg-[#f8f8fc] items-center justify-center p-8">
            <div ref={animationContainer} className="w-full h-80" />
          </div>

          {/* Right side with login form */}
          <div className="w-full md:w-1/2 p-8 md:p-12 flex flex-col justify-center">
            <div className="text-center mb-8">
              <h1 className="text-4xl font-bold text-[#352F44] uppercase tracking-wide">Login</h1>
              <p className="text-gray-600 mt-3 uppercase text-sm tracking-wide">
                Enter your details and let's get started.
              </p>
            </div>

            {/* Mobile animation container */}
            <div className="md:hidden w-full h-48 mb-6">
              <div ref={animationContainer} className="w-full h-full" />
            </div>

            <form onSubmit={handleLogin} className="space-y-6">
              <div className="space-y-2">
                <Label className="uppercase text-sm font-medium text-gray-700">
                  Email Address
                </Label>
                <Input
                  type="email"
                  placeholder="ENTER YOUR EMAIL"
                  value={form.email}
                  onChange={(e) => updateField("email", e.target.value)}
                  className={`bg-gray-100 border ${errors.email ? "border-red-500" : "border-gray-300"}`}
                />
                {errors.email && (
                  <p className="text-red-500 text-xs mt-1">{errors.email}</p>
                )}
              </div>

              <div className="space-y-2">
                <Label className="uppercase text-sm font-medium text-gray-700">
                  Password
                </Label>
                <Input
                  type="password"
                  placeholder="ENTER YOUR PASSWORD"
                  value={form.password}
                  onChange={(e) => updateField("password", e.target.value)}
                  className={`bg-gray-100 border ${errors.password ? "border-red-500" : "border-gray-300"}`}
                />
                {errors.password && (
                  <p className="text-red-500 text-xs mt-1">{errors.password}</p>
                )}
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <input 
                    type="checkbox" 
                    id="rememberMe" 
                    checked={rememberMe}
                    onChange={() => setRememberMe(!rememberMe)}
                    className="mr-2" 
                  />
                  <label htmlFor="rememberMe" className="text-sm uppercase text-gray-700">
                    Remember Me
                  </label>
                </div>
                <Link
                  to="/forgot-password"
                  className="text-sm uppercase text-[#5C5470] hover:text-[#352F44]"
                >
                  Forgot your password?
                </Link>
              </div>

              {errors.credentials && (
                <p className="text-red-500 text-xs text-center">{errors.credentials}</p>
              )}

              <Button
                type="submit"
                disabled={isLoading}
                className="w-full bg-[#5C5470] text-white py-3 rounded-lg hover:bg-[#352F44] uppercase font-medium"
              >
                {isLoading ? (
                  <>
                    <span className="inline-block w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></span>
                    Logging in...
                  </>
                ) : (
                  "Login"
                )}
              </Button>
            </form>

            <div className="mt-8">
              <div className="text-center text-sm text-gray-600 uppercase mb-4">Or log in with:</div>
              <div className="flex justify-center">
                <button
                  type="button"
                  className="flex items-center justify-center w-12 h-12 bg-red-600 text-white rounded-full hover:scale-105 transition-transform duration-200"
                >
                  <FaGoogle className="w-6 h-6" />
                </button>
              </div>
            </div>

            <p className="text-center mt-8 text-gray-600 text-sm uppercase">
              Don't have an account?{" "}
              <Link
                to="/register"
                className="text-[#5C5470] hover:text-[#352F44] font-medium"
              >
                Sign Up
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
