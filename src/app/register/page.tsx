"use client";
import { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import lottie from "lottie-web";
import {
  FaMicrosoft,
  FaLinkedin,
  FaGoogle,
  FaFacebook,
  FaTwitter,
  FaApple,
} from "react-icons/fa";

interface FormErrors {
  fullName?: string;
  companyName?: string;
  noOfEmployees?: string;
  phoneNo?: string;
  email?: string;
  password?: string;
  privacy?: string;
}

export default function RegisterPage() {
  const [fullName, setFullName] = useState("");
  const [companyName, setCompanyName] = useState("");
  const [noOfEmployees, setNoOfEmployees] = useState("");
  const [phoneNo, setPhoneNo] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [agree, setAgree] = useState(false);
  const [errors, setErrors] = useState<FormErrors>({});

  const router = useRouter();
  const animationContainer = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (animationContainer.current) {
      const anim = lottie.loadAnimation({
        container: animationContainer.current,
        renderer: "svg",
        loop: true,
        autoplay: true,
        path: "/lottieFiles/Animation - 1742140196110.json",
      });
      return () => anim.destroy();
    }
  }, []);

  const handleRegister = (e: React.FormEvent) => {
    e.preventDefault();
    const newErrors: FormErrors = {};

    if (!fullName.trim()) {
      newErrors.fullName = "Full name is required.";
    }
    if (!companyName.trim()) {
      newErrors.companyName = "Company name is required.";
    }
    if (!noOfEmployees.trim()) {
      newErrors.noOfEmployees = "Number of employees is required.";
    } else if (isNaN(Number(noOfEmployees))) {
      newErrors.noOfEmployees = "Please enter a valid number.";
    }
    if (!phoneNo.trim()) {
      newErrors.phoneNo = "Phone number is required.";
    }
    if (!email.trim()) {
      newErrors.email = "Email is required.";
    } else {
      const emailRegex =
        /^(?!\.)(?!.*\.\.)[A-Za-z0-9!#$%&'*+/=?^_`{|}~.]+(?<!\.)@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/;
      if (!emailRegex.test(email)) {
        newErrors.email = "Please enter a valid email address.";
      }
    }
    if (!password.trim()) {
      newErrors.password = "Password is required.";
    } else {
      if (password.length < 8 || !/\d/.test(password)) {
        newErrors.password =
          "Must be at least 8 characters and include at least one number.";
      }
    }
    if (!agree) {
      newErrors.privacy = "You must agree to the Privacy Statement and Disclaimer.";
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    const storedUsers = localStorage.getItem("registeredUsers");
    const users = storedUsers ? JSON.parse(storedUsers) : [];

    const userExists = users.some(
      (user: { email: string }) => user.email === email
    );
    if (userExists) {
      setErrors({ ...newErrors, email: "User already registered. Please log in." });
      return;
    }

    users.push({
      fullName,
      companyName,
      noOfEmployees,
      phoneNo,
      email,
      password,
    });
    localStorage.setItem("registeredUsers", JSON.stringify(users));
    router.push("/dashboard");
  };

  // Add "normal-case" to the input to override uppercase transforms
  const inputClass = (fieldError?: string) =>
    `w-full p-2 border rounded-lg focus:outline-none text-[#363636] 
     placeholder:normal-case placeholder:text-sm normal-case
     ${
       fieldError
         ? "border-red-500 focus:ring-2 focus:ring-red-500"
         : "border-gray-300 focus:ring-2 focus:ring-[#5C5470]"
     }`;

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#2A2438] px-4 font-nura">
      {/* Increased to max-w-5xl to give more space */}
      <div className="relative max-w-5xl w-full p-[3px] bg-gradient-to-r from-[#5C5470] to-[#DBD8E3] rounded-[5rem] shadow-2xl">
        <div className="flex bg-[#F2F1F7] rounded-[5rem] overflow-hidden">
          <div className="w-1/2 p-8 flex items-center justify-center bg-transparent">
            <div ref={animationContainer} className="w-full h-64" />
          </div>
          <div className="w-[2px] bg-gradient-to-b from-[#352F44] to-[#5C5470] shadow-[0_0_10px_3px_rgba(80,0,80,0.8)]" />
          <div className="w-1/2 p-8">
            <div className="text-center mb-8">
              <h1 className="text-4xl font-extrabold text-[#352F44]">Sign Up</h1>
              <p className="text-gray-600 mt-2">
                Enter your details and let’s get started.
              </p>
            </div>

            <form onSubmit={handleRegister}>
              {/* Full Name & Phone Number */}
              <div className="flex flex-col md:flex-row gap-4 mb-4">
                <div className="md:w-1/2 w-full">
                  <label className="block text-gray-700 text-sm font-bold mb-1">
                    Full name
                  </label>
                  <input
                    type="text"
                    placeholder="Enter full name"
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    className={inputClass(errors.fullName)}
                  />
                  {errors.fullName && (
                    <p className="text-red-500 text-xs mt-1">{errors.fullName}</p>
                  )}
                </div>
                <div className="md:w-1/2 w-full">
                  <label className="block text-gray-700 text-sm font-bold mb-1">
                    Phone number
                  </label>
                  <input
                    type="text"
                    placeholder="Enter phone number"
                    value={phoneNo}
                    onChange={(e) => setPhoneNo(e.target.value)}
                    className={inputClass(errors.phoneNo)}
                  />
                  {errors.phoneNo && (
                    <p className="text-red-500 text-xs mt-1">{errors.phoneNo}</p>
                  )}
                </div>
              </div>

              {/* Company Name & Number of Employees */}
              <div className="flex flex-col md:flex-row gap-4 mb-4">
                <div className="md:w-[48%] w-full">
                  <label
                    className="
                      block 
                      text-gray-700 
                      text-sm 
                      font-bold 
                      mb-1 
                      whitespace-nowrap
                    "
                  >
                    Company name
                  </label>
                  <input
                    type="text"
                    placeholder="Enter your company name"
                    value={companyName}
                    onChange={(e) => setCompanyName(e.target.value)}
                    className={inputClass(errors.companyName)}
                  />
                  {errors.companyName && (
                    <p className="text-red-500 text-xs mt-1">{errors.companyName}</p>
                  )}
                </div>
                <div className="md:w-[48%] w-full">
                  <label
                    className="
                      block 
                      text-gray-700 
                      text-sm 
                      font-bold 
                      mb-1 
                      whitespace-nowrap
                    "
                  >
                    Number of employees
                  </label>
                  <input
                    type="text"
                    placeholder="Enter no employees"
                    value={noOfEmployees}
                    onChange={(e) => setNoOfEmployees(e.target.value)}
                    className={inputClass(errors.noOfEmployees)}
                  />
                  {errors.noOfEmployees && (
                    <p className="text-red-500 text-xs mt-1">{errors.noOfEmployees}</p>
                  )}
                </div>
              </div>

              {/* Email & Password */}
              <div className="flex flex-col md:flex-row gap-4 mb-4">
                <div className="md:w-1/2 w-full">
                  <label className="block text-gray-700 text-sm font-bold mb-1">
                    Email address
                  </label>
                  <input
                    type="email"
                    placeholder="Enter your email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className={inputClass(errors.email)}
                  />
                  {errors.email && (
                    <p className="text-red-500 text-xs mt-1">{errors.email}</p>
                  )}
                </div>
                <div className="md:w-1/2 w-full">
                  <label className="block text-gray-700 text-sm font-bold mb-1">
                    Password
                  </label>
                  <input
                    type="password"
                    placeholder="Enter your password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className={inputClass(errors.password)}
                  />
                  {errors.password && (
                    <p className="text-red-500 text-xs mt-1">{errors.password}</p>
                  )}
                </div>
              </div>

              {/* Privacy Checkbox */}
              <div className="mb-6 flex items-center">
                <input
                  type="checkbox"
                  id="agree"
                  checked={agree}
                  onChange={(e) => setAgree(e.target.checked)}
                  className={`
                    mr-2
                    ${errors.privacy ? "outline-red-500 ring-2 ring-red-500" : ""}
                  `}
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
                className="w-full bg-[#5C5470] text-white py-2 rounded-lg hover:bg-[#352F44] transition duration-300"
              >
                REGISTER
              </button>
            </form>

            {/* Social Login Buttons */}
            <div className="mt-6">
              <p className="text-center text-gray-600 mb-4">Or sign up with:</p>
              <div className="flex justify-center space-x-4">
                <button type="button" className="flex items-center justify-center w-10 h-10 bg-gray-800 text-white rounded-full transition duration-300 hover:scale-105 hover:shadow-lg hover:shadow-[#5C5470]/50">
                  <FaMicrosoft className="w-6 h-6" />
                </button>
                <button type="button" className="flex items-center justify-center w-10 h-10 bg-blue-600 text-white rounded-full transition duration-300 hover:scale-105 hover:shadow-lg hover:shadow-[#5C5470]/50">
                  <FaLinkedin className="w-6 h-6" />
                </button>
                <button type="button" className="flex items-center justify-center w-10 h-10 bg-red-600 text-white rounded-full transition duration-300 hover:scale-105 hover:shadow-lg hover:shadow-[#5C5470]/50">
                  <FaGoogle className="w-6 h-6" />
                </button>
                <button type="button" className="flex items-center justify-center w-10 h-10 bg-blue-800 text-white rounded-full transition duration-300 hover:scale-105 hover:shadow-lg hover:shadow-[#5C5470]/50">
                  <FaFacebook className="w-6 h-6" />
                </button>
                <button type="button" className="flex items-center justify-center w-10 h-10 bg-blue-400 text-white rounded-full transition duration-300 hover:scale-105 hover:shadow-lg hover:shadow-[#5C5470]/50">
                  <FaTwitter className="w-6 h-6" />
                </button>
                <button type="button" className="flex items-center justify-center w-10 h-10 bg-black text-white rounded-full transition duration-300 hover:scale-105 hover:shadow-lg hover:shadow-[#5C5470]/50">
                  <FaApple className="w-6 h-6" />
                </button>
              </div>
            </div>
            <p className="text-center mt-6 text-gray-600">
              Already have an account?{" "}
              <a href="/login" className="text-[#5C5470] hover:text-[#352F44] hover:underline">
                Sign In
              </a>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
