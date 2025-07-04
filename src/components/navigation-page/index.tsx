import styled from 'styled-components';
import { useLayout } from '../../hooks/use-layout';
import Navigation from './navigation';
import { Outlet } from 'react-router';
import type { BodyProps, NavigationPage } from './types';
import { registerValuesStore } from '@wpmvc/data';

const Body = styled.div< BodyProps >`
	padding-left: ${ ( { $width } ) => `${ $width }px` };

	@media ( max-width: 768px ) {
		padding-left: 0px;
	}
`;

export default function NavigationPage( {
	menuItems,
	sidebarWidth,
	store,
}: NavigationPage ) {
	if ( store ) {
		registerValuesStore( store );
	}

	const { left, top } = useLayout();
	const width = sidebarWidth ? sidebarWidth : 280;

	return (
		<>
			<Navigation
				left={ left }
				top={ top }
				width={ width }
				menuItems={ menuItems }
			/>
			<Body $width={ width }>
				<Outlet />
			</Body>
		</>
	);
}
