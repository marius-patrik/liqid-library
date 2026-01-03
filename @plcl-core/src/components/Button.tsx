import type { ButtonHTMLAttributes, FC, PropsWithChildren } from 'react';
import { Link as WouterLink } from 'wouter';
import { type StylingProps, getStylingClasses } from '../styles';

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

const Button: FC<PropsWithChildren<ButtonProps>> = ({
	variant = 'glass',
	as = 'button',
	href = '',
	children,
	className = '',
	id,
	// Styling props
	m,
	mt,
	mb,
	ml,
	mr,
	mx,
	my,
	p,
	pt,
	pb,
	pl,
	pr,
	px,
	py,
	radius,
	shadow,
	size,
	...props
}) => {
	const componentId = id || 'Button';
	// Map ButtonVariant to StylingProps variant
	let stylingVariant: 'glass' | 'glass-highlight' | 'outline' | 'transparent' =
		'glass';
	if (variant === 'glass-highlight') stylingVariant = 'glass-highlight';
	else if (variant === 'outline') stylingVariant = 'outline';
	else if (variant === 'text' || variant === 'icon')
		stylingVariant = 'transparent';

	// Generate utility classes
	const stylingClasses = getStylingClasses({
		variant: stylingVariant,
		m,
		mt,
		mb,
		ml,
		mr,
		mx,
		my,
		p,
		pt,
		pb,
		pl,
		pr,
		px,
		py,
		radius,
		shadow,
	});

	// Additional variant-specific classes
	let variantClasses = '';
	if (variant === 'icon') {
		variantClasses = 'hover:scale-101 active:scale-101 transition-transform';
	} else if (variant === 'text') {
		variantClasses =
			'hover:text-zinc-900 active:text-zinc-900 dark:hover:text-zinc-100 dark:active:text-zinc-100 text-sky-500 dark:text-sky-400';
	} else if (variant === 'outline') {
		variantClasses =
			'hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors';
	}

	// Size adjustments (if `size` affects button scale specifically beyond padding)
	const sizeClasses = size ? `btn-${size}` : '';
	// Note: We might need to define these btn-* classes in CSS or handle them here.
	// For now, let's assume 'p' props handle spacing, but we can add text sizing:
	let dynamicSize = '';
	if (size === 'xs') dynamicSize = 'text-xs px-2 py-1';
	if (size === 'sm') dynamicSize = 'text-sm px-3 py-1.5';
	if (size === 'md') dynamicSize = 'text-base px-4 py-2';
	if (size === 'lg') dynamicSize = 'text-lg px-6 py-3';
	if (size === 'xl') dynamicSize = 'text-xl px-8 py-4';

	// If specific padding props are provided, they override the size default padding
	if (p || px || py || pt || pb || pl || pr) {
		dynamicSize = dynamicSize.replace(/p[xyltrb]?-\S+/g, '');
	}

	const styles = `${variantClasses} ${stylingClasses} ${dynamicSize} ${sizeClasses} ${className}`;

	if (as === 'link') {
		return (
			<WouterLink href={href} className={styles} id={componentId}>
				{children}
			</WouterLink>
		);
	}

	return (
		<button type="button" className={styles} id={componentId} {...props}>
			{children}
		</button>
	);
};

export default Button;
