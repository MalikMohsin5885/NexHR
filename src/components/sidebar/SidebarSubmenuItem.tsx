
import React from 'react';
import { Link } from 'react-router-dom';
import { cn } from '@/lib/utils';
import { SidebarSubmenu } from './types';

interface SidebarSubmenuItemProps {
  item: SidebarSubmenu;
  isActive: (path: string) => boolean;
}

const SidebarSubmenuItem: React.FC<SidebarSubmenuItemProps> = ({ item, isActive }) => {
  const active = isActive(item.path);
  
  return (
    <Link
      to={item.path}
      className={cn(
        "relative flex items-center py-1.5 pl-2 text-sm rounded-sm transition-colors hover:text-gray-900 group",
        active 
          ? "text-gray-900 font-medium" 
          : "text-gray-600"
      )}
    >
      {/* Active indicator line */}
      {active && (
        <span className="absolute left-[-1.25rem] w-[2px] h-full bg-gray-400" />
      )}
      <span className="truncate">{item.title}</span>
    </Link>
  );
};

export default SidebarSubmenuItem;
