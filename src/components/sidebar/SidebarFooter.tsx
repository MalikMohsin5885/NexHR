
import React from 'react';
import { ChevronDown } from 'lucide-react';
import { cn } from '@/lib/utils';

interface SidebarFooterProps {
  collapsed: boolean;
}

const SidebarFooter: React.FC<SidebarFooterProps> = ({ collapsed }) => {
  return (
    <div className="sticky bottom-0 z-10 mt-auto border-t border-sidebar-border bg-sidebar p-3">
      <div className={cn(
        "flex items-center gap-3 rounded-md bg-sidebar-accent/50 p-2",
        collapsed ? "justify-center" : "justify-between"
      )}>
        {!collapsed && (
          <>
            <div className="flex items-center gap-3">
              <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary text-primary-foreground font-semibold">
                W
              </div>
              <div className="space-y-0.5">
                <p className="text-sm font-medium">Webframe</p>
                <p className="text-xs text-muted-foreground">Assistant</p>
              </div>
            </div>
            <ChevronDown className="h-4 w-4 opacity-70" />
          </>
        )}
        {collapsed && (
          <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary text-primary-foreground font-semibold">
            W
          </div>
        )}
      </div>
    </div>
  );
};

export default SidebarFooter;
