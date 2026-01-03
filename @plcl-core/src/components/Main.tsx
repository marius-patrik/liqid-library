import type { FC, HTMLAttributes, PropsWithChildren } from 'react';

export type MainVariant = 'app' | 'desktop' | 'page' | 'sidebar';

export interface MainProps extends HTMLAttributes<HTMLElement> {
	variant?: MainVariant;
	isScrollable?: boolean;
}

const Main: FC<PropsWithChildren<MainProps>> = ({
	children,
	className = '',
	variant = 'page',
	isScrollable = true,
	...props
}) => {
	const baseStyles = 'w-full';

	const variantStyles = {
		app: 'flex flex-col px-2 gap-2 grow h-full',
		desktop: 'relative z-10 w-full h-full p-4 block',
		page: isScrollable
			? 'flex-1 w-full overflow-y-auto'
			: 'flex-1 w-full overflow-hidden',
		sidebar: 'flex-1 overflow-y-auto',
	};

	const containerStyles = {
		page: 'container mx-auto p-4 md:p-6 lg:p-8 max-w-7xl',
		sidebar: 'p-4 md:p-6 lg:p-8',
		app: '',
		desktop: '',
	};

	return (
		<main
			className={`${baseStyles} ${variantStyles[variant]} ${className}`}
			{...props}
		>
			{variant === 'page' || variant === 'sidebar' ? (
				<div className={containerStyles[variant]}>{children}</div>
			) : (
				children
			)}
		</main>
	);
};

export default Main;
