
import { ElementType } from 'react';

export type SidebarSubmenu = {
  title: string;
  path: string;
};

export type SidebarMenuItem = {
  title: string;
  path: string;
  icon: ElementType;
  submenu?: SidebarSubmenu[];
};

export interface SidebarProps {
  collapsed: boolean;
  setCollapsed: (collapsed: boolean) => void;
}
