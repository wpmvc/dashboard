import { ColorPaletteOverride } from '@wpmvc/colors/build-types/store/types';
import { ReactNode } from 'react';
import { Header } from '../header/types';

export type WrapperProps = Header;

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
	hideHeader?: boolean;
};

export type DashboardProps = {
	routes?: RouteType[];
	children?: ReactNode;
	colors?: ColorPaletteOverride;
	header?: Header;
};
