import { doAction } from '@wordpress/hooks';

/**
 * Toast message types
 */
type NotifyType = 'success' | 'error' | 'info' | 'warning' | 'loading';

/**
 * Notify payload interface
 */
interface NotifyOptions {
	message: string;
	type?: NotifyType;
	duration?: number;
	id?: string;
	options?: Record< string, any >;
	hook?: string;
}

/**
 * Fire a toast notification via WordPress hook
 *
 * @param {NotifyOptions} options - Notification options
 */
export default function notify( {
	message,
	type = 'success',
	duration,
	id,
	options,
	hook = 'wpmvc-toast',
}: NotifyOptions ): void {
	doAction( hook, {
		message,
		type,
		duration,
		id,
		options,
	} );
}
