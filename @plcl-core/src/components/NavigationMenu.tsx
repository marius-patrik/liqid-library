import type { FC, PropsWithChildren, ReactNode } from 'react';
import { createContext, useContext, useEffect, useState } from 'react';

export interface NavigationMenuItem {
	id: string;
	label: string;
	icon?: ReactNode;
	href?: string;
	component?: ReactNode;
	onClick?: () => void;
}

export interface NavigationMenuProps extends PropsWithChildren {
	items: NavigationMenuItem[];
	defaultActiveId?: string;
	onItemChange?: (itemId: string) => void;
	variant?: 'desktop' | 'app' | 'page' | 'sidebar';
	className?: string;
}

interface NavigationMenuContextValue {
	activeId: string;
	setActiveId: (id: string) => void;
	items: NavigationMenuItem[];
	variant: 'desktop' | 'app' | 'page' | 'sidebar';
}

const NavigationMenuContext = createContext<NavigationMenuContextValue | null>(
	null,
);

export const useNavigationMenu = () => {
	const context = useContext(NavigationMenuContext);
	if (!context) {
		throw new Error('useNavigationMenu must be used within NavigationMenu');
	}
	return context;
};

const NavigationMenu: FC<NavigationMenuProps> & {
	Item: FC<NavigationMenuItem & { className?: string }>;
	Content: FC<{ className?: string }>;
} = ({
	items,
	defaultActiveId,
	onItemChange,
	variant = 'page',
	className = '',
	children,
}) => {
	const [activeId, setActiveId] = useState(
		defaultActiveId || items[0]?.id || '',
	);

	// Sync with external defaultActiveId changes
	useEffect(() => {
		if (defaultActiveId && defaultActiveId !== activeId) {
			setActiveId(defaultActiveId);
		}
		// biome-ignore lint/correctness/useExhaustiveDependencies: We only want to sync when defaultActiveId changes, not when activeId changes
	}, [defaultActiveId]);

	const handleSetActiveId = (id: string) => {
		setActiveId(id);
		onItemChange?.(id);
	};

	const activeItem = items.find((item) => item.id === activeId);

	return (
		<NavigationMenuContext.Provider
			value={{ activeId, setActiveId: handleSetActiveId, items, variant }}
		>
			<div className={className}>
				{children}
				{activeItem?.component && (
					<div className="navigation-content">{activeItem.component}</div>
				)}
			</div>
		</NavigationMenuContext.Provider>
	);
};

const Item: FC<NavigationMenuItem & { className?: string }> = ({
	id,
	label,
	icon,
	href,
	onClick,
	className = '',
}) => {
	const { activeId, setActiveId, variant } = useNavigationMenu();
	const isActive = activeId === id;

	const handleClick = () => {
		setActiveId(id);
		onClick?.();
	};

	const baseStyles =
		variant === 'app'
			? 'justify-center items-center text-xs hover:scale-110 transition-transform flex w-10 mx-auto flex-col'
			: 'px-3 py-2 text-sm rounded-sm flex items-center gap-2 cursor-pointer';

	const activeStyles = isActive ? 'font-semibold text-sky-400' : '';

	if (href) {
		return (
			<a
				href={href}
				onClick={handleClick}
				className={`${baseStyles} ${activeStyles} ${className}`}
			>
				{icon && <span className="w-4 h-4">{icon}</span>}
				<span>{label}</span>
			</a>
		);
	}

	return (
		<button
			type="button"
			onClick={handleClick}
			className={`${baseStyles} ${activeStyles} ${className}`}
		>
			{icon && <span className="w-4 h-4">{icon}</span>}
			<span>{label}</span>
		</button>
	);
};

const Content: FC<{ className?: string }> = ({ className = '' }) => {
	const { activeId, items } = useNavigationMenu();
	const activeItem = items.find((item) => item.id === activeId);

	if (!activeItem?.component) return null;

	return <div className={className}>{activeItem.component}</div>;
};

NavigationMenu.Item = Item;
NavigationMenu.Content = Content;

export default NavigationMenu;
