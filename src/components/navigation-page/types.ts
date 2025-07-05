import { StoreConfig } from '@wpmvc/data/build-types/types';
import { MenuItemsType } from '../menu/types';

export type NavigationItemsType = MenuItemsType;

export type NavigationPageProps = {
	path: string;
	items: NavigationItemsType;
	sidebarWidth?: number;
	store?: StoreConfig;
};

export type BodyProps = {
	$width: number;
};

export type NavigationProps = {
	width: number;
	left: number;
	top: number;
	items: NavigationItemsType;
};

export type NavigationWrapperProps = {
	$width: number;
	$left?: number;
	$top?: number;
	$open?: boolean;
};
