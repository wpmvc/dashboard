import { createReduxStore, register } from '@wordpress/data';
import type { NavigateFunction, Location } from 'react-router';

type GlobalStoreState = {
	location?: Location;
	navigate?: NavigateFunction;
	top: string;
	left: string;
};

const DEFAULT_STATE: GlobalStoreState = {
	top: '0px',
	left: '0px',
};

export default function registerGlobalStore() {
	const store = createReduxStore( 'my-dashboard/global', {
		reducer( state = DEFAULT_STATE, action ) {
			switch ( action.type ) {
				case 'SET_LOCATION':
					return {
						...state,
						location: action.payload,
					};
				case 'SET_NAVIGATE':
					return {
						...state,
						navigate: action.payload,
					};
				case 'SET_LEFT':
					return {
						...state,
						left: action.payload,
					};
				case 'SET_TOP':
					return {
						...state,
						top: action.payload,
					};
				default:
					return state;
			}
		},
		actions: {
			setLocation( location: Location ) {
				return {
					type: 'SET_LOCATION',
					payload: location,
				};
			},
			setNavigate( navigate: NavigateFunction ) {
				return {
					type: 'SET_NAVIGATE',
					payload: navigate,
				};
			},
			setTop( top: string ) {
				return {
					type: 'SET_TOP',
					payload: top,
				};
			},
			setLeft( left: string ) {
				return {
					type: 'SET_LEFT',
					payload: left,
				};
			},
			setRight( right: string ) {
				return {
					type: 'SET_RIGHT',
					payload: right,
				};
			},
		},
		selectors: {
			getLocation( state = DEFAULT_STATE ) {
				return state.location;
			},
			getNavigate( state = DEFAULT_STATE ) {
				return state.navigate;
			},
			getTop( state = DEFAULT_STATE ) {
				return state.top;
			},
			getLeft( state = DEFAULT_STATE ) {
				return state.left;
			},
		},
	} );

	register( store );
}
