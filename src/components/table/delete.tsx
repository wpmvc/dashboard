/**
 * Delete Confirmation Modal
 *
 * Shows a confirmation dialog before deleting a record via REST API.
 */

/**
 * WordPress Dependencies
 */
import { __ } from '@wordpress/i18n';
import { useState, useEffect } from '@wordpress/element';

/**
 * External Dependencies
 */
import styled from 'styled-components';

/**
 * Internal Dependencies
 */
import { Modal } from '@wpmvc/components';
import ErrorNotice from './error-notice';
import { notify } from '../../utils';
import { Button } from '@wpmvc/components';

/**
 * Styled component for modal footer actions
 */
const FooterActions = styled.div`
	display: flex;
	justify-content: flex-end;
	gap: 8px;
`;

/**
 * Props for the Delete modal component
 */
type DeleteModalProps = {
	id: number;
	setId: React.Dispatch< React.SetStateAction< number > >;
	onSubmit: ( id: number ) => Promise< { message: string } >;
	onSuccess?: ( response: any ) => void;
	message?: string;
	title: string;
	okLabel: string;
	cancelLabel: string;
};

/**
 * Delete modal component to confirm and perform deletion
 */
export default function Delete( {
	id,
	title,
	setId,
	onSubmit,
	onSuccess,
	okLabel,
	cancelLabel,
	message = __( 'Are you sure you want to delete this item?' ),
}: DeleteModalProps ) {
	const [ isOpen, setOpen ] = useState( false );
	const [ isDeleting, setIsDeleting ] = useState( false );
	const [ errors, setErrors ] = useState< Record< string, string > >( {} );

	// Open modal when a valid ID is provided
	useEffect( () => {
		if ( id ) setOpen( true );
	}, [ id ] );

	/**
	 * Close modal and reset state
	 */
	const handleClose = () => {
		if ( isDeleting ) return;
		setOpen( false );
		setId( 0 );
		setErrors( {} );
	};

	/**
	 * Perform DELETE request and handle response
	 */
	const handleDelete = async () => {
		setIsDeleting( true );
		setErrors( {} );

		try {
			const response = await onSubmit( id );
			notify( { message: response.message } );
			handleClose();
			onSuccess?.( response );
		} catch ( error: any ) {
			console.error( error );
			if ( error?.message ) {
				setErrors( { delete: error.message } );
			} else {
				setErrors( error?.messages || {} );
			}
		} finally {
			setIsDeleting( false );
		}
	};

	return (
		<Modal
			isOpen={ isOpen }
			title={ title }
			size="small"
			isDismissible={ ! isDeleting }
			onClose={ handleClose }
			footer={
				<FooterActions>
					<Button
						variant="secondary"
						onClick={ handleClose }
						disabled={ isDeleting }
					>
						{ cancelLabel }
					</Button>
					<Button
						variant="primary"
						onClick={ handleDelete }
						isBusy={ isDeleting }
						disabled={ isDeleting }
					>
						{ okLabel }
					</Button>
				</FooterActions>
			}
		>
			<ErrorNotice
				errors={ errors }
				clearErrors={ () => setErrors( {} ) }
			/>
			{ message }
		</Modal>
	);
}
