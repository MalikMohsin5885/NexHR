
import React, { useState } from 'react';
import Sidebar from '@/components/Sidebar';
import { Link, useLocation } from 'react-router-dom';
import { Search, Calendar, Bell, ChevronDown, Plus } from 'lucide-react';
import { cn } from '@/lib/utils';

interface DashboardLayoutProps {
  children: React.ReactNode;
}

const DashboardLayout: React.FC<DashboardLayoutProps> = ({ children }) => {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const location = useLocation();

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
    <div className="flex h-screen overflow-hidden bg-background">
      {/* Sidebar */}
      <Sidebar collapsed={sidebarCollapsed} setCollapsed={setSidebarCollapsed} />

      {/* Main Content */}
      <div className="flex flex-1 flex-col overflow-hidden">
        {/* Topbar */}
        <header className="bg-background border-b border-border/40">
          <div className="flex h-16 items-center px-6">
            {/* Navigation */}
            <nav className="hidden md:flex space-x-1 flex-1">
              <ul className="flex space-x-1">
                {navigationItems.map((item) => (
                  <li key={item.label}>
                    <Link
                      to={item.path}
                      className={cn(
                        "px-4 py-2 text-sm font-medium transition-colors rounded-full",
                        isActive(item.path) 
                          ? "bg-primary text-primary-foreground" 
                          : "text-foreground hover:bg-accent"
                      )}
                    >
                      {item.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>

            {/* Search and User */}
            <div className="flex items-center gap-4">
              <div className="relative hidden md:block">
                <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                <input
                  type="search"
                  placeholder="Search..."
                  className="w-64 rounded-full border border-input bg-background pl-10 pr-4 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                />
              </div>

              <button className="rounded-full p-2 text-muted-foreground hover:bg-accent">
                <Calendar className="h-5 w-5" />
              </button>

              <button className="rounded-full p-2 text-muted-foreground hover:bg-accent relative">
                <Bell className="h-5 w-5" />
                <span className="absolute top-1 right-1 h-2 w-2 rounded-full bg-primary"></span>
              </button>

              <div className="flex items-center gap-2">
                <img
                  src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                  alt="User Profile"
                  className="h-8 w-8 rounded-full border border-border/50 hover-scale"
                />
              </div>
            </div>
          </div>
        </header>

        {/* Page Content */}
        <main className="flex-1 overflow-auto p-6 pb-12">
          {children}
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;
