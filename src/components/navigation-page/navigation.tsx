import { useEffect, useState } from '@wordpress/element';
import Menu, { MenuItem, MenuItems } from '../menu';
import { NavigationSection, NavigationWrapper } from './styled';
import { Fill } from '@wordpress/components';
import { grid } from '@wordpress/icons';
import { addAction, doAction, removeAction } from '@wordpress/hooks';
import WP_HOOKS from '../../constants/wp-hooks';
import type { NavigationProps } from './types';
import { useSelect } from '@wordpress/data';

export default function Navigation( {
	left,
	top,
	width,
	items,
}: NavigationProps ) {
	const [ open, setOpen ] = useState< boolean >( false );

	const menuHandler = ( status: boolean ) => {
		setOpen( status );
	};

	useEffect( () => {
		addAction( WP_HOOKS.RESPONSIVE_SIDEBAR_STATUS, 'wpmvc', menuHandler );
		return () => {
			removeAction( WP_HOOKS.RESPONSIVE_SIDEBAR_STATUS, 'wpmvc' );
		};
	}, [ menuHandler ] );

	const isHeaderHidden = useSelect( ( select ) => {
		//@ts-ignore
		return select( 'my-dashboard/global' ).getHideHeader();
	}, [] );

	return (
		<>
			<Fill name={ 'wpmvc-header-mobile-actions' }>
				{ () => {
					return (
						<MenuItem
							icon={ grid }
							onClick={ () => {
								setOpen( ( prev ) => ! prev );
								doAction(
									WP_HOOKS.HEADER_RESPONSIVE_MENU_STATUS,
									false
								);
							} }
						/>
					);
				} }
			</Fill>
			<NavigationWrapper
				$left={ left }
				$top={ top }
				$open={ open }
				$width={ width }
				$isHeaderHidden={ isHeaderHidden }
			>
				<NavigationSection>
					<Menu>
						<MenuItems items={ items } />
					</Menu>
				</NavigationSection>
			</NavigationWrapper>
		</>
	);
}
