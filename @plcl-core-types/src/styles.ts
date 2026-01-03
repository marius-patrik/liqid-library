/**
 * PLC Core Types - Styling Types
 * Base styling types used across all components
 */

export type Size = 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl' | '3xl';
export type Spacing = 'none' | Size;
export type Radius = 'none' | Size | 'full';
export type Shadow = 'none' | Size;
export type Variant =
	| 'glass'
	| 'glass-highlight'
	| 'flat'
	| 'outline'
	| 'transparent'
	| 'unstyled';

export interface StylingProps {
	variant?: Variant | string;
	m?: Spacing;
	mt?: Spacing;
	mb?: Spacing;
	ml?: Spacing;
	mr?: Spacing;
	mx?: Spacing;
	my?: Spacing;
	p?: Spacing;
	pt?: Spacing;
	pb?: Spacing;
	pl?: Spacing;
	pr?: Spacing;
	px?: Spacing;
	py?: Spacing;
	radius?: Radius;
	shadow?: Shadow;
	size?: Size;
	className?: string;
}
