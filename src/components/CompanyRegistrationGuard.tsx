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
        // Wait until Redux has loaded the user
        if (isAuthenticated && user !== null) {
            setIsLoading(false);
        }
    }, [isAuthenticated, user]);

    if (isLoading) {
        return (
            <div className="flex items-center justify-center h-screen">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#5C5470]"></div>
            </div>
        );
    }

    if (!isAuthenticated) {
        return <Navigate to="/login" state={{ from: location }} replace />;
    }

    if (!user?.company) {
        return <Navigate to="/company" replace />;
    }

    return <Outlet />;
};

export default CompanyRegistrationGuard; 