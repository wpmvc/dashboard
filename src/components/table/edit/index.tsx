/**
 * Edit Modal
 *
 * Fetches and shows a form modal to update an item by ID.
 */

/**
 * WordPress Dependencies
 */
import { useEffect, useState } from '@wordpress/element';
import { __ } from '@wordpress/i18n';
import apiFetch from '@wordpress/api-fetch';

/**
 * External Dependencies
 */
import { FieldsType } from '@wpmvc/fields/build-types/types/field';

/**
 * Internal Dependencies
 */
import { useAttributes } from '@wpmvc/fields';
import FormModal from '../form-modal';

/**
 * Props for Edit modal
 */
type EditProps = {
	path: string;
	editId: number;
	setEditId: ( id: number ) => void;
	onSubmit: (
		id: number,
		attributes: Record< string, any >
	) => Promise< { message: string } >;
	fields: FieldsType;
	title: string;
	okLabel: string;
	cancelLabel: string;
	onSuccess?: ( response: any ) => void;
};

/**
 * Edit component
 */
export default function Edit( {
	path,
	editId,
	setEditId,
	onSubmit,
	fields,
	title,
	okLabel,
	cancelLabel,
	onSuccess,
}: EditProps ) {
	const [ isOpen, setOpen ] = useState( false );
	const [ isLoading, setLoading ] = useState( true );
	const [ attributes, setAttributes, resetAttributes ] = useAttributes( {} );

	/**
	 * Open modal
	 */
	const openModal = () => setOpen( true );

	/**
	 * Close modal and reset edit state
	 */
	const closeModal = () => {
		setOpen( false );
		setEditId( 0 );
	};

	/**
	 * Load item data when editId is set
	 */
	useEffect( () => {
		if ( ! editId ) return;
		openModal();

		const fetchData = async () => {
			setLoading( true );
			try {
				const response = await apiFetch< {
					data: Record< string, any >;
				} >( {
					path: `${ path }/${ editId }`,
				} );
				setAttributes( response.data );
			} catch ( error ) {
				console.error( error );
			} finally {
				setLoading( false );
			}
		};

		fetchData();
	}, [ editId ] );

	return (
		<FormModal
			isOpen={ isOpen }
			title={ title }
			okLabel={ okLabel }
			cancelLabel={ cancelLabel }
			fields={ fields }
			onClose={ () => {
				closeModal();
				setLoading( true );
			} }
			onSubmit={ ( attrs ) => onSubmit( editId, attrs ) }
			initialAttributes={ attributes }
			isLoading={ isLoading }
			attributes={ attributes }
			setAttributes={ setAttributes }
			resetAttributes={ resetAttributes }
			onSuccess={ onSuccess }
		/>
	);
}
