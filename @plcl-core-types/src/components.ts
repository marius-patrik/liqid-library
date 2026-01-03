/**
 * PLC Core Types - Component Types
 * Type definitions for all PLC Core components
 */

import type {
	BlockquoteHTMLAttributes,
	ButtonHTMLAttributes,
	ElementType,
	HTMLAttributes,
	InputHTMLAttributes,
	ReactNode,
	SelectHTMLAttributes,
	TextareaHTMLAttributes,
} from 'react';
import type { Radius, Size, Spacing, StylingProps } from './styles';

// ============================================
// Button
// ============================================
export type ButtonVariant =
	| 'glass'
	| 'glass-highlight'
	| 'icon'
	| 'text'
	| 'outline';
export type ButtonType = 'button' | 'link';

export interface ButtonProps
	extends Omit<ButtonHTMLAttributes<HTMLButtonElement>, 'type'>,
		StylingProps {
	variant?: ButtonVariant;
	as?: ButtonType;
	href?: string;
}

// ============================================
// Alert
// ============================================
export type AlertVariant = 'light' | 'filled' | 'outline' | 'transparent';

export interface AlertProps
	extends Omit<HTMLAttributes<HTMLDivElement>, 'title' | 'color'>,
		StylingProps {
	title?: ReactNode;
	variant?: AlertVariant;
	icon?: ReactNode;
	withCloseButton?: boolean;
	onClose?: () => void;
	color?: string;
}

// ============================================
// Avatar
// ============================================
export interface AvatarProps
	extends HTMLAttributes<HTMLDivElement>,
		StylingProps {
	src?: string;
	alt?: string;
	initials?: string;
}

// ============================================
// Badge
// ============================================
export type BadgeVariant = 'filled' | 'light' | 'outline' | 'dot';

export interface BadgeProps
	extends HTMLAttributes<HTMLDivElement>,
		StylingProps {
	variant?: BadgeVariant;
	leftSection?: ReactNode;
	rightSection?: ReactNode;
	fullWidth?: boolean;
	color?: string;
}

// ============================================
// Kbd
// ============================================
export interface KbdProps extends HTMLAttributes<HTMLElement>, StylingProps {}

// ============================================
// Code
// ============================================
export interface CodeProps extends HTMLAttributes<HTMLElement>, StylingProps {
	block?: boolean;
	color?: string;
}

// ============================================
// Blockquote
// ============================================
export interface BlockquoteProps
	extends BlockquoteHTMLAttributes<HTMLQuoteElement>,
		StylingProps {
	icon?: ReactNode;
	cite?: string;
	color?: string;
}

// ============================================
// Checkbox
// ============================================
export interface CheckboxProps
	extends Omit<InputHTMLAttributes<HTMLInputElement>, 'size'>,
		StylingProps {
	label?: ReactNode;
	description?: ReactNode;
	error?: ReactNode;
	indeterminate?: boolean;
}

// ============================================
// Input
// ============================================
export interface InputProps
	extends Omit<InputHTMLAttributes<HTMLInputElement>, 'size'>,
		StylingProps {
	variant?: 'filled' | 'unstyled';
	error?: boolean | ReactNode;
	leftSection?: ReactNode;
	rightSection?: ReactNode;
	wrapperProps?: InputHTMLAttributes<HTMLDivElement>;
}

// ============================================
// Textarea
// ============================================
export interface TextareaProps
	extends TextareaHTMLAttributes<HTMLTextAreaElement>,
		StylingProps {
	variant?: 'filled' | 'unstyled';
	error?: boolean | ReactNode;
	autosize?: boolean;
	minRows?: number;
	maxRows?: number;
}

// ============================================
// PasswordInput
// ============================================
export interface PasswordInputProps extends Omit<InputProps, 'type'> {
	visibilityToggleIcon?: (visible: boolean) => ReactNode;
}

// ============================================
// NumberInput
// ============================================
export interface NumberInputProps extends InputProps {
	min?: number;
	max?: number;
	step?: number;
	hideControls?: boolean;
}

