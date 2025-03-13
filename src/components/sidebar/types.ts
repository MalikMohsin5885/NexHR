
import { ElementType } from 'react';

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
