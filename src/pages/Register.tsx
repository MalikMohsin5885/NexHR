
import React, { useState, useEffect, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import lottie from "lottie-web";
import { useAuth } from "../contexts/AuthContext";
import { toast } from "@/components/ui/use-toast";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { FaGoogle, FaFacebook, FaTwitter, FaApple, FaWindows, FaLinkedin } from "react-icons/fa";
import api, { handleApiError } from "../lib/api";

interface RegisterErrors {
  firstName?: string;
  lastName?: string;
  fullName?: string;
  email?: string;
  phoneNo?: string;
  password?: string;
  confirmPassword?: string;
  companyName?: string;
  employeeCount?: string;
  privacy?: string;
}

const RegisterPage = () => {
  const [form, setForm] = useState({
    fullName: "",
    email: "",
    phoneNo: "",
    password: "",
    companyName: "",
    employeeCount: "",
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
    
    // Clear error when field is changed
    if (errors[field as keyof RegisterErrors]) {
      setErrors(prev => {
        const newErrors = { ...prev };
        delete newErrors[field as keyof RegisterErrors];
        return newErrors;
      });
    }
  };

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    const newErrors: RegisterErrors = {};
    
    // Split fullName into firstName and lastName
    let firstName = "", lastName = "";
    if (form.fullName) {
      const nameParts = form.fullName.trim().split(/\s+/);
      firstName = nameParts[0] || "";
      lastName = nameParts.slice(1).join(" ") || "";
    }

    // Form validation
    if (!form.fullName.trim()) {
      newErrors.fullName = "Full name is required.";
    }
    if (!form.email.trim()) {
      newErrors.email = "Email is required.";
    } else {
      const emailRegex = /^(?!\.)(?!.*\.\.)[A-Za-z0-9!#$%&'*+/=?^_`{|}~.]+(?<!\.)@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/;
      if (!emailRegex.test(form.email)) {
        newErrors.email = "Please enter a valid email address.";
      }
    }
    if (!form.phoneNo?.trim()) {
      newErrors.phoneNo = "Phone number is required.";
    }
    if (!form.password.trim()) {
      newErrors.password = "Password is required.";
    } else if (form.password.length < 8 || !/\d/.test(form.password)) {
      newErrors.password = "Must be at least 8 characters and include at least one number.";
    }
    if (!form.companyName.trim()) {
      newErrors.companyName = "Company name is required.";
    }
    if (!form.employeeCount.trim()) {
      newErrors.employeeCount = "Number of employees is required.";
    } else if (isNaN(Number(form.employeeCount))) {
      newErrors.employeeCount = "Please enter a valid number.";
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
      console.log('Registering user with:', {
        first_name: firstName,
        last_name: lastName,
        email: form.email,
        phone_number: form.phoneNo,
        company_name: form.companyName,
        employee_count: form.employeeCount
      });
      
      // For testing purposes, let's use the admin credentials to bypass actual registration
      const TEST_EMAIL = "admin@admin.com";
      const TEST_PASSWORD = "admin";
      
      // If using test credentials, bypass actual registration
      if (form.email === TEST_EMAIL && form.password === TEST_PASSWORD) {
        toast({
          title: "Test Account",
          description: "Using test account instead of registration",
          variant: "default",
        });
        navigate("/login");
        setIsLoading(false);
        return;
      }
      
      // Try registration with the real API
      const response = await api.post('/auth/register/', {
        first_name: firstName,
        last_name: lastName,
        email: form.email,
        phone_number: form.phoneNo,
        password: form.password,
        company_name: form.companyName,
        employee_count: parseInt(form.employeeCount),
      });
      
      if (response.status === 201) {
        toast({
          title: "Registration successful",
          description: "Your account has been created. Please log in.",
          variant: "default",
        });
        
        // Redirect to login page
        navigate("/login");
      } else {
        // This branch shouldn't execute since non-2xx responses throw errors
        // but kept for defensive programming
        toast({
          title: "Registration failed",
          description: "Please check your information and try again.",
          variant: "destructive",
        });
      }
    } catch (error: any) {
      console.error('Registration error:', error);
      
      // Use our improved error handler
      const errorResult = handleApiError(error, "Registration failed. Please try again.");
      
      if (error.response?.data) {
        // Map backend errors to form fields
        const apiErrors = error.response.data;
        const mappedErrors: RegisterErrors = {};
        
        // Map specific fields
        if (apiErrors.email) mappedErrors.email = apiErrors.email[0];
        if (apiErrors.first_name) mappedErrors.firstName = apiErrors.first_name[0];
        if (apiErrors.last_name) mappedErrors.lastName = apiErrors.last_name[0];
        if (apiErrors.phone_number) mappedErrors.phoneNo = apiErrors.phone_number[0];
        if (apiErrors.password) mappedErrors.password = apiErrors.password[0];
        if (apiErrors.company_name) mappedErrors.companyName = apiErrors.company_name[0];
        if (apiErrors.employee_count) mappedErrors.employeeCount = apiErrors.employee_count[0];
        
        if (Object.keys(mappedErrors).length > 0) {
          setErrors(mappedErrors);
        } else {
          // If no field-specific errors, show a toast with the general error
          toast({
            title: "Registration failed",
            description: errorResult.message,
            variant: "destructive",
          });
        }
      } else {
        // For network errors or other issues
        toast({
          title: "Connection error",
          description: errorResult.message,
          variant: "destructive",
        });
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#2A2438] px-4 py-8">
      <div className="relative w-full max-w-5xl p-[2px] bg-gradient-to-r from-[#5C5470] to-[#DBD8E3] rounded-[3rem] shadow-2xl">
        <div className="flex flex-col md:flex-row bg-white rounded-[3rem] overflow-hidden min-h-[650px]">
          {/* Left Side: Lottie Animation */}
          <div className="hidden md:flex md:w-1/2 bg-[#f8f8fc] items-center justify-center p-8">
            <div ref={animationContainer} className="w-full h-80" />
          </div>

          {/* Right Side: Register Form */}
          <div className="w-full md:w-1/2 p-8 md:p-12 flex flex-col justify-center">
            <div className="text-center mb-6">
              <h1 className="text-4xl font-bold text-[#352F44] uppercase tracking-wide">Sign Up</h1>
              <p className="text-gray-600 mt-2 uppercase text-sm tracking-wide">
                Experience NexHR—Get started today!
              </p>
            </div>

            {/* Mobile animation container */}
            <div className="md:hidden w-full h-48 mb-4">
              <div ref={animationContainer} className="w-full h-full" />
            </div>

            <form onSubmit={handleRegister} className="space-y-4">
              {/* Two columns for desktop */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* Full Name */}
                <div>
                  <Label className="uppercase text-sm font-medium text-gray-700">
                    Full Name
                  </Label>
                  <Input
                    type="text"
                    placeholder="ENTER FULL NAME"
                    value={form.fullName}
                    onChange={(e) => updateField("fullName", e.target.value)}
                    className={`bg-gray-100 border ${errors.fullName ? "border-red-500" : "border-gray-300"}`}
                  />
                  {errors.fullName && (
                    <p className="text-red-500 text-xs mt-1">{errors.fullName}</p>
                  )}
                </div>

                {/* Phone Number */}
                <div>
                  <Label className="uppercase text-sm font-medium text-gray-700">
                    Phone Number
                  </Label>
                  <Input
                    type="text"
                    placeholder="ENTER PHONE NUMBER"
                    value={form.phoneNo}
                    onChange={(e) => updateField("phoneNo", e.target.value)}
                    className={`bg-gray-100 border ${errors.phoneNo ? "border-red-500" : "border-gray-300"}`}
                  />
                  {errors.phoneNo && (
                    <p className="text-red-500 text-xs mt-1">{errors.phoneNo}</p>
                  )}
                </div>

                {/* Company Name */}
                <div>
                  <Label className="uppercase text-sm font-medium text-gray-700">
                    Company Name
                  </Label>
                  <Input
                    type="text"
                    placeholder="ENTER YOUR COMPANY NAME"
                    value={form.companyName}
                    onChange={(e) => updateField("companyName", e.target.value)}
                    className={`bg-gray-100 border ${errors.companyName ? "border-red-500" : "border-gray-300"}`}
                  />
                  {errors.companyName && (
                    <p className="text-red-500 text-xs mt-1">{errors.companyName}</p>
                  )}
                </div>

                {/* Number of Employees */}
                <div>
                  <Label className="uppercase text-sm font-medium text-gray-700">
                    Number of Employees
                  </Label>
                  <Input
                    type="text"
                    placeholder="ENTER NO EMPLOYEES"
                    value={form.employeeCount}
                    onChange={(e) => updateField("employeeCount", e.target.value)}
                    className={`bg-gray-100 border ${errors.employeeCount ? "border-red-500" : "border-gray-300"}`}
                  />
                  {errors.employeeCount && (
                    <p className="text-red-500 text-xs mt-1">{errors.employeeCount}</p>
                  )}
                </div>
              </div>

              {/* Email Address */}
              <div>
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

              {/* Password */}
              <div>
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

              {/* Privacy Checkbox */}
              <div className="flex items-center mb-2">
                <input
                  type="checkbox"
                  id="agree"
                  checked={form.agree as boolean}
                  onChange={(e) => updateField("agree", e.target.checked)}
                  className={`mr-2 ${errors.privacy ? "outline-red-500 ring-2 ring-red-500" : ""}`}
                />
                <label htmlFor="agree" className="text-sm uppercase text-gray-700">
                  I agree with Privacy Statement and Disclaimer
                </label>
              </div>
              {errors.privacy && (
                <p className="text-red-500 text-xs">{errors.privacy}</p>
              )}

              <Button
                type="submit"
                disabled={isLoading}
                className="w-full bg-[#5C5470] text-white py-3 rounded-lg hover:bg-[#352F44] uppercase font-medium"
              >
                {isLoading ? (
                  <>
                    <span className="inline-block w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></span>
                    Registering...
                  </>
                ) : (
                  "Register"
                )}
              </Button>
            </form>

            {/* Social Sign Up Options */}
            <div className="mt-6">
              <p className="text-center text-gray-600 mb-4 uppercase text-sm">Or sign up with:</p>
              <div className="flex justify-center space-x-3">
                <SocialButton icon={<FaWindows />} color="bg-[#00a4ef]" />
                <SocialButton icon={<FaLinkedin />} color="bg-[#0077b5]" />
                <SocialButton icon={<FaGoogle />} color="bg-[#ea4335]" />
                <SocialButton icon={<FaFacebook />} color="bg-[#1877f2]" />
                <SocialButton icon={<FaTwitter />} color="bg-[#1da1f2]" />
                <SocialButton icon={<FaApple />} color="bg-[#000000]" />
              </div>
            </div>

            <p className="text-center mt-6 text-gray-600 text-sm uppercase">
              Already have an account?{" "}
              <Link
                to="/login"
                className="text-[#5C5470] hover:text-[#352F44] font-medium"
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

// Helper component for social sign-up buttons
const SocialButton = ({ icon, color }: { icon: React.ReactNode, color: string }) => (
  <button
    type="button"
    className={`flex items-center justify-center w-10 h-10 ${color} text-white rounded-full hover:scale-105 transition-transform duration-200`}
  >
    {icon}
  </button>
);

export default RegisterPage;
