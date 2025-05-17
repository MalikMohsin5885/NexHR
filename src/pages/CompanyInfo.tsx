import { useState, useRef, useEffect } from "react";
import { registerCompany } from "@/services/companyService";
import { useNavigate } from "react-router-dom";
import { toast } from "@/components/ui/use-toast";
import { useDispatch } from "react-redux";
import { updateCompany } from "@/store/authSlice";

const CompanyInfoForm = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [formData, setFormData] = useState({
    name: "",
    industry: "",
    email: "",
    phone: ""
  });
  const [isLoading, setIsLoading] = useState(false);
  const desktopAnimationContainer = useRef(null);
  const mobileAnimationContainer = useRef(null);

  useEffect(() => {
    const loadLottie = async () => {
      const lottie = await import("lottie-web");

      const isMobile = window.innerWidth < 768;
      const container = isMobile
        ? mobileAnimationContainer.current
        : desktopAnimationContainer.current;

      if (container) {
        const anim = lottie.default.loadAnimation({
          container,
          renderer: "svg",
          loop: true,
          autoplay: true,
          path: "/lottieFiles/company-info.json",
        });

        return () => anim.destroy();
      }
    };

    loadLottie();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const result = await registerCompany(formData);
      console.log("Company registered successfully:", result);
      
      // Update Redux store with company information
      dispatch(updateCompany({
        id: result.id,
        ...formData
      }));
      
      // Show success toast
      toast({
        title: "Success!",
        description: "Company registered successfully. Redirecting to dashboard...",
        variant: "default",
      });

      // Navigate to dashboard after a short delay
      setTimeout(() => {
        navigate("/dashboard");
      }, 1500);
    } catch (error) {
      console.error("Registration error:", error.message);
      // Show error toast
      toast({
        title: "Error",
        description: error.message || "Failed to register company. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col md:flex-row min-h-screen bg-gray-50">
      {/* Left side - Form */}
      <div className="w-full md:w-1/2 p-8 flex flex-col justify-center">
        <div className="max-w-2xl mx-auto w-full">
          <h1 className="text-3xl font-bold text-gray-800 mb-2">Company Info</h1>
          <p className="text-gray-600 mb-8">
            Please enter your company details to continue with the registration process.
            This information will help us customize your experience.
          </p>
          
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6">
              <div className="space-y-1">
                <label htmlFor="name" className="block text-sm font-semibold text-gray-700">
                  Company Name
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  className="w-full max-w-[280px] px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#352f44] focus:border-transparent transition-all duration-200 bg-gray-50"
                  placeholder="Enter your company name"
                  required
                />
              </div>

              <div className="space-y-1">
                <label htmlFor="industry" className="block text-sm font-semibold text-gray-700">
                  Industry
                </label>
                <input
                  type="text"
                  id="industry"
                  name="industry"
                  value={formData.industry}
                  onChange={handleChange}
                  className="w-full max-w-[280px] px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#352f44] focus:border-transparent transition-all duration-200 bg-gray-50"
                  placeholder="Enter your industry"
                  required
                />
              </div>

              <div className="space-y-1">
                <label htmlFor="email" className="block text-sm font-semibold text-gray-700">
                  Company Email
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full max-w-[280px] px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#352f44] focus:border-transparent transition-all duration-200 bg-gray-50"
                  placeholder="Enter your company email"
                  required
                />
              </div>

              <div className="space-y-1">
                <label htmlFor="phone" className="block text-sm font-semibold text-gray-700">
                  Phone Number
                </label>
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  className="w-full max-w-[280px] px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#352f44] focus:border-transparent transition-all duration-200 bg-gray-50"
                  placeholder="Enter your phone number"
                  required
                />
              </div>
            </div>
            
            <div className="flex justify-start">
              <button
                type="submit"
                disabled={isLoading}
                className="w-[635px] bg-[#352f44] hover:bg-[#2a2535] text-white font-medium py-3 px-4 rounded-lg transition duration-300 flex items-center justify-center space-x-2 disabled:opacity-70 disabled:cursor-not-allowed"
              >
                {isLoading ? (
                  <>
                    <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    <span>Processing...</span>
                  </>
                ) : (
                  <span>Submit</span>
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
      
      {/* Right side - Lottie Animation */}
      <div className="hidden md:flex md:w-1/2" style={{ backgroundColor: '#dbd8e3' }}>
        <div className="w-full flex items-center justify-center">
          <div
            ref={desktopAnimationContainer}
            className="w-full h-full max-w-lg"
            style={{ minHeight: "400px" }}
          />
        </div>
      </div>
      
      {/* Mobile animation (only shown on mobile) */}
      <div className="md:hidden w-full p-4 flex justify-center" style={{ backgroundColor: '#dbd8e3' }}>
        <div
          ref={mobileAnimationContainer}
          className="w-full h-64"
        />
      </div>
    </div>
  );
};

export default CompanyInfoForm;