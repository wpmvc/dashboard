// WordPress dependencies
import { IconType } from '@wordpress/components';

export type MenuItemProps = {
	label?: string;
	icon?: IconType | null;
	path?: string;
	size?: 'default' | 'compact' | 'small';
	onClick?: ( props: MenuItemProps ) => void;
	children?: React.ReactNode;
	/** Internal use only - added by Menu parent */
	$active?: boolean;
};

export type MenuItemsType = Record< string, MenuItemProps >;

export type MenuProps = {
	horizontal?: boolean;
	children?: React.ReactNode;
};

export type MenuItemsProps = {
	items: MenuItemsType;
};
