import { useSelect } from '@wordpress/data';

/**
 * Hook to get location and navigate from the global dashboard store.
 */
export const useLayout = () => {
	return useSelect( ( select ) => {
		const store = select( 'my-dashboard/global' ) as {
			getTop: () => number;
			getLeft: () => number;
		};

		return {
			top: store.getTop(),
			left: store.getLeft(),
		};
	}, [] );
};
