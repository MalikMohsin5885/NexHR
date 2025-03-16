
import React from 'react';
import { ChevronDown } from 'lucide-react';
import { cn } from '@/lib/utils';

interface SidebarFooterProps {
  collapsed: boolean;
}

const SidebarFooter: React.FC<SidebarFooterProps> = ({ collapsed }) => {
  return (
    <div className="sticky bottom-0 z-10 mt-auto border-t border-gray-100 bg-white p-3">
      <div className={cn(
        "flex items-center gap-3 rounded-md bg-blue-100 p-2",
        collapsed ? "justify-center" : "justify-between"
      )}>
        {!collapsed && (
          <>
            <div className="flex items-center gap-3">
              <div className="flex h-7 w-7 items-center justify-center rounded-full bg-blue-600 text-white font-semibold">
                W
              </div>
              <div className="space-y-0.5">
                <p className="text-sm font-medium text-gray-800">Webframe</p>
                <p className="text-xs text-gray-500">Assistant</p>
              </div>
            </div>
            <ChevronDown className="h-4 w-4 text-gray-500" />
          </>
        )}
        {collapsed && (
          <div className="flex h-7 w-7 items-center justify-center rounded-full bg-blue-600 text-white font-semibold">
            W
          </div>
        )}
      </div>
    </div>
  );
};

export default SidebarFooter;
