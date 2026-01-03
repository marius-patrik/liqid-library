import type { FC, HTMLAttributes } from 'react';
import { type StylingProps, getStylingClasses } from '../styles';

export interface CodeProps extends HTMLAttributes<HTMLElement>, StylingProps {
	block?: boolean;
	color?: string; // 'blue', 'pink' etc - subtle background
}

const Code: FC<CodeProps> = ({
	block,
	color = 'zinc',
	children,
	className = '',
	id,
	variant,
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
	const componentId = id || 'Code';
	const stylingClasses = getStylingClasses({
		variant,
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
		radius: radius || 'xl',
		shadow,
	});

	// Default padding if not provided should be small for inline
	const paddingClass =
		p || px || py || pt || pb || pl || pr
			? ''
			: block
				? 'p-3'
				: 'px-1.5 py-0.5';

	// Theme colors mapping
	// We can use partial opacity backgrounds.
	// e.g. bg-blue-50 text-blue-900
	// Simplified: just gray/zinc for now unless complex mapping.

	// For now stick to simple gray style similar to default Mantine
	// Only apply background if not using unstyled variant
	const colorClass =
		variant === 'unstyled'
			? ''
			: block
				? 'bg-zinc-50 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-700'
				: 'bg-zinc-100 dark:bg-zinc-800';

	return (
		<code
			id={componentId}
			className={`
                font-mono text-sm 
                ${block ? 'block w-full overflow-x-auto' : 'inline-block'}
                ${colorClass}
                ${paddingClass} ${stylingClasses} ${className}
            `}
			{...props}
		>
			{children}
		</code>
	);
};

export default Code;
