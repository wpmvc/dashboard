import styled from 'styled-components';
import { useLayout } from '../../hooks/use-layout';
import Navigation from './navigation';
import { Outlet, Route, Routes } from 'react-router-dom';
import type { BodyProps, NavigationPage } from './types';
import { registerValuesStore } from '@wpmvc/data';
import { useDashboardRouting } from '../../hooks';
import { useMemo } from '@wordpress/element';
import PageTransition from '../page-transition';
import { MenuItemsType } from '../menu/types';
import { values } from 'lodash';
import { normalizePath } from '../../utils';

const Body = styled.div< BodyProps >`
	padding-left: ${ ( { $width } ) => `${ $width }px` };

	@media ( max-width: 768px ) {
		padding-left: 0px;
	}
`;

// Recursively create routes
const renderRoutes = ( items: MenuItemsType ) => {
	return Object.entries( items || {} ).map( ( [ key, item ] ) => {
		return (
			<Route
				key={ key }
				path={ item.path }
				element={
					<PageTransition key={ key }>
						{ item.children }
					</PageTransition>
				}
			/>
		);
	} );
};

export default function NavigationPage( {
	path,
	menuItems,
	sidebarWidth = 280,
	store,
}: NavigationPage ) {
	if ( store ) {
		registerValuesStore( store );
	}

	const RedirectSettings = () => {
		useDashboardRouting().navigate?.(
			`${ path }/${ values( menuItems )[ 0 ].path }`
		);
		return null;
	};

	const { left, top } = useLayout();

	const normalizedItems: MenuItemsType = useMemo( () => {
		const result: MenuItemsType = {};
		Object.entries( menuItems || {} ).forEach( ( [ key, item ] ) => {
			result[ key ] = {
				...item,
				path: `/${ path }/${ normalizePath( item.path ) }`,
			};
		} );
		return result;
	}, [ menuItems ] );

	return (
		<>
			<Navigation
				left={ left }
				top={ top }
				width={ sidebarWidth }
				menuItems={ normalizedItems }
			/>
			<Body $width={ sidebarWidth }>
				<Routes>
					<Route path="/" element={ <RedirectSettings /> } />
					{ renderRoutes( menuItems ) }
					<Route path="*" element={ <Outlet /> } />
				</Routes>
			</Body>
		</>
	);
}
