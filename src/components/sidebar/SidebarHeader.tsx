
import React from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { cn } from '@/lib/utils';

interface SidebarHeaderProps {
  collapsed: boolean;
  setCollapsed: (collapsed: boolean) => void;
}

const SidebarHeader: React.FC<SidebarHeaderProps> = ({ collapsed, setCollapsed }) => {
  return (
    <div className="sticky top-0 z-10 bg-white px-4 py-4 flex items-center justify-between border-b border-gray-100">
      <div className="flex items-center space-x-2">
        <div className="h-7 w-7 bg-primary text-white rounded-md flex items-center justify-center">
          <span className="font-bold text-sm">N</span>
        </div>
        {!collapsed && (
          <span className="text-lg font-bold text-gray-800 tracking-tight">
            NEXHR
          </span>
        )}
      </div>
      <button
        onClick={() => setCollapsed(!collapsed)}
        className={cn(
          "rounded-sm p-1 text-gray-500 hover:bg-lavender hover:text-english-violet opacity-70 hover:opacity-100 transition-opacity",
          !collapsed ? "" : "ml-auto"
        )}
        aria-label={collapsed ? "Expand sidebar" : "Collapse sidebar"}
      >
        {collapsed ? <ChevronRight size={16} /> : <ChevronLeft size={16} />}
      </button>
    </div>
  );
};

export default SidebarHeader;
