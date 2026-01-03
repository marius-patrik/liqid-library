import type { FC, HTMLAttributes, PropsWithChildren } from 'react';
import { useState } from 'react';
import Box from './Box';

export type FooterVariant = 'app' | 'desktop' | 'page' | 'sidebar';

export interface FooterProps extends HTMLAttributes<HTMLDivElement> {
	hideByDefault?: boolean;
	variant?: FooterVariant;
}

const Footer: FC<PropsWithChildren<FooterProps>> = ({
	hideByDefault = false,
	variant = 'desktop',
	children,
	className = '',
	...props
}) => {
	const [isHovered, setIsHovered] = useState(false);

	if (variant === 'page' || variant === 'sidebar') {
		return (
			<div className={`w-full variant-glass p-4 ${className}`} {...props}>
				<div className="container mx-auto max-w-7xl">{children}</div>
			</div>
		);
	}

	if (variant === 'app') {
		return (
			<Box
				variant="glass"
				radius="full"
				p="sm"
				px="lg"
				className={`fixed bottom-2 left-1/2 -translate-x-1/2 z-50 md:invisible flex flex-row gap-3 ${className}`}
				{...props}
			>
				{children}
			</Box>
		);
	}

	// Desktop variant
	if (hideByDefault) {
		return (
			<>
				{/* Invisible hover trigger zone at the bottom of the screen */}
				<div
					className="fixed bottom-0 left-0 right-0 h-8 z-40"
					onMouseEnter={() => setIsHovered(true)}
				/>
				{/* Footer that appears on hover */}
				<Box
					variant="glass"
					radius="2xl"
					p="sm"
					className={`system-overlay-50 bottom-2 max-w-[95vw] left-1/2 -translate-x-1/2 flex flex-row gap-3 overflow-x-auto transition-all duration-300 ${
						isHovered
							? 'opacity-100 translate-y-0'
							: 'opacity-0 translate-y-full pointer-events-none'
					} ${className}`}
					onMouseLeave={() => setIsHovered(false)}
					{...props}
				>
					{children}
				</Box>
			</>
		);
	}

	return (
		<Box
			variant="glass"
			radius="2xl"
			p="sm"
			className={`system-overlay-50 bottom-2 max-w-[95vw] left-1/2 -translate-x-1/2 flex flex-row gap-3 overflow-x-auto ${className}`}
			{...props}
		>
			{children}
		</Box>
	);
};

export default Footer;
