import { ColorPaletteOverride } from '@wpmvc/colors/build-types/store/types';
import { MenuItemsType } from '../menu/types';

export type WrapperProps = {
	menuItems: MenuItemsType;
};

export type Layout = {
	$top: number;
	$left?: number;
};

export type StyledWrapperProps = Layout & {};

export type RouteType = {
	path?: string;
	element: React.ReactNode;
	children?: RouteType[];
	index?: boolean;
	preventTransition?: boolean;
};

export type DashboardProps = {
	routes?: RouteType[];
	children?: React.ReactNode;
	menuItems: MenuItemsType;
	colors?: ColorPaletteOverride;
};
