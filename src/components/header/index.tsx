import { Slot } from '@wordpress/components';
import { useEffect, useState } from '@wordpress/element';
import { addAction, doAction, removeAction } from '@wordpress/hooks';
import { menu } from '@wordpress/icons';
import WP_HOOKS from '../../constants/wp-hooks';
import Menu, { MenuItems } from '../menu';
import {
	HeaderBottomWrapper,
	HeaderContent,
	HeaderLeft,
	HeaderMenuWrapper,
	HeaderRight,
	HeaderTopWrapper,
	HeaderWrapper,
	Logo,
	MobileActions,
	ResponsiveMenuWrapper,
} from './styled';
import { HeaderProps } from './types';

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
		<HeaderWrapper
			$left={ left }
			$top={ top }
		>
			<Slot name="wpmvc-header">
				{ ( fills: any ) => {
					if ( fills.length ) {
						return (
							<HeaderTopWrapper
								className="wpmvc-header"
							>
								{ fills }
							</HeaderTopWrapper>
						);
					}

					return (
						<>
							<HeaderTopWrapper
								
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
							</HeaderTopWrapper>
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
			
			<Slot name="wpmvc-header-after">
				{
					( fills: any ) => {
						if(fills.length == 0) {
							return null
						}

						return (
							<HeaderBottomWrapper className='wpmvc-header-after'>
								{ fills }
							</HeaderBottomWrapper>
						)
					}
				}
			</Slot>
		</HeaderWrapper>
	);
};

export default Header;
