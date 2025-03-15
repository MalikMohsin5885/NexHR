
import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import { cn } from '@/lib/utils';
import { SidebarProps } from './types';
import { sidebarItems } from './sidebarItems';
import SidebarHeader from './SidebarHeader';
import SidebarSearch from './SidebarSearch';
import SidebarItem from './SidebarItem';
import SidebarFooter from './SidebarFooter';

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
      collapsed ? "w-[60px]" : "w-[240px]"
    )}>
      <SidebarHeader collapsed={collapsed} setCollapsed={setCollapsed} />
      <SidebarSearch collapsed={collapsed} />
      
      <nav className={cn(
        "flex-1 px-2 py-2 space-y-1",
        collapsed && "px-1"
      )}>
        {sidebarItems.map((item) => (
          <SidebarItem
            key={item.title}
            item={item}
            isActive={isActive}
            collapsed={collapsed}
            openMenus={openMenus}
            toggleMenu={toggleMenu}
          />
        ))}
      </nav>

      <SidebarFooter collapsed={collapsed} />
    </aside>
  );
};

export default Sidebar;
