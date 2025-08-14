import { SlotFillProvider } from '@wordpress/components';
import { ColorVariables } from '@wpmvc/colors';
import { HashRouter, Route, Routes, useLocation } from 'react-router-dom';
import GlobalStyle from '../../global-style';
import { registerGlobalStore } from '../../store';
import Notification from '../notification';
import PageTransition from '../page-transition';
import Wrapper from './wrapper';
import { DashboardProps, RouteType } from './types';
import { normalizePath } from '../../utils';
import { ReactNode } from 'react';
import { useEffect } from '@wordpress/element';
import { dispatch } from '@wordpress/data';

const Page = ( {
	route,
	children,
}: {
	route: RouteType;
	children: ReactNode;
} ) => {
	const location = useLocation();
	useEffect( () => {
		//@ts-ignore
		dispatch( 'my-dashboard/global' ).setHideHeader(
			route?.hideHeader ? true : false
		);
	}, [ location.pathname ] );
	return children;
};

const renderNestedRoutes = ( routes: RouteType[] ) => {
	return routes.map( ( route ) => {
		if ( route.index ) {
			return (
				<Route
					key="index"
					index
					element={
						<PageTransition key={ route.path }>
							<Page route={ route }>{ route.element }</Page>
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
					route.children || route?.preventTransition ? (
						<Page route={ route }>{ route.element }</Page>
					) : (
						<PageTransition key={ route.path }>
							<Page route={ route }>{ route.element }</Page>
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
	children,
	colors,
	header,
	pageTopLevelID,
	rootPaths,
}: DashboardProps ) {
	return (
		<SlotFillProvider>
			<GlobalStyle />
			<ColorVariables colors={ colors } />
			<Notification />
			<HashRouter>
				<Routes>
					<Route
						element={
							<Wrapper
								{ ...header }
								pageTopLevelID={ pageTopLevelID }
								rootPaths={ rootPaths }
							/>
						}
					>
						{ children }
						{ renderNestedRoutes( routes ) }
					</Route>
				</Routes>
			</HashRouter>
		</SlotFillProvider>
	);
}
