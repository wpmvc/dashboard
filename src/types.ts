import { Location, NavigateFunction } from 'react-router-dom';

export interface ActiveMenuConfig {
	pageTopLevelID?: string;
	rootPaths?: string[];
	location: Location;
	navigate: NavigateFunction;
}

export interface SidebarLayout {
	left: string;
	top: string;
	width: string;
}

export interface SidebarEventData {
	state: 'open' | 'folded' | 'responsive';
}
