
import React, { useState, useEffect } from 'react';
import Sidebar from '@/components/Sidebar';
import { Link, useLocation } from 'react-router-dom';
import { Search, Calendar, Bell, ChevronDown, Plus, PanelLeft, PanelRight } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useIsMobile } from '@/hooks/use-mobile';

interface DashboardLayoutProps {
  children: React.ReactNode;
}

const DashboardLayout: React.FC<DashboardLayoutProps> = ({ children }) => {
  // Get stored sidebar state from localStorage or default to false (expanded)
  const storedSidebarState = localStorage.getItem('sidebarCollapsed');
  const [sidebarCollapsed, setSidebarCollapsed] = useState<boolean>(
    storedSidebarState ? JSON.parse(storedSidebarState) : false
  );
  const location = useLocation();
  const isMobile = useIsMobile();

  // Auto-collapse sidebar on mobile
  useEffect(() => {
    if (isMobile && !sidebarCollapsed) {
      setSidebarCollapsed(true);
    }
  }, [isMobile]);

  // Save sidebar state to localStorage when it changes
  useEffect(() => {
    localStorage.setItem('sidebarCollapsed', JSON.stringify(sidebarCollapsed));
  }, [sidebarCollapsed]);

  const navigationItems = [
    { label: 'Dashboard', path: '/' },
    { label: 'Calendar', path: '/calendar' },
    { label: 'Projects', path: '/projects' },
    { label: 'Team', path: '/team' },
    { label: 'Documents', path: '/documents' },
  ];

  const isActive = (path: string) => {
    if (path === '/' && location.pathname === '/') return true;
    if (path !== '/' && location.pathname.startsWith(path)) return true;
    return false;
  };

  return (
    <div className="flex h-screen overflow-hidden bg-gray-50">
      {/* Sidebar */}
      <Sidebar collapsed={sidebarCollapsed} setCollapsed={setSidebarCollapsed} />

      {/* Main Content */}
      <div className={cn(
        "flex flex-1 flex-col overflow-hidden transition-all duration-300",
        sidebarCollapsed ? "ml-[60px]" : "ml-[240px]",
        isMobile && "ml-0 md:ml-[60px]"
      )}>
        {/* Topbar */}
        <header className="bg-white border-b border-gray-100 sticky top-0 z-20">
          <div className="flex h-16 items-center px-4 md:px-6">
            {/* Sidebar collapse button outside sidebar */}
            <button 
              onClick={() => setSidebarCollapsed(!sidebarCollapsed)}
              className="mr-4 rounded-full p-2 text-gray-500 hover:bg-lavender hover:text-english-violet transition-colors"
            >
              {sidebarCollapsed ? <PanelRight size={18} /> : <PanelLeft size={18} />}
            </button>

            {/* Navigation */}
            <nav className="hidden md:flex space-x-1 flex-1">
              <ul className="flex space-x-1 overflow-x-auto pb-1 scrollbar-none">
                {navigationItems.map((item) => (
                  <li key={item.label}>
                    <Link
                      to={item.path}
                      className={cn(
                        "px-4 py-2 text-sm font-medium transition-colors rounded-full whitespace-nowrap",
                        isActive(item.path) 
                          ? "bg-primary text-white" 
                          : "text-gray-700 hover:bg-lavender hover:text-dark-purple-1"
                      )}
                    >
                      {item.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>

            {/* Search and User */}
            <div className="flex items-center gap-2 md:gap-4">
              <div className="relative hidden md:block">
                <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
                <input
                  type="search"
                  placeholder="Search..."
                  className="w-40 md:w-64 rounded-full border border-gray-200 bg-gray-50 pl-10 pr-4 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-gray-300"
                />
              </div>

              <button className="rounded-full p-2 text-gray-500 hover:bg-lavender hover:text-english-violet transition-colors">
                <Calendar className="h-5 w-5" />
              </button>

              <button className="rounded-full p-2 text-gray-500 hover:bg-lavender hover:text-english-violet transition-colors relative">
                <Bell className="h-5 w-5" />
                <span className="absolute top-1 right-1 h-2 w-2 rounded-full bg-red-500"></span>
              </button>

              <div className="flex items-center gap-2">
                <img
                  src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                  alt="User Profile"
                  className="h-8 w-8 rounded-full border border-gray-200 hover:opacity-90 transition-opacity"
                />
              </div>
            </div>
          </div>
        </header>

        {/* Page Content */}
        <main className="flex-1 overflow-auto p-3 md:p-6 pb-12">
          {children}
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;
