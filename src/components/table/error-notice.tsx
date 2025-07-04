/**
 * WordPress Dependencies
 */
import { __ } from '@wordpress/i18n';
import { Notice } from '@wpmvc/components';

/**
 * Props for ErrorNotice component
 */
type ErrorNoticeProps = {
	errors: Record< string, string >;
	clearErrors: () => void;
};

/**
 * ErrorNotice
 *
 * Displays a list of error messages inside a dismissible Notice component.
 */
export default function ErrorNotice( {
	errors,
	clearErrors,
}: ErrorNoticeProps ) {
	if ( ! Object.keys( errors ).length ) return null;

	return (
		<div style={ { marginBottom: '16px' } }>
			<Notice status="error" isDismissible onRemove={ clearErrors }>
				<ul>
					{ Object.entries( errors ).map( ( [ key, msg ] ) => (
						<li key={ key }>{ msg }</li>
					) ) }
				</ul>
			</Notice>
		</div>
	);
}
