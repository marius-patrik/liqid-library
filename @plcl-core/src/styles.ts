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
	variant?: Variant | string; // Allow string for component-specific variants
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

const sizeToTailwindMap: Record<Size, string> = {
	xs: '0.5',
	sm: '2',
	md: '4',
	lg: '6',
	xl: '8',
	'2xl': '12',
	'3xl': '16',
};

const radiusToTailwind: Record<Radius, string> = {
	none: 'rounded-none',
	xs: 'rounded-sm',
	sm: 'rounded',
	md: 'rounded-md',
	lg: 'rounded-lg',
	xl: 'rounded-xl',
	'2xl': 'rounded-2xl',
	'3xl': 'rounded-3xl',
	full: 'rounded-full',
};

const shadowToTailwind: Record<Shadow, string> = {
	none: 'shadow-none',
	xs: 'shadow-sm',
	sm: 'shadow',
	md: 'shadow-md',
	lg: 'shadow-lg',
	xl: 'shadow-xl',
	'2xl': 'shadow-2xl',
	'3xl': 'shadow-inner', // Fallback as tailwind doesn't have 3xl shadow by default, using inner or custom
};

// Variant styles - using utility classes from styles.css
const variantStyles: Record<Variant, string> = {
	glass: 'variant-glass',
	'glass-highlight': 'variant-glass-highlight',
	flat: 'variant-flat',
	outline: 'variant-outline',
	transparent: 'variant-transparent',
	unstyled: 'variant-unstyled',
};

export function getStylingClasses(props: StylingProps): string {
	const classes: string[] = [];

	// Get variant (default to 'glass')
	// Handle component-specific variants by mapping to base variants
	let variant: Variant = 'glass';
	if (typeof props.variant === 'string') {
		// Map component-specific variants to base variants
		if (
			props.variant === 'glass' ||
			props.variant === 'glass-highlight' ||
			props.variant === 'flat' ||
			props.variant === 'outline' ||
			props.variant === 'transparent' ||
			props.variant === 'unstyled'
		) {
			variant = props.variant as Variant;
		} else {
			// For other variants (like 'filled', 'icon', 'text'), default to glass
			variant = 'glass';
		}
	}

	// Add variant-specific base styles
	classes.push(variantStyles[variant]);

	// Check for explicit overrides
	const hasExplicitPadding =
		props.p ||
		props.pt ||
		props.pb ||
		props.pl ||
		props.pr ||
		props.px ||
		props.py;
	const hasExplicitRadius = props.radius;
	const hasExplicitShadow = props.shadow;

	// Add default padding if not explicitly provided (only for glass variants, skip for unstyled)
	if (
		!hasExplicitPadding &&
		(variant === 'glass' || variant === 'glass-highlight')
	) {
		classes.push('p-4');
	}

	// Add default radius if not explicitly provided (skip for unstyled)
	if (!hasExplicitRadius && variant !== 'unstyled') {
		// Glass variants default to rounded-2xl, others default to rounded-xl
		if (variant === 'glass' || variant === 'glass-highlight') {
			classes.push('rounded-2xl');
		} else {
			classes.push('rounded-xl');
		}
	}

	// Add default shadow if not explicitly provided (only for glass variants, skip for unstyled)
	if (
		!hasExplicitShadow &&
		(variant === 'glass' || variant === 'glass-highlight')
	) {
		classes.push('shadow-xl');
	}

	// Margins
	if (props.m)
		classes.push(
			props.m === 'none' ? 'm-0' : `m-${sizeToTailwindMap[props.m]}`,
		);
	if (props.mt)
		classes.push(
			props.mt === 'none' ? 'mt-0' : `mt-${sizeToTailwindMap[props.mt]}`,
		);
	if (props.mb)
		classes.push(
			props.mb === 'none' ? 'mb-0' : `mb-${sizeToTailwindMap[props.mb]}`,
		);
	if (props.ml)
		classes.push(
			props.ml === 'none' ? 'ml-0' : `ml-${sizeToTailwindMap[props.ml]}`,
		);
	if (props.mr)
		classes.push(
			props.mr === 'none' ? 'mr-0' : `mr-${sizeToTailwindMap[props.mr]}`,
		);
	if (props.mx)
		classes.push(
			props.mx === 'none' ? 'mx-0' : `mx-${sizeToTailwindMap[props.mx]}`,
		);
	if (props.my)
		classes.push(
			props.my === 'none' ? 'my-0' : `my-${sizeToTailwindMap[props.my]}`,
		);

	// Padding (only if explicitly provided, otherwise use default)
	if (hasExplicitPadding) {
		if (props.p)
			classes.push(
				props.p === 'none' ? 'p-0' : `p-${sizeToTailwindMap[props.p]}`,
			);
		if (props.pt)
			classes.push(
				props.pt === 'none' ? 'pt-0' : `pt-${sizeToTailwindMap[props.pt]}`,
			);
		if (props.pb)
			classes.push(
				props.pb === 'none' ? 'pb-0' : `pb-${sizeToTailwindMap[props.pb]}`,
			);
		if (props.pl)
			classes.push(
				props.pl === 'none' ? 'pl-0' : `pl-${sizeToTailwindMap[props.pl]}`,
			);
		if (props.pr)
			classes.push(
				props.pr === 'none' ? 'pr-0' : `pr-${sizeToTailwindMap[props.pr]}`,
			);
		if (props.px)
			classes.push(
				props.px === 'none' ? 'px-0' : `px-${sizeToTailwindMap[props.px]}`,
			);
		if (props.py)
			classes.push(
				props.py === 'none' ? 'py-0' : `py-${sizeToTailwindMap[props.py]}`,
			);
	}

	// Radius - always apply if provided (will override default rounded-xl)
	if (hasExplicitRadius && props.radius) {
		classes.push(radiusToTailwind[props.radius]);
	}

	// Shadow (only if explicitly provided, otherwise use default)
	if (hasExplicitShadow && props.shadow) {
		classes.push(shadowToTailwind[props.shadow]);
	}

	return classes.join(' ');
}

export const getGapClass = (gap?: Spacing): string => {
	if (!gap || gap === 'none') return 'gap-0';
	return `gap-${sizeToTailwindMap[gap as Size]}`;
};