// ============================================
// Radio
// ============================================
export interface RadioProps
	extends Omit<InputHTMLAttributes<HTMLInputElement>, 'size'>,
		StylingProps {
	label?: ReactNode;
	description?: ReactNode;
	error?: ReactNode;
}

// ============================================
// Select
// ============================================
export interface SelectItem {
	value: string;
	label: string;
	disabled?: boolean;
}

export interface SelectProps
	extends Omit<SelectHTMLAttributes<HTMLSelectElement>, 'size'>,
		StylingProps {
	data?: (string | SelectItem)[];
	label?: ReactNode;
	description?: ReactNode;
	error?: ReactNode;
	variant?: 'filled' | 'unstyled';
	leftSection?: ReactNode;
	rightSection?: ReactNode;
}

// ============================================
// SegmentedControl
// ============================================
export interface SegmentedControlItem {
	value: string;
	label: ReactNode;
	disabled?: boolean;
}

export interface SegmentedControlProps
	extends Omit<HTMLAttributes<HTMLDivElement>, 'onChange'>,
		StylingProps {
	data: (string | SegmentedControlItem)[];
	value?: string;
	defaultValue?: string;
	onChange?: (value: string) => void;
	fullWidth?: boolean;
	color?: string;
	name?: string;
}

// ============================================
// Slider
// ============================================
export interface SliderProps
	extends Omit<InputHTMLAttributes<HTMLInputElement>, 'size'>,
		StylingProps {
	color?: string;
	label?: ReactNode;
	marks?: { value: number; label?: ReactNode }[];
	size?: Size;
}

// ============================================
// Switch
// ============================================
export interface SwitchProps
	extends Omit<InputHTMLAttributes<HTMLInputElement>, 'size'>,
		StylingProps {
	label?: ReactNode;
	description?: ReactNode;
	error?: ReactNode;
	onLabel?: ReactNode;
	offLabel?: ReactNode;
}

// ============================================
// Card
// ============================================
export type CardVariant =
	| 'glass'
	| 'glass-highlight'
	| 'flat'
	| 'outline'
	| 'unstyled';

export interface CardProps
	extends HTMLAttributes<HTMLDivElement>,
		StylingProps {
	variant?: CardVariant;
	header?: ReactNode;
	footer?: ReactNode;
}

// ============================================
// Accordion
// ============================================
export interface AccordionProps extends StylingProps {
	id?: string;
	value?: string;
	defaultValue?: string;
	onChange?: (value: string) => void;
	children: ReactNode;
	variant?: 'default' | 'contained' | 'filled' | 'separated';
	radius?: Radius;
	className?: string;
}

// ============================================
// Progress
// ============================================
export interface ProgressProps
	extends HTMLAttributes<HTMLDivElement>,
		StylingProps {
	value: number;
	color?: string;
	striped?: boolean;
	animated?: boolean;
}

// ============================================
// Loading
// ============================================
export type LoadingVariant = 'bar' | 'spinner';

export interface LoadingProps {
	variant?: LoadingVariant;
}

// ============================================
// Skeleton
// ============================================
export interface SkeletonProps
	extends HTMLAttributes<HTMLDivElement>,
		StylingProps {
	visible?: boolean;
	height?: number | string;
	width?: number | string;
	circle?: boolean;
	animate?: boolean;
}

// ============================================
// Tabs
// ============================================
export interface TabsProps extends StylingProps {
	id?: string;
	defaultValue?: string;
	value?: string;
	onChange?: (value: string) => void;
	color?: string;
	variant?: 'default' | 'outline' | 'pills';
	radius?: Radius;
	children: ReactNode;
	className?: string;
}

// ============================================
// Menu
// ============================================
export interface MenuProps extends StylingProps {
	closeOnItemClick?: boolean;
	trigger?: 'click' | 'hover';
	children?: ReactNode;
	className?: string;
	id?: string;
}

// ============================================
// Burger
// ============================================
export interface BurgerProps
	extends HTMLAttributes<HTMLButtonElement>,
		StylingProps {
	opened: boolean;
	size?: Size;
}

// ============================================
// Drawer
// ============================================
export interface DrawerProps
	extends Omit<HTMLAttributes<HTMLDivElement>, 'title'> {
	isOpen: boolean;
	onClose: () => void;
	title?: ReactNode;
	position?: 'left' | 'right' | 'top' | 'bottom';
	size?: string | number;
	padding?: string;
	overlay?: boolean;
}

