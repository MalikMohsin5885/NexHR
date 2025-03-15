
import React from 'react';
import { Link } from 'react-router-dom';
import { ChevronDown, ChevronRight } from 'lucide-react';
import { cn } from '@/lib/utils';
import { SidebarMenuItem } from './types';
import SidebarSubmenuItem from './SidebarSubmenuItem';

interface SidebarItemProps {
  item: SidebarMenuItem;
  isActive: (path: string) => boolean;
  collapsed: boolean;
  openMenus: Record<string, boolean>;
  toggleMenu: (title: string) => void;
}

const SidebarItem: React.FC<SidebarItemProps> = ({
  item,
  isActive,
  collapsed,
  openMenus,
  toggleMenu,
}) => {
  const hasSubMenu = item.submenu && item.submenu.length > 0;
  const isOpen = openMenus[item.title] || false;
  const active = hasSubMenu 
    ? item.submenu?.some(subItem => isActive(subItem.path)) 
    : isActive(item.path);

  return (
    <div className={cn("mb-1", collapsed && "relative group")}>
      {/* Main menu item */}
      {hasSubMenu ? (
        <button
          onClick={() => !collapsed && toggleMenu(item.title)}
          className={cn(
            "w-full flex items-center py-2 px-3 rounded-md text-sm transition-colors",
            active 
              ? "text-sidebar-foreground font-medium bg-sidebar-accent/10" 
              : "text-sidebar-foreground/70 hover:text-sidebar-foreground hover:bg-sidebar-accent/5",
            collapsed ? "justify-center" : "justify-between"
          )}
        >
          <div className="flex items-center gap-3">
            <span className={cn(
              "flex items-center justify-center w-5 h-5",
              active && "text-primary"
            )}>
              {React.createElement(item.icon)}
            </span>
            {!collapsed && <span>{item.title}</span>}
          </div>
          
          {!collapsed && hasSubMenu && (
            <ChevronDown
              size={16}
              className={cn(
                "transition-transform",
                isOpen ? "transform rotate-180" : ""
              )}
            />
          )}
          
          {/* Submenu dropdown for collapsed sidebar */}
          {collapsed && hasSubMenu && (
            <div className="absolute left-full top-0 ml-2 w-48 bg-white shadow-lg rounded-md py-2 z-50 hidden group-hover:block">
              <div className="py-1 px-3 font-medium border-b border-sidebar-border mb-1">
                {item.title}
              </div>
              {item.submenu?.map((subItem) => (
                <Link
                  key={subItem.title}
                  to={subItem.path}
                  className={cn(
                    "flex items-center px-3 py-2 text-sm hover:bg-sidebar-accent/10",
                    isActive(subItem.path) && "bg-sidebar-accent/20 font-medium text-primary"
                  )}
                >
                  {subItem.title}
                </Link>
              ))}
            </div>
          )}
        </button>
      ) : (
        <Link
          to={item.path}
          className={cn(
            "flex items-center py-2 px-3 rounded-md text-sm transition-colors",
            active 
              ? "text-sidebar-foreground font-medium bg-sidebar-accent/10" 
              : "text-sidebar-foreground/70 hover:text-sidebar-foreground hover:bg-sidebar-accent/5",
            collapsed && "justify-center"
          )}
        >
          <span className={cn(
            "flex items-center justify-center w-5 h-5",
            active && "text-primary"
          )}>
            {React.createElement(item.icon)}
          </span>
          {!collapsed && <span className="ml-3">{item.title}</span>}
        </Link>
      )}

      {/* Submenu items for expanded sidebar */}
      {!collapsed && hasSubMenu && isOpen && (
        <div className="ml-2 pl-4 border-l border-sidebar-border/40 mt-1 space-y-1">
          {item.submenu?.map((subItem) => (
            <SidebarSubmenuItem
              key={subItem.title}
              item={subItem}
              isActive={isActive}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default SidebarItem;
