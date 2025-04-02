// @ts-ignore
import { useLayoutEffect, useCallback, useState } from '@wordpress/element';
import { SidebarEventData, SidebarLayout } from './types';

declare global {
	interface Window {
		// @ts-ignore
		jQuery: JQueryStatic;
	}
}

const DEFAULT_LAYOUT: SidebarLayout = {
	left: '0',
	top: '0',
	width: '100%',
};

const SELECTORS = {
	ID_WP_ADMIN_MENU_WRAP: '#adminmenuwrap',
	ID_WP_ADMIN_BAR: '#wpadminbar',
};

const CUSTOM_EVENTS = {
	WP_SIDEMENU_STATE: 'wp-menu-state-set wp-collapse-menu',
};

/**
 * Hook to track WordPress admin sidebar status and calculate content layout
 */
export default function useWPSidebarStatus(): SidebarLayout {
	const [ data, setData ] = useState< SidebarLayout >( DEFAULT_LAYOUT );
	const $ = window.jQuery;

	const calcLayout = useCallback( () => {
		const sidebarWidth =
			$( SELECTORS.ID_WP_ADMIN_MENU_WRAP ).outerWidth() || 0;
		const adminBarHeight =
			$( SELECTORS.ID_WP_ADMIN_BAR ).outerHeight() || 0;

		setData( {
			left: `${ sidebarWidth }px`,
			top: `${ adminBarHeight }px`,
			width: `calc(100% - ${ sidebarWidth }px)`,
		} );
	}, [ $ ] );

	const sidebarStatusHandler = useCallback(
		// @ts-ignore
		( _event: JQuery.Event, eventData: SidebarEventData ) => {
			if ( eventData.state === 'open' || eventData.state === 'folded' ) {
				calcLayout();
			}

			if ( eventData.state === 'responsive' ) {
				setData( DEFAULT_LAYOUT );
			}
		},
		[ calcLayout ]
	);

	useLayoutEffect( () => {
		calcLayout();
		$( document ).on(
			CUSTOM_EVENTS.WP_SIDEMENU_STATE,
			sidebarStatusHandler
		);

		return () => {
			$( document ).off(
				CUSTOM_EVENTS.WP_SIDEMENU_STATE,
				sidebarStatusHandler
			);
		};
	}, [ calcLayout, sidebarStatusHandler, $ ] );

	return data;
}
