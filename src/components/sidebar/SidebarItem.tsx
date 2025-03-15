
import React from 'react';
import { Link } from 'react-router-dom';
import { ChevronDown, ChevronRight } from 'lucide-react';
import { cn } from '@/lib/utils';
import { SidebarItemType } from './types';
import SidebarSubmenuItem from './SidebarSubmenuItem';

interface SidebarItemProps {
  item: SidebarItemType;
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
  if (item.children) {
    return (
      <div className="mb-1">
        <button
          onClick={() => toggleMenu(item.title)}
          className={cn(
            "flex w-full items-center justify-between rounded-md px-3 py-2 text-sm transition-colors",
            isActive(item.path) ? "sidebar-link-active" : "sidebar-link-inactive",
            collapsed && "justify-center"
          )}
        >
          <div className="flex items-center">
            <item.icon className={cn("h-5 w-5", collapsed && "mx-auto")} />
            {!collapsed && <span className="ml-3">{item.title}</span>}
          </div>
          {!collapsed && (
            <div className="opacity-75">
              {openMenus[item.title] ? (
                <ChevronDown className="h-4 w-4" />
              ) : (
                <ChevronRight className="h-4 w-4" />
              )}
            </div>
          )}
        </button>
        {!collapsed && openMenus[item.title] && (
          <div className="mt-1 space-y-1 pl-4">
            <div className="relative">
              {/* Vertical line for submenu */}
              <div className="absolute left-[9px] top-0 bottom-0 w-[1.5px] bg-gray-200 dark:bg-gray-700"></div>
              <div className="ml-4 space-y-1">
                {item.children.map((child) => (
                  <SidebarSubmenuItem
                    key={child.title}
                    title={child.title}
                    path={child.path}
                    isActive={isActive(child.path)}
                  />
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    );
  }

  return (
    <div className="mb-1">
      <Link
        to={item.path}
        className={cn(
          "sidebar-link",
          isActive(item.path) ? "sidebar-link-active" : "sidebar-link-inactive",
          collapsed && "justify-center"
        )}
      >
        <item.icon className="h-5 w-5" />
        {!collapsed && <span className="ml-3">{item.title}</span>}
      </Link>
    </div>
  );
};

export default SidebarItem;
