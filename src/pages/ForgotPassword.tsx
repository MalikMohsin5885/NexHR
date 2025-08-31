import React, { useState, useRef, useEffect } from "react";
import { Link } from "react-router-dom";
import { toast } from "@/components/ui/use-toast";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Mail, ArrowLeft } from "lucide-react";
import { requestPasswordReset } from "@/services/auth";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
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
          path: "/lottieFiles/forgot-password.json",
        });

        return () => anim.destroy();
      }
    };

    loadLottie();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim()) {
      setError("Please enter your email address");
      return;
    }

    setIsLoading(true);
    try {
      await requestPasswordReset({ email });
      setSubmitted(true);
      setError("");
      toast({
        title: "Reset Link Sent",
        description: "If an account exists with this email, you will receive password reset instructions.",
      });
    } catch (error) {
      setError(error instanceof Error ? error.message : "Something went wrong. Please try again.");
      toast({
        title: "Error",
        description: error instanceof Error ? error.message : "Something went wrong. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col md:flex-row min-h-screen bg-gray-50">
      {/* Left side - Form */}
      <div className="w-full md:w-1/2 p-8 flex flex-col justify-center" style={{ backgroundColor: '#dbd8e3' }}>
        <div className="max-w-md mx-auto w-full">
          <Link 
            to="/login" 
            className="inline-flex items-center text-[#352F44] hover:text-[#5C5470] mb-8 transition-colors"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Login
          </Link>

          <div className="space-y-6">
            <div>
              <h1 className="text-3xl font-bold text-gray-800 mb-2">Forgot Password?</h1>
              <p className="text-gray-600">
                No worries, we'll send you reset instructions.
              </p>
            </div>

            {submitted ? (
              <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                <div className="flex items-center justify-center w-12 h-12 bg-green-100 rounded-full mx-auto mb-4">
                  <Mail className="w-6 h-6 text-green-600" />
                </div>
                <h3 className="text-lg font-semibold text-center text-gray-800 mb-2">
                  Check Your Email
                </h3>
                <p className="text-center text-gray-600 mb-6">
                  We've sent password reset instructions to <span className="font-medium">{email}</span>
                </p>
                <Button
                  variant="outline"
                  className="w-full"
                  onClick={() => setSubmitted(false)}
                >
                  Try another email
                </Button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-700">
                    Email address
                  </label>
                  <Input
                    type="email"
                    placeholder="Enter your email"
                    value={email}
                    onChange={(e) => {
                      setEmail(e.target.value);
                      if (error) setError("");
                    }}
                    className={`w-full ${error ? "border-red-500" : ""}`}
                  />
                  {error && (
                    <p className="text-sm text-red-500">{error}</p>
                  )}
                </div>

                <Button
                  type="submit"
                  className="w-full bg-[#352F44] hover:bg-[#2a2535] text-white"
                  disabled={isLoading}
                >
                  {isLoading ? (
                    <div className="flex items-center space-x-2">
                      <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                      <span>Sending...</span>
                    </div>
                  ) : (
                    "Send Reset Link"
                  )}
                </Button>
              </form>
            )}
          </div>
        </div>
      </div>

      {/* Right side - Lottie Animation */}
      <div className="hidden md:flex md:w-1/2">
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

export default ForgotPassword;
