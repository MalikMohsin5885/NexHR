
import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { useEffect, useState } from 'react';
import { toast } from "@/components/ui/use-toast";

const ProtectedRoute = () => {
  const { isAuthenticated, accessToken, refreshAccessToken } = useAuth();
  const [isLoading, setIsLoading] = useState(true);
  const [isTokenValid, setIsTokenValid] = useState(false);

  useEffect(() => {
    const checkAuth = async () => {
      try {
        // Check if we're authenticated already
        if (isAuthenticated) {
          setIsTokenValid(true);
          setIsLoading(false);
          return;
        }
        
        // If we have an access token but not authenticated, try to refresh
        if (accessToken) {
          const refreshed = await refreshAccessToken();
          setIsTokenValid(refreshed);
          if (!refreshed) {
            toast({
              title: "Authentication Error",
              description: "Your session has expired. Please log in again.",
              variant: "destructive",
            });
          }
        } else {
          setIsTokenValid(false);
        }
      } catch (error) {
        console.error("Auth check error:", error);
        setIsTokenValid(false);
        toast({
          title: "Authentication Error",
          description: "There was an issue verifying your authentication. Please log in again.",
          variant: "destructive",
        });
      } finally {
        setIsLoading(false);
      }
    };

    checkAuth();
  }, [isAuthenticated, accessToken, refreshAccessToken]);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#5C5470]"></div>
      </div>
    );
  }

  return isTokenValid ? <Outlet /> : <Navigate to="/login" />;
};

export default ProtectedRoute;
