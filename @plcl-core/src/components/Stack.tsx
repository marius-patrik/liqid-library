import type { FC, HTMLAttributes, PropsWithChildren } from 'react';
import {
	type Spacing,
	type StylingProps,
	getGapClass,
	getStylingClasses,
} from '../styles';

export type StackGap = Spacing | 'none';

export interface StackProps
	extends HTMLAttributes<HTMLDivElement>,
		StylingProps {
	gap?: StackGap;
}

const Stack: FC<PropsWithChildren<StackProps>> = ({
	gap = 'md',
	children,
	className = '',
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
		radius,
		shadow,
	});

	return (
		<div
			className={`flex flex-col ${getGapClass(gap)} ${stylingClasses} ${className}`}
			{...props}
		>
			{children}
		</div>
	);
};

export default Stack;
