
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
        "block rounded-md px-3 py-2 text-sm transition-colors",
        isActive
          ? "text-primary font-medium"
          : "text-sidebar-foreground hover:bg-sidebar-accent"
      )}
    >
      {title}
    </Link>
  );
};

export default SidebarSubmenuItem;
