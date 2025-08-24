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
import { Slot } from '@wordpress/components';
import { menu } from '@wordpress/icons';
import { HeaderProps } from './types';
import { addAction, doAction, removeAction } from '@wordpress/hooks';
import WP_HOOKS from '../../constants/wp-hooks';

const Header: React.FC< HeaderProps > = ( {
	left,
	top,
	menuItems,
	actionItems,
	logo,
} ) => {
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
							<HeaderWrapper
								$left={ left }
								$top={ top }
								className="wpmvc-header"
							>
								{ fills }
							</HeaderWrapper>
						);
					}

					return (
						<>
							<HeaderWrapper
								$left={ left }
								$top={ top }
								className="wpmvc-header"
							>
								<HeaderContent>
									<HeaderLeft>
										{ logo && <Logo>{ logo }</Logo> }
										{ menuItems && (
											<HeaderMenuWrapper>
												<MenuItems
													items={ menuItems }
												/>
											</HeaderMenuWrapper>
										) }
									</HeaderLeft>
									{ actionItems && (
										<HeaderRight>
											<Menu horizontal>
												<MenuItems
													items={ actionItems }
												/>
											</Menu>
										</HeaderRight>
									) }
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
								{ menuItems && (
									<div className="menu-section">
										<MenuItems items={ menuItems } />
									</div>
								) }
								{ actionItems && (
									<div className="bottom-actions">
										<MenuItems items={ actionItems } />
									</div>
								) }
							</ResponsiveMenuWrapper>
						</>
					);
				} }
			</Slot>
		</>
	);
};

export default Header;
