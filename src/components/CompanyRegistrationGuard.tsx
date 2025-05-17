import { Navigate, Outlet, useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { RootState } from '@/store';
import { useAuth } from '@/contexts/AuthContext';
import { useEffect, useState } from 'react';

const CompanyRegistrationGuard = () => {
    const { isAuthenticated } = useAuth();
    const user = useSelector((state: RootState) => state.auth.user);
    const location = useLocation();
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        // Add a small delay to ensure Redux state is properly loaded
        const timer = setTimeout(() => {
            setIsLoading(false);
        }, 100);

        return () => clearTimeout(timer);
    }, []);

    if (isLoading) {
        return (
            <div className="flex items-center justify-center h-screen">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#5C5470]"></div>
            </div>
        );
    }

    // If not authenticated, redirect to login
    if (!isAuthenticated) {
        return <Navigate to="/login" state={{ from: location }} replace />;
    }

    // If user has no company, redirect to company registration
    console.log("user in company registartion guard------------------", user)
    if (!user?.company) {
        console.log("navigate to company in company guard ------------------",user?.company)
        return <Navigate to="/company" replace />;
    }

    // If user has company, allow access to protected routes
    return <Outlet />;
};

export default CompanyRegistrationGuard; 