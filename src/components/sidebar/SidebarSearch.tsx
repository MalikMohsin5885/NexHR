
import React from 'react';
import { Search } from 'lucide-react';
import { cn } from '@/lib/utils';

interface SidebarSearchProps {
  collapsed: boolean;
}

const SidebarSearch: React.FC<SidebarSearchProps> = ({ collapsed }) => {
  return (
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
  );
};

export default SidebarSearch;
