/**
 * Global Notification Handler
 *
 * Registers a WordPress action hook to show toast notifications.
 */

/**
 * WordPress Dependencies
 */
import { useEffect, useRef } from '@wordpress/element';
import { addAction, removeAction } from '@wordpress/hooks';

/**
 * External Dependencies
 */
import toast, { Toaster, Toast } from 'react-hot-toast';

/**
 * Toast payload structure
 */
type ToastPayload = {
	message: string;
	type?: 'success' | 'error' | 'info' | 'warning' | 'loading';
	duration?: number;
	id?: string;
	options?: Partial< Toast >;
};

/**
 * Notification component props
 */
type NotificationProps = {
	hook?: string;
	preventDuplicates?: boolean;
};

/**
 * Notification Component
 */
export default function Notification( {
	hook = 'wpmvc-toast',
	preventDuplicates = true,
}: NotificationProps ) {
	const displayed = useRef< Set< string > >( new Set() );

	useEffect( () => {
		const handler = ( {
			message,
			type = 'success',
			duration,
			id,
			options,
		}: ToastPayload ) => {
			if ( preventDuplicates && id && displayed.current.has( id ) ) {
				return;
			}

			if ( id ) {
				displayed.current.add( id );
			}

			const config = {
				duration,
				id,
				...options,
			};

			switch ( type ) {
				case 'error':
					toast.error( message, config );
					break;
				case 'info':
					toast( message, { ...config, icon: 'ℹ️' } );
					break;
				case 'warning':
					toast( message, { ...config, icon: '⚠️' } );
					break;
				case 'loading':
					toast.loading( message, config );
					break;
				default:
					toast.success( message, config );
					break;
			}
		};

		addAction( hook, 'wpmvc', handler );
		return () => {
			removeAction( hook, 'wpmvc' );
			displayed.current.clear();
		};
	}, [ hook, preventDuplicates ] );

	return (
		<Toaster
			position="top-center"
			reverseOrder={ true }
			containerStyle={ {
				top: 40,
				zIndex: 999999,
			} }
			toastOptions={ {
				style: {
					background: '#333',
					color: '#fff',
				},
			} }
		/>
	);
}
