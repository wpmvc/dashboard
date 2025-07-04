// WordPress dependencies
import { __experimentalVStack as VStack } from '@wordpress/components';
import { doAction } from '@wordpress/hooks';

// Internal components
import { HorizontalStack } from './menu-wrapper';
import { MenuButton } from './menu-button';

// Hooks
import { useDashboardRouting } from '../../hooks/use-dashboard-routing';

// Types
import { MenuItemProps, MenuItemsProps, MenuProps } from './types';
import WP_HOOKS from '../../constants/wp-hooks';

export function MenuItems( { menuItems }: MenuItemsProps ) {
	return Object.entries( menuItems ).map( ( [ key, item ] ) => (
		<Menu.Item { ...item } key={ key }>
			{ item.label }
		</Menu.Item>
	) );
}

export function MenuItem( props: MenuItemProps ) {
	const { icon, path, size, onClick, children } = props;
	const { location, navigate } = useDashboardRouting();
	const isActive = path
		? location?.pathname === path ||
		  location?.pathname.startsWith( path + '/' )
		: false;

	const handleMenuClick = () => {
		if ( onClick ) {
			onClick( props );
		}

		if ( ! path ) {
			return;
		}

		doAction( WP_HOOKS.RESPONSIVE_SIDEBAR_STATUS, false );
		doAction( WP_HOOKS.HEADER_RESPONSIVE_MENU_STATUS, false );

		if ( path.startsWith( 'http' ) ) {
			window.location.href = path;
		} else {
			navigate?.( path );
		}
	};

	return (
		<MenuButton
			icon={ icon }
			size={ size }
			$active={ isActive }
			onClick={ () => handleMenuClick() }
		>
			{ children }
		</MenuButton>
	);
}

function Menu( { horizontal = false, children }: MenuProps ) {
	const StackComponent: React.ElementType = horizontal
		? HorizontalStack
		: VStack;

	return (
		<StackComponent spacing={ horizontal ? undefined : 1 }>
			{ children }
		</StackComponent>
	);
}

Menu.Item = MenuItem;

export default Menu;
