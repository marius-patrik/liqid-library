/**
 * PLC Core Types - Layout Types
 * Type definitions for layout components (Header, Footer, Main, Sidebar, Shell)
 */

import type { HTMLAttributes, PropsWithChildren, ReactNode } from 'react';
import type { AppDefinition } from './desktop';
import type { NavigationMenuItem } from './navigation';

// ============================================
// Header
// ============================================
export type HeaderVariant = 'app' | 'desktop' | 'page' | 'sidebar';

export interface HeaderProps extends HTMLAttributes<HTMLDivElement> {
	variant?: HeaderVariant;
	showDarkModeToggle?: boolean;
}

// ============================================
// Footer
// ============================================
export type FooterVariant = 'app' | 'desktop' | 'page' | 'sidebar';

export interface FooterProps extends HTMLAttributes<HTMLDivElement> {
	hideByDefault?: boolean;
	variant?: FooterVariant;
}

// ============================================
// Main
// ============================================
export type MainVariant = 'app' | 'desktop' | 'page' | 'sidebar';

export interface MainProps extends HTMLAttributes<HTMLElement> {
	variant?: MainVariant;
	isScrollable?: boolean;
}

// ============================================
// Sidebar
// ============================================
export interface SidebarProps extends HTMLAttributes<HTMLElement> {
	isScrollable?: boolean;
}

// ============================================
// Shell
// ============================================
export type ShellVariant =
	| 'app'
	| 'desktop'
	| 'page'
	| 'sidebar'
	| 'web'
	| 'window';

export interface ShellItemProps extends PropsWithChildren {
	id: string;
	title: string;
	icon?: ReactNode;
}

export interface ShellProps {
	variant: ShellVariant;

	// Background
	backgroundImage?: string;
	backgroundOverlay?: string;

	// Desktop-specific props
	customApps?: AppDefinition[];

	// Web variant props
	url?: string;

	// Window variant props
	windowTitle?: ReactNode;
	windowHandleClose?: () => void;
	windowZIndex?: number;
	windowOnFocus?: () => void;
	windowState?: {
		position: { x: number; y: number };
		size: { width: number; height: number };
		isFullscreen: boolean;
		isMaximized: boolean;
		isDragging: boolean;
		isResizing: boolean;
	};
	onWindowStateChange?: (state: {
		position: { x: number; y: number };
		size: { width: number; height: number };
		isFullscreen: boolean;
		isMaximized: boolean;
		isDragging: boolean;
		isResizing: boolean;
	}) => void;

	// Component variants
	headerVariant?: HeaderVariant;
	footerVariant?: FooterVariant;
	mainVariant?: MainVariant;

	// Content props
	headerContent?: ReactNode;
	footerContent?: ReactNode;
	mainContent?: ReactNode;

	// Component props
	header?: ReactNode;
	footer?: ReactNode;
	main?: ReactNode;
	sidebar?: ReactNode;
	sidebarContent?: ReactNode;

	// Navigation (legacy props)
	menuItems?: NavigationMenuItem[];
	pages?: Record<string, ReactNode>;
	defaultPageId?: string;
	onPageChange?: (pageId: string) => void;

	// Navigation (new props)
	navigationItems?: NavigationMenuItem[];
	defaultActivePageId?: string;

	// Layout options
	isMainScrollable?: boolean;
	isScrollable?: boolean;
	isSidebarScrollable?: boolean;
}
