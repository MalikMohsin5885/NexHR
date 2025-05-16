import React, { useEffect } from 'react';
import { Loader2 } from 'lucide-react';
import { useSearchParams } from 'react-router-dom';
import { linkedinService } from '@/services/linkedinService';
import { toast } from '@/hooks/use-toast';

const LinkedInAuth: React.FC = () => {
  const [searchParams] = useSearchParams();

  useEffect(() => {
    const handleCallback = async () => {
      const code = searchParams.get('code');
      const error = searchParams.get('error');

      if (error) {
        toast({
          title: "Error",
          description: "Failed to connect with LinkedIn",
          variant: "destructive",
        });
        return;
      }

      if (code) {
        try {
          const result = await linkedinService.getAccessToken(code);
          if (result.success) {
            toast({
              title: "Success",
              description: "Successfully connected with LinkedIn",
            });

            // 👇 Send message to opener window (optional)
            if (window.opener) {
              window.opener.postMessage({ linkedinAuth: "success" }, "*");
            }

            // 👇 Close the auth popup
            window.close();
          } else {
            toast({
              title: "Error",
              description: result.message || "Failed to connect with LinkedIn",
              variant: "destructive",
            });
          }
        } catch (err) {
          toast({
            title: "Error",
            description: "Failed to connect with LinkedIn",
            variant: "destructive",
          });
        }
      }
    };

    handleCallback();
  }, [searchParams]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#F2F1F7] to-[#DBD8E3]">
      <div className="text-center space-y-4">
        <Loader2 className="h-12 w-12 animate-spin text-[#352F44] mx-auto" />
        <h1 className="text-2xl font-bold text-[#352F44]">Connecting to LinkedIn</h1>
        <p className="text-[#5C5470]">Please wait while we connect your account...</p>
      </div>
    </div>
  );
};

export default LinkedInAuth;
