import { ReactNode } from 'react';
import { MenuItemsType } from '../menu/types';

export type Header = {
	logo?: ReactNode;
	menuItems?: MenuItemsType;
	actionItems?: MenuItemsType;
};

export type HeaderProps = Header & {
	left: number;
	top: number;
};

export type MenuItemsProps = {
	menuItems: MenuItemsType;
};
