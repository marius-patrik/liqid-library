/**
 * PLC Core Types - Navigation Types
 * Type definitions for navigation components
 */

import type { PropsWithChildren, ReactNode } from 'react';

// ============================================
// NavigationMenu
// ============================================
export interface NavigationMenuItem {
	id: string;
	label: string;
	icon?: ReactNode;
	href?: string;
	component?: ReactNode;
	onClick?: () => void;
}

export interface NavigationMenuProps extends PropsWithChildren {
	items: NavigationMenuItem[];
	defaultActiveId?: string;
	onItemChange?: (itemId: string) => void;
	variant?: 'desktop' | 'app' | 'page' | 'sidebar';
	className?: string;
}

// ============================================
// SidebarNavigation
// ============================================
export interface SidebarNavigationItem {
	title: string;
	[key: string]: unknown;
}

export interface SidebarNavigationProps {
	items: SidebarNavigationItem[];
	activeItem: SidebarNavigationItem;
	onSelect: (item: SidebarNavigationItem) => void;
	sections?: string[];
	className?: string;
}
