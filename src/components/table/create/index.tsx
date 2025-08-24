/**
 * Create Component
 *
 * Renders a button that opens a modal for creating a new item.
 */

/**
 * WordPress Dependencies
 */
import { useState } from '@wordpress/element';
import { __ } from '@wordpress/i18n';

/**
 * Internal Dependencies
 */
import { Button } from '@wpmvc/components';
import { FieldsType } from '@wpmvc/fields/build-types/types/field';
import CreateModal from './create-modal';

/**
 * Props for Create component
 */
type CreateProps = {
	onSubmit: (
		attributes: Record< string, any >
	) => Promise< { message: string } >;
	addNewLabel?: string;
	fields: FieldsType;
	title: string;
	okLabel: string;
	cancelLabel: string;
	onSuccess?: ( response: any ) => void;
};

/**
 * Create button and modal wrapper
 */
export default function Create( {
	onSubmit,
	fields,
	addNewLabel,
	title,
	okLabel,
	cancelLabel,
	onSuccess,
}: CreateProps ) {
	const [ isOpen, setOpen ] = useState( false );

	const openModal = () => setOpen( true );
	const closeModal = () => setOpen( false );

	return (
		<>
			<Button variant="primary" onClick={ openModal }>
				{ addNewLabel || __( 'Add New' ) }
			</Button>
			<CreateModal
				title={ title }
				isOpen={ isOpen }
				closeModal={ closeModal }
				fields={ fields }
				onSubmit={ onSubmit }
				okLabel={ okLabel }
				cancelLabel={ cancelLabel }
				onSuccess={ onSuccess }
			/>
		</>
	);
}
