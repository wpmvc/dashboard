/**
 * Wordpress dependencies
 */
import { useMemo } from '@wordpress/element';

/**
 * External dependencies
 */
import styled from 'styled-components';
import { Outlet, Route, Routes } from 'react-router-dom';
import { registerValuesStore } from '@wpmvc/data';
import { values } from 'lodash';

/**
 * Internal dependencies
 */
import { useLayout } from '../../hooks/use-layout';
import Navigation from './navigation';
import type {
	BodyProps,
	NavigationItemsType,
	NavigationPageProps,
} from './types';
import { useDashboardRouting } from '../../hooks';
import PageTransition from '../page-transition';
import { normalizePath } from '../../utils';

const Body = styled.div< BodyProps >`
	padding-left: ${ ( { $width } ) => `${ $width }px` };

	@media ( max-width: 768px ) {
		padding-left: 0px;
	}
`;

// Recursively create routes
const renderRoutes = ( items: NavigationItemsType ) => {
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
	items,
	sidebarWidth = 280,
	store,
}: NavigationPageProps ) {
	if ( store ) {
		registerValuesStore( store );
	}

	const RedirectSettings = () => {
		useDashboardRouting().navigate?.(
			`${ path }/${ values( items )[ 0 ].path }`
		);
		return null;
	};

	const { left, top } = useLayout();

	const normalizedItems: NavigationItemsType = useMemo( () => {
		const result: NavigationItemsType = {};
		Object.entries( items || {} ).forEach( ( [ key, item ] ) => {
			result[ key ] = {
				...item,
				path: `/${ path }/${ normalizePath( item.path ) }`,
			};
		} );
		return result;
	}, [ items ] );

	return (
		<>
			<Navigation
				left={ left }
				top={ top }
				width={ sidebarWidth }
				items={ normalizedItems }
			/>
			<Body $width={ sidebarWidth }>
				<Routes>
					<Route path="/" element={ <RedirectSettings /> } />
					{ renderRoutes( items ) }
					<Route path="*" element={ <Outlet /> } />
				</Routes>
			</Body>
		</>
	);
}
