import { dispatch, useSelect } from '@wordpress/data';
import { useEffect } from '@wordpress/element';

import {
	useActiveAdminMenu,
	useAdminSidebarLayout,
} from '@wpmvc/admin-sidebar';
import { Outlet, useLocation, useNavigate } from 'react-router-dom';
import styled from 'styled-components';

import { ColorWrapper } from '@wpmvc/colors';
import Header from '../header';
import { WrapperProps } from './types';
import { StyledWrapper } from './styles';

const Body = styled.div< { $isHeaderHidden: boolean } >`
	position: relative;
	${ ( { $isHeaderHidden } ) =>
		$isHeaderHidden ? '' : 'padding-top: var( --wpmvc-header-height );' }
`;

export default function Wrapper( props: WrapperProps ) {
	const location = useLocation();
	const navigate = useNavigate();
	const { left, top } = useAdminSidebarLayout();

	useActiveAdminMenu( {
		pageTopLevelID: props.pageTopLevelID,
		rootPaths: props.rootPaths,
		navigate,
		location,
	} );

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

	const isHeaderHidden = useSelect( ( select ) => {
		//@ts-ignore
		return select( 'my-dashboard/global' ).getHideHeader();
	}, [] );

	return (
		<ColorWrapper>
			<StyledWrapper
				$top={ top }
				$left={ left }
				className="wpmvc-dashboard-wrapper"
			>
				{ ! isHeaderHidden && (
					<Header { ...props } left={ left } top={ top } />
				) }
				<Body $isHeaderHidden={ isHeaderHidden }>
					<Outlet />
				</Body>
			</StyledWrapper>
		</ColorWrapper>
	);
}
