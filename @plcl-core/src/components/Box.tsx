import type { FC, HTMLAttributes, PropsWithChildren, ReactNode } from 'react';
import { type StylingProps, getStylingClasses } from '../styles';
import Text from './Text';

export interface BoxProps
	extends Omit<HTMLAttributes<HTMLDivElement>, 'title'>,
		StylingProps {
	title?: ReactNode;
	buttons?: ReactNode;
}

const Box: FC<PropsWithChildren<BoxProps>> = ({
	title,
	children,
	buttons,
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
	const componentId = id || 'Box';
	const stylingClasses = getStylingClasses({
		variant: 'glass',
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

	// Default padding/margin handling
	const hasPadding = p || px || py || pt || pb || pl || pr;
	const paddingClass = hasPadding ? '' : 'p-8'; // Default p-8 (xl)

	const hasMargin = m || mx || my || mt || mb || ml || mr;
	const marginClass = hasMargin ? '' : 'mx-4 sm:mx-auto'; // Default mx-4...

	return (
		<div
			id={componentId}
			className={`${paddingClass} ${marginClass} sm:min-w-md gap-2 flex flex-col max-w-lg ${stylingClasses} ${className}`}
			{...props}
		>
			{title && (
				<Text
					variant="text"
					size="lg"
					align="center"
					className="mx-auto font-medium p-2"
				>
					{title}
				</Text>
			)}
			<Text
				variant="text"
				size="md"
				dimmed
				className="flex flex-col gap-2 mx-2"
			>
				{children}
			</Text>
			{buttons && (
				<div className="flex flex-col gap-2 md:flex-wrap">{buttons}</div>
			)}
		</div>
	);
};

export default Box;
