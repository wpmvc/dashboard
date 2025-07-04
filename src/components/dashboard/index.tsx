import { SlotFillProvider } from '@wordpress/components';
import { ColorVariables } from '@wpmvc/colors';
import { HashRouter, Route, Routes } from 'react-router';
import GlobalStyle from '../../global-style';
import { registerGlobalStore } from '../../store';
import Notification from '../notification';
import PageTransition from '../page-transition';
import Wrapper from './wrapper';
import { DashboardProps, RouteType } from './types';
import { normalizePath } from '../../utils';

const renderNestedRoutes = ( routes: RouteType[] ) => {
	return routes.map( ( route ) => {
		if ( route.index ) {
			return (
				<Route
					key="index"
					index
					element={
						<PageTransition key={ route.path }>
							{ route.element }
						</PageTransition>
					}
				/>
			);
		}
		return (
			<Route
				key={ route.path }
				path={ normalizePath( route.path ) }
				element={
					route.children ? (
						route.element
					) : (
						<PageTransition key={ route.path }>
							{ route.element }
						</PageTransition>
					)
				}
			>
				{ route.children && renderNestedRoutes( route.children ) }
			</Route>
		);
	} );
};

registerGlobalStore();

export default function Dashboard( {
	routes = [],
	menuItems,
	children,
}: DashboardProps ) {
	return (
		<SlotFillProvider>
			<GlobalStyle />
			<ColorVariables />
			<Notification />
			<HashRouter>
				<Routes>
					<Route element={ <Wrapper menuItems={ menuItems } /> }>
						{ children }
						{ renderNestedRoutes( routes ) }
					</Route>
				</Routes>
			</HashRouter>
		</SlotFillProvider>
	);
}
