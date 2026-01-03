import type { FC } from 'react';

export interface SidebarNavigationItem {
	title: string;
	[key: string]: unknown;
}

export interface SidebarNavigationProps {
	items: SidebarNavigationItem[];
	activeItem: SidebarNavigationItem;
	onSelect: (item: SidebarNavigationItem) => void;
	sections?: string[];
	className?: string;
}

const SidebarNavigation: FC<SidebarNavigationProps> = ({
	items,
	activeItem,
	onSelect,
	sections,
	className = '',
}) => {
	// Filter items by sections if provided
	const filteredItems = sections
		? items.filter((item) => {
				const itemSection = (item as { section?: string }).section;
				return itemSection && sections.includes(itemSection);
			})
		: items;

	return (
		<nav className={`flex flex-col gap-1 p-4 ${className}`}>
			{filteredItems.map((item) => {
				const isActive =
					activeItem === item || activeItem?.title === item.title;
				return (
					<button
						key={item.title}
						type="button"
						onClick={() => onSelect(item)}
						className={`
              w-full text-left px-3 py-2 text-sm rounded-md
              transition-colors
              ${
								isActive
									? 'bg-slate-200 dark:bg-slate-700 text-slate-900 dark:text-slate-100 font-medium'
									: 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800'
							}
            `}
					>
						{item.title}
					</button>
				);
			})}
		</nav>
	);
};

export default SidebarNavigation;
