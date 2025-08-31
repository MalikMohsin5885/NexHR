import React from "react";
import { FaGoogle } from "react-icons/fa";
import { toast } from "@/components/ui/use-toast";
import { useAuth } from "@/contexts/AuthContext";

interface GoogleLoginButtonProps {
  onSuccess?: () => void;
  className?: string;
}
const GoogleLoginButton: React.FC<GoogleLoginButtonProps> = ({ onSuccess, className = "" }) => {
  const { loginWithGoogle } = useAuth();

  const handleGoogleLogin = async () => {
    try {
      if (!(window as any).google) {
        const script = document.createElement('script');
        script.src = 'https://accounts.google.com/gsi/client';
        script.async = true;
        script.defer = true;
        document.body.appendChild(script);
        
        script.onload = () => {
          initGoogleAuth();
        };
      } else {
        initGoogleAuth();
      }
    } catch (error) {
      console.error("Google login error:", error);
      toast({
        title: "Error",
        description: "Failed to initialize Google login",
        variant: "destructive",
      });
    }
  };

  const initGoogleAuth = () => {
    const googleAuth = (window as any).google?.accounts.oauth2;
    if (!googleAuth) {
      console.error("Google OAuth library is not loaded.");
      return;
    }

    const client = googleAuth.initTokenClient({
      client_id: "1041267363925-onnkbnmhs0i2dvqj5memd3vqhnrlem05.apps.googleusercontent.com",
      scope: "profile email",
      callback: async (response: any) => {
        if (response.error) {
          console.error("Google authentication failed", response);
          toast({
            title: "Error",
            description: "Failed to authenticate with Google",
            variant: "destructive",
          });
          return;
        }

        try {
          const result = await loginWithGoogle(response.access_token);
          if (result.success) {
            toast({
              title: "Success",
              description: "Successfully logged in with Google",
            });
            
            // Wait a bit to ensure state is updated
            setTimeout(() => {
              onSuccess?.();
            }, 100);
          } else {
            toast({
              title: "Error",
              description: result.message || "Failed to authenticate with Google",
              variant: "destructive",
            });
          }
        } catch (error) {
          console.error("Backend authentication failed:", error);
          toast({
            title: "Error",
            description: "Failed to authenticate with the server",
            variant: "destructive",
          });
        }
      },
    });

    client.requestAccessToken();
  };

  return (
    <button
      onClick={handleGoogleLogin}
      className={`flex items-center justify-center gap-2 px-4 py-2 text-[#5C5470] border-2 border-[#5C5470] bg-white rounded-lg hover:bg-[#5C5470] hover:text-white transition duration-300 ${className}`}
    >
      <FaGoogle className="w-5 h-5" />
      Continue with Google
    </button>
  );
};

export default GoogleLoginButton; 