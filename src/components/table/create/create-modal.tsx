/**
 * CreateModal Component
 *
 * Displays a form modal for creating a new item using the provided store function.
 */

/**
 * WordPress Dependencies
 */
import { __ } from '@wordpress/i18n';

/**
 * Internal Dependencies
 */
import { useAttributes } from '@wpmvc/fields';
import FormModal from '../form-modal';
import { FieldsType } from '@wpmvc/fields/build-types/types/field';

/**
 * Props for the CreateModal component
 */
type CreateModalProps = {
	isOpen: boolean;
	closeModal: () => void;
	fields: FieldsType;
	title: string;
	okLabel: string;
	cancelLabel: string;
	onSubmit: (
		attributes: Record< string, any >
	) => Promise< { message: string } >;
	onSuccess?: ( response: any ) => void;
};

/**
 * Modal component for creating a new item
 */
export default function CreateModal( {
	isOpen,
	closeModal,
	fields,
	title,
	okLabel,
	cancelLabel,
	onSubmit,
	onSuccess,
}: CreateModalProps ) {
	const [ attributes, setAttributes, resetAttributes ] = useAttributes( {} );

	return (
		<FormModal
			isOpen={ isOpen }
			title={ title }
			okLabel={ okLabel }
			cancelLabel={ cancelLabel }
			fields={ fields }
			onClose={ closeModal }
			onSubmit={ onSubmit }
			attributes={ attributes }
			setAttributes={ setAttributes }
			resetAttributes={ resetAttributes }
			onSuccess={ onSuccess }
		/>
	);
}
