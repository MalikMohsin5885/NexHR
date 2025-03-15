
import React from 'react';
import { Link } from 'react-router-dom';
import { cn } from '@/lib/utils';

interface SidebarSubmenuItemProps {
  title: string;
  path: string;
  isActive: boolean;
}

const SidebarSubmenuItem: React.FC<SidebarSubmenuItemProps> = ({ 
  title, 
  path, 
  isActive 
}) => {
  return (
    <Link
      to={path}
      className={cn(
        "block rounded-md py-2 px-2 text-sm transition-colors relative",
        isActive
          ? "text-primary font-medium"
          : "text-sidebar-foreground hover:bg-sidebar-accent"
      )}
    >
      <div className="flex items-center">
        {/* Circular indicator that appears when active */}
        {isActive && (
          <span className="absolute left-[-14px] top-1/2 transform -translate-y-1/2 w-2 h-2 rounded-full bg-primary"></span>
        )}
        <span>{title}</span>
      </div>
    </Link>
  );
};

export default SidebarSubmenuItem;
