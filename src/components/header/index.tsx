import { useEffect, useState } from '@wordpress/element';
import {
	HeaderContent,
	HeaderLeft,
	HeaderMenuWrapper,
	HeaderRight,
	HeaderWrapper,
	Logo,
	MobileActions,
	ResponsiveMenuWrapper,
} from './styled';
import Menu, { MenuItems } from '../menu';
import { Icon, Slot } from '@wordpress/components';
import { moreVertical, styles, desktop, menu } from '@wordpress/icons';
import WordPress from './wordpress';
import { MenuItemProps } from '../menu/types';
import { HeaderProps } from './types';
import { addAction, doAction, removeAction } from '@wordpress/hooks';
import WP_HOOKS from '../../constants/wp-hooks';

const leftMenuItems: Record< string, MenuItemProps > = {
	branding: {
		icon: <Icon icon={ desktop } />,
	},
	orders: {
		icon: <Icon icon={ styles } />,
	},
	subscriptions: {
		icon: <Icon icon={ moreVertical } />,
	},
};

const Header: React.FC< HeaderProps > = ( { left, top, menuItems } ) => {
	const [ mobileMenuOpen, setMobileMenuOpen ] = useState< boolean >( false );

	const menuHandler = ( status: boolean ) => {
		setMobileMenuOpen( status );
	};

	useEffect( () => {
		addAction(
			WP_HOOKS.HEADER_RESPONSIVE_MENU_STATUS,
			'wpmvc',
			menuHandler
		);
		return () => {
			removeAction( WP_HOOKS.HEADER_RESPONSIVE_MENU_STATUS, 'wpmvc' );
		};
	}, [ menuHandler ] );

	return (
		<>
			<Slot name="wpmvc-header">
				{ ( fills: any ) => {
					if ( fills.length ) {
						return (
							<HeaderWrapper $left={ left } $top={ top }>
								{ fills }
							</HeaderWrapper>
						);
					}

					return (
						<>
							<HeaderWrapper $left={ left } $top={ top }>
								<HeaderContent>
									<HeaderLeft>
										<Logo>
											<WordPress />
										</Logo>
										<HeaderMenuWrapper>
											<MenuItems items={ menuItems } />
										</HeaderMenuWrapper>
									</HeaderLeft>
									<HeaderRight>
										<Menu horizontal>
											<MenuItems
												items={ leftMenuItems }
											/>
										</Menu>
									</HeaderRight>
									<MobileActions className="mobile-actions">
										<Menu horizontal>
											<Slot
												name={
													'wpmvc-header-mobile-actions'
												}
											/>
											<Menu.Item
												icon={ menu }
												onClick={ () => {
													setMobileMenuOpen(
														( prev ) => ! prev
													);
													doAction(
														WP_HOOKS.RESPONSIVE_SIDEBAR_STATUS,
														false
													);
												} }
											/>
										</Menu>
									</MobileActions>
								</HeaderContent>
							</HeaderWrapper>
							<ResponsiveMenuWrapper
								$open={ mobileMenuOpen }
								$top={ top }
							>
								<div className="menu-section">
									<MenuItems items={ menuItems } />
								</div>
								<div className="bottom-actions">
									<MenuItems items={ leftMenuItems } />
								</div>
							</ResponsiveMenuWrapper>
						</>
					);
				} }
			</Slot>
		</>
	);
};

export default Header;
