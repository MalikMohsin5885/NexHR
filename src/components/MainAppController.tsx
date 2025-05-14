console.log('[MainAppController] MOUNTED');
import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState, AppDispatch } from '@/store';
import CompanyInfoModal from '@/components/CompanyInfoModal';
import { useAuth } from '@/contexts/AuthContext'; 

interface MainAppControllerProps {
  children: React.ReactNode;
}

export const MainAppController: React.FC<MainAppControllerProps> = ({ children }) => {
  const { isAuthenticated } = useAuth(); 

  const { 
    needsCompanyInfo 
  } = useSelector((state: RootState) => state.company);

  // Log the values to help debug
  console.log('[MainAppController] isAuthenticated:', isAuthenticated);
  console.log('[MainAppController] needsCompanyInfo:', needsCompanyInfo);

  // if (isAuthenticated && needsCompanyInfo) {
  //   console.log('[MainAppController] Rendering CompanyInfoModal');
  //   return <CompanyInfoModal isOpen={true} onClose={() => { 
  //     console.log("CompanyInfoModal was signaled to close by user/dialog interaction.");
  //   }} />;
  // }

  console.log('[MainAppController] Rendering children (app routes)');
  return <>{children}</>;
};

// Removed default export 