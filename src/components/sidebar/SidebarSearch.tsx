
import React from 'react';
import { Search, Filter } from 'lucide-react';
import { cn } from '@/lib/utils';

interface SidebarSearchProps {
  collapsed: boolean;
}

const SidebarSearch: React.FC<SidebarSearchProps> = ({ collapsed }) => {
  return (
    <div className="px-3 py-2">
      {!collapsed ? (
        <div className="flex items-center gap-2 px-2 py-1.5 bg-gray-100 rounded-md">
          <Search className="h-4 w-4 text-muted-foreground" />
          <input
            type="text"
            placeholder="Search..."
            className="bg-transparent outline-none text-sm flex-1 text-muted-foreground"
          />
          <button className="text-muted-foreground">
            <Filter className="h-4 w-4" />
          </button>
        </div>
      ) : (
        <div className={cn(
          "flex items-center justify-center",
          "h-8 w-full rounded-md bg-gray-100 p-1.5"
        )}>
          <Search className="h-4 w-4 text-muted-foreground" />
        </div>
      )}
    </div>
  );
};

export default SidebarSearch;
