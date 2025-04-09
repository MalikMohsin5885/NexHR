
import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { useEffect, useState } from 'react';

const ProtectedRoute = () => {
  const { isAuthenticated, accessToken, refreshAccessToken } = useAuth();
  const [isLoading, setIsLoading] = useState(true);
  const [isTokenValid, setIsTokenValid] = useState(false);

  useEffect(() => {
    const checkAuth = async () => {
      if (!isAuthenticated && accessToken) {
        // Try to refresh token if we have one but not authenticated
        const refreshed = await refreshAccessToken();
        setIsTokenValid(refreshed);
      } else {
        setIsTokenValid(isAuthenticated);
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
