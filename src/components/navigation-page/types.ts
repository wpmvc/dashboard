import { StoreConfig } from '@wpmvc/data/build-types/types';
import { MenuItemsType } from '../menu/types';

export type NavigationPage = {
	menuItems: MenuItemsType;
	sidebarWidth?: number;
	store?: StoreConfig;
};

export type BodyProps = {
	$width: number;
};

export type Navigation = {
	width: number;
	left: number;
	top: number;
	menuItems: MenuItemsType;
};

export type NavigationWrapper = {
	$width: number;
	$left?: number;
	$top?: number;
	$open?: boolean;
};
