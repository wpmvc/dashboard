/**
 * Form Modal Component
 *
 * A flexible modal form with fullscreen toggle, loading state, and validation support.
 */

/**
 * WordPress Dependencies
 */
import { useRef, useState } from '@wordpress/element';
import { __ } from '@wordpress/i18n';
import { fullscreen } from '@wordpress/icons';

/**
 * External Dependencies
 */
import { FieldsType } from '@wpmvc/fields/build-types/types/field';
import styled from 'styled-components';

/**
 * Internal Dependencies
 */
import { Button, Modal } from '@wpmvc/components';
import { Fields } from '@wpmvc/fields';
import { notify } from '../../utils';
import Skeleton from '../skeleton';
import ErrorNotice from './error-notice';

/**
 * Styled footer actions in modal
 */
const FooterActions = styled.div`
	display: flex;
	justify-content: flex-end;
	gap: 8px;
`;

/**
 * Props for FormModal component
 */
type FormModalProps = {
	isOpen: boolean;
	title: string;
	okLabel: string;
	cancelLabel: string;
	fields: FieldsType;
	onClose: () => void;
	onSubmit: (
		attributes: Record< string, any >
	) => Promise< { message: string } >;
	refresh: () => void;
	isLoading?: boolean;
	initialAttributes?: Record< string, any >;
	attributes: Record< string, any >;
	setAttributes: ( attributes: Record< string, any > ) => void;
	resetAttributes: () => void;
};

/**
 * FormModal
 *
 * A modal with form fields and submission handling.
 */
export default function FormModal( {
	isOpen,
	title,
	okLabel,
	cancelLabel,
	fields,
	onClose,
	onSubmit,
	refresh,
	isLoading = false,
	attributes,
	setAttributes,
	resetAttributes,
}: FormModalProps ) {
	const [ isSubmitting, setSubmitting ] = useState( false );
	const [ isFullScreen, setIsFullScreen ] = useState( false );
	const [ errors, setErrors ] = useState< Record< string, string > >( {} );
	const formRef = useRef< HTMLFormElement >( null );

	/**
	 * Triggers the native form submission.
	 */
	const handleSave = () => {
		formRef.current?.requestSubmit();
	};

	/**
	 * Close modal and reset state.
	 */
	const handleClose = () => {
		if ( isSubmitting ) return;
		onClose();
		setErrors( {} );
		setAttributes( {} );
		setIsFullScreen( false );
	};

	/**
	 * Handle form submission.
	 */
	const handleSubmit = async ( e: React.FormEvent ) => {
		e.preventDefault();
		setSubmitting( true );
		setErrors( {} );

		try {
			const response = await onSubmit( attributes );
			notify( { message: response.message } );
			refresh();
			handleClose();
			resetAttributes();
		} catch ( error: any ) {
			setErrors(
				error?.messages || {
					error: error?.message || __( 'Something went wrong.' ),
				}
			);
			formRef.current?.scrollIntoView( {
				behavior: 'smooth',
				block: 'start',
			} ) || window.scrollTo( { top: 0, behavior: 'smooth' } );
		} finally {
			setSubmitting( false );
		}
	};

	return (
		<Modal
			isOpen={ isOpen }
			title={ title }
			size="large"
			isDismissible={ ! isSubmitting }
			isFullScreen={ isFullScreen }
			onClose={ handleClose }
			footer={
				<FooterActions>
					<Button
						variant="secondary"
						onClick={ handleClose }
						disabled={ isSubmitting }
					>
						{ cancelLabel }
					</Button>
					<Button
						variant="primary"
						onClick={ handleSave }
						isBusy={ isSubmitting }
						disabled={ isSubmitting || isLoading }
					>
						{ okLabel }
					</Button>
				</FooterActions>
			}
			headerActions={
				<Button
					icon={ fullscreen }
					label={ __( 'Fullscreen mode' ) }
					size="compact"
					onClick={ () => setIsFullScreen( ! isFullScreen ) }
				/>
			}
		>
			<ErrorNotice
				errors={ errors }
				clearErrors={ () => setErrors( {} ) }
			/>
			{ isLoading ? (
				<Skeleton />
			) : (
				<form ref={ formRef } onSubmit={ handleSubmit }>
					<Fields
						fields={ fields }
						attributes={ attributes }
						setAttributes={ setAttributes }
					/>
				</form>
			) }
		</Modal>
	);
}
