
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

export type SidebarItemType = {
  title: string;
  path: string;
  icon: ElementType;
  children?: { title: string; path: string }[];
};

export interface SidebarProps {
  collapsed: boolean;
  setCollapsed: (collapsed: boolean) => void;
}