// ============================================
// Popover
// ============================================
export interface PopoverProps extends StylingProps {
	id?: string;
	target: ReactNode;
	dropdown?: ReactNode;
	children?: ReactNode;
	opened?: boolean;
	onChange?: (opened: boolean) => void;
	position?: 'bottom' | 'top' | 'left' | 'right';
	withArrow?: boolean;
	width?: number | string;
	trapFocus?: boolean;
	closeOnClickOutside?: boolean;
}

// ============================================
// Tooltip
// ============================================
export interface TooltipProps extends StylingProps {
	id?: string;
	label: ReactNode;
	children: ReactNode;
	position?: 'top' | 'right' | 'bottom' | 'left';
	withArrow?: boolean;
	opened?: boolean;
}

// ============================================
// Modal
// ============================================
export interface ModalProps extends HTMLAttributes<HTMLDivElement> {
	isOpen: boolean;
	onClose: () => void;
	onSave?: () => void;
	closeButton?: ReactNode;
	saveButton?: ReactNode;
}

// ============================================
// Box
// ============================================
export interface BoxProps
	extends Omit<HTMLAttributes<HTMLDivElement>, 'title'>,
		StylingProps {
	title?: ReactNode;
	buttons?: ReactNode;
}

// ============================================
// Container
// ============================================
export interface ContainerProps
	extends HTMLAttributes<HTMLDivElement>,
		StylingProps {
	fluid?: boolean;
}

// ============================================
// Divider
// ============================================
export interface DividerProps
	extends HTMLAttributes<HTMLDivElement>,
		StylingProps {
	orientation?: 'horizontal' | 'vertical';
	label?: ReactNode;
	labelPosition?: 'left' | 'center' | 'right';
	color?: string;
}

// ============================================
// Grid
// ============================================
export type GridCols = 1 | 2 | 3 | 4;
export type GridGap = Spacing | 'none';

export interface GridProps
	extends HTMLAttributes<HTMLDivElement>,
		StylingProps {
	cols?: GridCols;
	gap?: GridGap;
}

// ============================================
// Flex
// ============================================
export type FlexDirection = 'row' | 'col';
export type FlexJustify = 'start' | 'center' | 'end' | 'between';
export type FlexAlign = 'start' | 'center' | 'end' | 'stretch';
export type FlexGap = Spacing | 'none';

export interface FlexProps
	extends HTMLAttributes<HTMLDivElement>,
		StylingProps {
	direction?: FlexDirection;
	justify?: FlexJustify;
	align?: FlexAlign;
	gap?: FlexGap;
	wrap?: boolean;
}

// ============================================
// Stack
// ============================================
export type StackGap = Spacing | 'none';

export interface StackProps
	extends HTMLAttributes<HTMLDivElement>,
		StylingProps {
	gap?: StackGap;
}

// ============================================
// Group
// ============================================
export type GroupGap = Spacing | 'none';

export interface GroupProps
	extends HTMLAttributes<HTMLDivElement>,
		StylingProps {
	gap?: GroupGap;
}

// ============================================
// AppIcon
// ============================================
export type AppIconProps = HTMLAttributes<HTMLButtonElement> &
	StylingProps & {
		name?: string;
		icon: ReactNode;
		showTitle?: boolean;
	};

// ============================================
// Text
// ============================================
export interface TextProps extends HTMLAttributes<HTMLElement>, StylingProps {
	variant?: 'text' | 'link' | 'gradient';
	dimmed?: boolean;
	gradient?: { from: string; to: string; deg?: number };
	span?: boolean;
	fw?: number | string;
	component?: ElementType;
	truncate?: boolean;
	lineClamp?: number;
	align?: 'left' | 'center' | 'right' | 'justify';
}

// ============================================
// Title
// ============================================
export type TitleOrder = 1 | 2 | 3 | 4 | 5 | 6;

export interface TitleProps
	extends HTMLAttributes<HTMLHeadingElement>,
		StylingProps {
	order?: TitleOrder;
}
