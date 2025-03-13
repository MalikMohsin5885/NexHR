
import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { 
  LayoutDashboard, 
  Users, 
  Clock, 
  CheckSquare, 
  Briefcase, 
  FileText, 
  DollarSign, 
  Search, 
  ChevronDown, 
  ChevronRight, 
  Settings, 
  LifeBuoy,
  PanelRight,
  PanelLeft,
  Home
} from 'lucide-react';
import { cn } from '@/lib/utils';

type SidebarItemType = {
  title: string;
  path: string;
  icon: React.ElementType;
  children?: { title: string; path: string }[];
};

const sidebarItems: SidebarItemType[] = [
  {
    title: 'Dashboard',
    path: '/',
    icon: Home,
  },
  {
    title: 'Teams',
    path: '/teams',
    icon: Users,
    children: [
      { title: 'Employees', path: '/employees' },
      { title: 'Attendance', path: '/attendance' },
      { title: 'Checklist', path: '/checklist' },
      { title: 'Time off', path: '/time-off' },
    ],
  },
  {
    title: 'Hiring',
    path: '/hiring',
    icon: Briefcase,
    children: [
      { title: 'Onboarding', path: '/onboarding' },
      { title: 'Hiring handbook', path: '/hiring-handbook' },
    ],
  },
  {
    title: 'Finance',
    path: '/finance',
    icon: DollarSign,
    children: [
      { title: 'Payroll', path: '/payroll' },
      { title: 'Expenses', path: '/expenses' },
      { title: 'Invoices', path: '/invoices' },
      { title: 'Payment information', path: '/payment-information' },
    ],
  },
  {
    title: 'Settings',
    path: '/settings',
    icon: Settings,
  },
  {
    title: 'Integrations',
    path: '/integrations',
    icon: PanelRight,
  },
  {
    title: 'Help and support',
    path: '/support',
    icon: LifeBuoy,
  },
];

interface SidebarProps {
  collapsed: boolean;
  setCollapsed: (collapsed: boolean) => void;
}

const Sidebar: React.FC<SidebarProps> = ({ collapsed, setCollapsed }) => {
  const location = useLocation();
  const [openMenus, setOpenMenus] = useState<Record<string, boolean>>({
    'Teams': true,
    'Hiring': false,
    'Finance': false,
  });

  const toggleMenu = (title: string) => {
    setOpenMenus(prev => ({
      ...prev,
      [title]: !prev[title]
    }));
  };

  const isActive = (path: string) => {
    return location.pathname === path;
  };

  return (
    <aside className={cn(
      "flex h-screen flex-col overflow-y-auto bg-sidebar border-r border-sidebar-border transition-all duration-300 ease-in-out",
      collapsed ? "w-[70px]" : "w-[250px]"
    )}>
      <div className="sticky top-0 z-10 bg-sidebar px-4 py-5 flex items-center justify-between">
        {!collapsed && (
          <span className="text-lg font-bold uppercase text-sidebar-foreground">
            HRISELNIK
          </span>
        )}
        {collapsed && (
          <span className="mx-auto text-xl font-bold text-primary">
            H
          </span>
        )}
        <button
          onClick={() => setCollapsed(!collapsed)}
          className={cn(
            "rounded-md p-1.5 text-sidebar-foreground hover:bg-sidebar-accent",
            collapsed && "mx-auto"
          )}
        >
          {collapsed ? <PanelRight size={18} /> : <PanelLeft size={18} />}
        </button>
      </div>
      
      <div className={cn("p-3", collapsed ? "hidden" : "block")}>
        <div className="relative w-full">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <input
            type="search"
            placeholder="Search..."
            className="w-full rounded-full border border-input bg-background py-2 pl-9 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
          />
        </div>
      </div>

      <nav className="flex-1 px-2 py-3 space-y-1">
        {sidebarItems.map((item) => (
          <div key={item.title} className="mb-0.5">
            {item.children ? (
              <>
                <button
                  onClick={() => toggleMenu(item.title)}
                  className={cn(
                    "flex w-full items-center justify-between rounded-md px-3 py-2 text-sm transition-colors",
                    isActive(item.path) ? "sidebar-link-active" : "sidebar-link-inactive",
                    collapsed && "justify-center"
                  )}
                >
                  <div className="flex items-center">
                    <item.icon className={cn("h-5 w-5", collapsed && "mx-auto")} />
                    {!collapsed && <span className="ml-3">{item.title}</span>}
                  </div>
                  {!collapsed && (
                    <div className="opacity-75">
                      {openMenus[item.title] ? (
                        <ChevronDown className="h-4 w-4" />
                      ) : (
                        <ChevronRight className="h-4 w-4" />
                      )}
                    </div>
                  )}
                </button>
                {!collapsed && openMenus[item.title] && (
                  <div className="mt-1 space-y-1 pl-10">
                    {item.children.map((child) => (
                      <Link
                        key={child.title}
                        to={child.path}
                        className={cn(
                          "block rounded-md px-3 py-2 text-sm transition-colors",
                          isActive(child.path)
                            ? "text-primary font-medium"
                            : "text-sidebar-foreground hover:bg-sidebar-accent"
                        )}
                      >
                        {child.title}
                      </Link>
                    ))}
                  </div>
                )}
              </>
            ) : (
              <Link
                to={item.path}
                className={cn(
                  "sidebar-link",
                  isActive(item.path) ? "sidebar-link-active" : "sidebar-link-inactive",
                  collapsed && "justify-center"
                )}
              >
                <item.icon className="h-5 w-5" />
                {!collapsed && <span>{item.title}</span>}
              </Link>
            )}
          </div>
        ))}
      </nav>

      <div className="sticky bottom-0 z-10 mt-auto border-t border-sidebar-border bg-sidebar p-3">
        <div className={cn(
          "flex items-center gap-3 rounded-md bg-sidebar-accent/50 p-2",
          collapsed ? "justify-center" : "justify-between"
        )}>
          {!collapsed && (
            <>
              <div className="flex items-center gap-3">
                <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary text-primary-foreground font-semibold">
                  W
                </div>
                <div className="space-y-0.5">
                  <p className="text-sm font-medium">Webframe</p>
                  <p className="text-xs text-muted-foreground">Assistant</p>
                </div>
              </div>
              <ChevronDown className="h-4 w-4 opacity-70" />
            </>
          )}
          {collapsed && (
            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary text-primary-foreground font-semibold">
              W
            </div>
          )}
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;
