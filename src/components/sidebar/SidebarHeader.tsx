
import React from 'react';
import { PanelRight, PanelLeft } from 'lucide-react';
import { cn } from '@/lib/utils';

interface SidebarHeaderProps {
  collapsed: boolean;
  setCollapsed: (collapsed: boolean) => void;
}

const SidebarHeader: React.FC<SidebarHeaderProps> = ({ collapsed, setCollapsed }) => {
  return (
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
  );
};

export default SidebarHeader;
