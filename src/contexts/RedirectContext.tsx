// src/contexts/RedirectContext.tsx
import { createContext, useContext, useState } from 'react';

interface RedirectContextType {
  redirectPath: string | null;
  setRedirectPath: (path: string | null) => void;
}

const RedirectContext = createContext<RedirectContextType>({
  redirectPath: null,
  setRedirectPath: () => {},
});

export const RedirectProvider = ({ children }: { children: React.ReactNode }) => {
  const [redirectPath, setRedirectPath] = useState<string | null>(null);

  return (
    <RedirectContext.Provider value={{ redirectPath, setRedirectPath }}>
      {children}
    </RedirectContext.Provider>
  );
};

export const useRedirect = () => useContext(RedirectContext);