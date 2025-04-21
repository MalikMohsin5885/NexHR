
import React from 'react';
import { cn } from '@/lib/utils';

interface SidebarHeaderProps {
  collapsed: boolean;
}

const SidebarHeader: React.FC<SidebarHeaderProps> = ({ collapsed }) => {
  return (
    <div className="sticky top-0 z-10 bg-white px-4 py-4 flex items-center border-b border-gray-100">
      <div className={cn("flex items-center space-x-2", collapsed ? "" : "mr-auto")}>
        <div className="h-7 w-7 bg-primary text-white rounded-md flex items-center justify-center">
          <span className="font-bold text-sm">N</span>
        </div>
        {!collapsed && (
          <span className="text-lg font-bold text-gray-800 tracking-tight">
            NEXHR
          </span>
        )}
      </div>
    </div>
  );
};

export default SidebarHeader;
