
import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { useEffect, useState } from 'react';

const ProtectedRoute = () => {
  const { isAuthenticated, accessToken, refreshAccessToken } = useAuth();
  const [isLoading, setIsLoading] = useState(true);
  const [isTokenValid, setIsTokenValid] = useState(false);

  useEffect(() => {
    const checkAuth = async () => {
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
      } else {
        setIsTokenValid(false);
      }
      
      setIsLoading(false);
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
