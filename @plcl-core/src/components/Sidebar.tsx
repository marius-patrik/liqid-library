import type { FC, HTMLAttributes, PropsWithChildren } from 'react';

export interface SidebarProps extends HTMLAttributes<HTMLElement> {
	isScrollable?: boolean;
}

const Sidebar: FC<PropsWithChildren<SidebarProps>> = ({
	children,
	className = '',
	isScrollable = true,
	...props
}) => {
	return (
		<aside
			className={`w-64 variant-glass ${
				isScrollable ? 'overflow-y-auto' : 'overflow-hidden'
			} ${className}`}
			{...props}
		>
			{children}
		</aside>
	);
};

export default Sidebar;
