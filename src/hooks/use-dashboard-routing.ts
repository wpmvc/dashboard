import { useSelect } from '@wordpress/data';
import type { Location } from 'react-router-dom';

/**
 * Hook to get location and navigate from the global dashboard store.
 */
export const useDashboardRouting = () => {
	return useSelect( ( select ) => {
		const store = select( 'my-dashboard/global' ) as {
			getLocation: () => Location | undefined;
			getNavigate: () => ( ( path: string ) => void ) | undefined;
		};

		return {
			location: store.getLocation(),
			navigate: store.getNavigate(),
		};
	}, [] );
};
