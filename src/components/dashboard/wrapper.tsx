import { dispatch } from '@wordpress/data';
import { useEffect } from '@wordpress/element';

import { useAdminSidebarLayout } from '@wpmvc/admin-sidebar';
import { Outlet, useLocation, useNavigate } from 'react-router';
import styled from 'styled-components';

import { ColorWrapper } from '@wpmvc/colors';
import Header from '../header';
import { Layout, WrapperProps } from './types';
import { StyledWrapper } from './styles';

const Body = styled.div< Layout >`
	position: relative;
	padding-top: var( --wpmvc-header-height );
`;

export default function Wrapper( { menuItems }: WrapperProps ) {
	const location = useLocation();
	const navigate = useNavigate();
	const { left, top } = useAdminSidebarLayout();

	useEffect( () => {
		//@ts-ignore
		dispatch( 'my-dashboard/global' ).setLocation( location );
		//@ts-ignore
		dispatch( 'my-dashboard/global' ).setNavigate( navigate );
	}, [ location, navigate ] );

	useEffect( () => {
		//@ts-ignore
		dispatch( 'my-dashboard/global' ).setLeft( left );
		//@ts-ignore
		dispatch( 'my-dashboard/global' ).setTop( top );
	}, [ left, top ] );

	return (
		<ColorWrapper>
			<StyledWrapper $top={ top } $left={ left }>
				<Body $top={ top }>
					<Header left={ left } top={ top } menuItems={ menuItems } />
					<Outlet />
				</Body>
			</StyledWrapper>
		</ColorWrapper>
	);
}
