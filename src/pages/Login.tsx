
import React, { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { FaGoogle } from "react-icons/fa";
import { useAuth } from "../contexts/AuthContext";
import { toast } from "@/components/ui/use-toast";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

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
  const { login, isAuthenticated } = useAuth();

  // Redirect if already logged in
  useEffect(() => {
    if (isAuthenticated) {
      navigate('/dashboard');
    }
  }, [isAuthenticated, navigate]);

  // Normal-case styling for input fields with consistent styling like the provided example
  const inputClass = (fieldError?: string) =>
    `w-full p-2 border rounded-lg focus:outline-none text-[#363636] 
     placeholder:normal-case placeholder:text-sm normal-case
     ${
       fieldError
         ? "border-red-500 focus:ring-2 focus:ring-red-500"
         : "border-gray-300 focus:ring-2 focus:ring-[#5C5470]"
     }`;

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
        // Check local storage for registered users (like in the provided sample code)
        const storedUsers = localStorage.getItem("registeredUsers");
        if (storedUsers) {
          const users = JSON.parse(storedUsers);
          const userExists = users.some(
            (user: { email: string; password: string }) =>
              user.email === form.email && user.password === form.password
          );
          
          if (userExists) {
            // Simulate login with stored user
            const mockAccessToken = "mock-access-token";
            const mockRefreshToken = "mock-refresh-token";
            
            const result = await login(form.email, form.password, mockAccessToken, mockRefreshToken);
            
            if (result.success) {
              toast({
                title: "Login successful",
                description: "Welcome back!",
                variant: "default",
              });
              
              navigate('/dashboard');
            }
          } else {
            toast({
              title: "Login failed",
              description: "User not found or incorrect credentials. Please register or try again.",
              variant: "destructive",
            });
            
            setErrors({
              credentials: "User not found or incorrect credentials. Please register or try again.",
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
      <div className="relative w-full max-w-5xl p-[3px] bg-gradient-to-r from-[#5C5470] to-[#DBD8E3] rounded-[5rem] shadow-2xl">
        <div className="flex flex-col md:flex-row bg-[#F2F1F7] rounded-[5rem] overflow-hidden">
          {/* Left side with illustration - only visible on desktop */}
          <div className="hidden md:flex md:w-1/2 items-center justify-center p-8 bg-transparent">
            <img src="/images/login-illustration.svg" alt="Login" className="w-full max-w-xs" />
          </div>

          {/* Neon vertical gradient divider - only visible on desktop */}
          <div className="hidden md:block w-[2px] bg-gradient-to-b from-[#352F44] to-[#5C5470] shadow-[0_0_10px_3px_rgba(80,0,80,0.8)]" />

          {/* Right side with login form */}
          <div className="w-full md:w-1/2 p-8">
            <div className="text-center mb-8">
              <h1 className="text-4xl font-extrabold text-[#352F44]">Login</h1>
              <p className="text-gray-600 mt-2">
                Enter your details and let's get started.
              </p>
            </div>

            {/* Mobile illustration container */}
            <div className="md:hidden w-full h-48 mb-6 flex items-center justify-center">
              <img src="/images/login-illustration.svg" alt="Login" className="h-full" />
            </div>

            <form onSubmit={handleLogin}>
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

              <div className="mb-6">
                <label className="block text-gray-700 text-sm font-bold mb-1">
                  Password
                </label>
                <input
                  type="password"
                  placeholder="Enter your password"
                  value={form.password}
                  onChange={(e) => updateField("password", e.target.value)}
                  className={inputClass(errors.password)}
                  required
                />
                {errors.password && (
                  <p className="text-red-500 text-xs mt-1">{errors.password}</p>
                )}
              </div>

              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center">
                  <input
                    type="checkbox"
                    id="rememberMe"
                    checked={rememberMe}
                    onChange={() => setRememberMe(!rememberMe)}
                    className="mr-2"
                  />
                  <label htmlFor="rememberMe" className="text-sm text-gray-700">
                    Remember Me
                  </label>
                </div>
                <Link
                  to="/forgot-password"
                  className="text-sm text-[#5C5470] hover:text-[#352F44] hover:underline"
                >
                  Forgot your password?
                </Link>
              </div>

              {errors.credentials && (
                <p className="text-red-500 text-xs mb-4">{errors.credentials}</p>
              )}

              <Button
                type="submit"
                disabled={isLoading}
                className="w-full bg-[#5C5470] text-white py-2 rounded-lg hover:bg-[#352F44] transition duration-300"
              >
                {isLoading ? (
                  <>
                    <span className="inline-block w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></span>
                    LOGGING IN...
                  </>
                ) : (
                  "LOGIN"
                )}
              </Button>
            </form>

            {/* Single Google Auth Button */}
            <div className="mt-6">
              <p className="text-center text-gray-600 mb-4">Or log in with:</p>
              <div className="flex justify-center">
                <button
                  type="button"
                  className="flex items-center justify-center w-10 h-10 bg-red-600 text-white rounded-full transition duration-300 hover:scale-105 hover:shadow-lg hover:shadow-[#5C5470]/50"
                >
                  <FaGoogle className="w-6 h-6" />
                </button>
              </div>
            </div>

            <p className="text-center mt-6 text-gray-600">
              Don't have an account?{" "}
              <Link
                to="/register"
                className="text-[#5C5470] hover:text-[#352F44] hover:underline"
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
