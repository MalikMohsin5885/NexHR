
import React from 'react';
import { PanelRight, PanelLeft } from 'lucide-react';
import { cn } from '@/lib/utils';

interface SidebarHeaderProps {
  collapsed: boolean;
  setCollapsed: (collapsed: boolean) => void;
}

const SidebarHeader: React.FC<SidebarHeaderProps> = ({ collapsed, setCollapsed }) => {
  return (
    <div className="sticky top-0 z-10 bg-sidebar px-4 py-4 flex items-center justify-between">
      {!collapsed && (
        <div className="flex items-center space-x-2">
          <div className="h-8 w-8 bg-black text-white rounded-md flex items-center justify-center">
            <span className="font-bold text-sm">H</span>
          </div>
          <span className="text-lg font-bold text-sidebar-foreground tracking-tight">
            HRISELNIK
          </span>
        </div>
      )}
      {collapsed && (
        <div className="mx-auto h-8 w-8 bg-black text-white rounded-md flex items-center justify-center">
          <span className="font-bold text-sm">H</span>
        </div>
      )}
      <button
        onClick={() => setCollapsed(!collapsed)}
        className={cn(
          "rounded-md p-1.5 text-sidebar-foreground hover:bg-sidebar-accent",
          collapsed && "mx-auto mt-4"
        )}
      >
        {collapsed ? <PanelRight size={18} /> : <PanelLeft size={18} />}
      </button>
    </div>
  );
};

export default SidebarHeader;
