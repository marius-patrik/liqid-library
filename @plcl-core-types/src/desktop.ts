/**
 * PLC Core Types - Desktop Types
 * Type definitions for desktop/window management
 */

import type { ReactNode } from 'react';

export interface WindowState {
	position: { x: number; y: number };
	size: { width: number; height: number };
	isFullscreen: boolean;
	isMaximized: boolean;
	isDragging: boolean;
	isResizing: boolean;
}

export interface AppWindowProps {
	isOpen: boolean;
	handleClose: () => void;
	zIndex: number;
	onFocus: () => void;
	resetKey?: number;
	title?: ReactNode;
	windowState?: WindowState;
	onWindowStateChange?: (state: WindowState) => void;
}

export interface AppDefinition {
	id: string;
	title: string;
	icon: ReactNode;
	Component: React.ComponentType<AppWindowProps>;
}
