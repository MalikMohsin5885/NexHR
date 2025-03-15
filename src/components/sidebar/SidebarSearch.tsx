
import React from 'react';
import { Search } from 'lucide-react';
import { cn } from '@/lib/utils';

interface SidebarSearchProps {
  collapsed: boolean;
}

const SidebarSearch: React.FC<SidebarSearchProps> = ({ collapsed }) => {
  return (
    <div className={cn(
      "py-2 px-3", 
      collapsed ? "flex justify-center" : ""
    )}>
      {collapsed ? (
        <button className="w-8 h-8 flex items-center justify-center rounded-md text-sidebar-foreground/60 hover:text-sidebar-foreground hover:bg-sidebar-accent/30 transition-colors">
          <Search size={16} />
        </button>
      ) : (
        <div className="relative">
          <Search className="absolute left-3 top-2.5 h-4 w-4 text-sidebar-foreground/50" />
          <input
            type="text"
            placeholder="Search..."
            className="w-full h-9 pl-10 pr-3 text-sm bg-sidebar-accent/20 border border-transparent rounded-md text-sidebar-foreground placeholder-sidebar-foreground/40 focus:outline-none focus:bg-sidebar-accent/30 focus:border-sidebar-border"
          />
        </div>
      )}
    </div>
  );
};

export default SidebarSearch;
