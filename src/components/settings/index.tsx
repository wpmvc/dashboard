/**
 * WordPress Dependencies
 */
import { __ } from '@wordpress/i18n';
import { useEffect, useState } from '@wordpress/element';
import { useInstanceId } from '@wordpress/compose';

/**
 * External Dependencies
 */
import styled from 'styled-components';

/**
 * Internal Dependencies
 */
import SettingsSections from './settings-sections';
import SettingsHeader from './settings-header';
import type { Settings as SettingsProps } from './types';
import { useAttributes } from '@wpmvc/fields';
import { notify } from '../../utils';
import {
	registerValuesStore,
	useValuesStore,
	useValuesStoreData,
} from '@wpmvc/data';

/**
 * Styled container for the settings form
 */
const StyledForm = styled.form`
	max-width: 840px;
	margin: 0 auto;
	padding: 24px;
`;

/**
 * Settings
 *
 * Main settings panel form with data fetching, editing, and saving.
 */
export default function Settings( {
	heading,
	icon,
	sections,
	store,
}: SettingsProps ) {
	const instanceId = useInstanceId( Settings, 'wpmvc-dashboard-settings' );
	const storeName = store?.name || instanceId;

	// Register store on mount
	registerValuesStore( { ...store, name: storeName } );

	// State & store hooks
	const [ loading, setLoading ] = useState( true );
	const [ isSaving, setIsSaving ] = useState( false );
	const [ attributes, setAttributes ] = useAttributes();
	const { data, isResolved } = useValuesStoreData( {
		...store,
		name: storeName,
	} );
	const { save } = useValuesStore( { ...store, name: storeName } );

	// Populate attributes from store data
	useEffect( () => {
		setAttributes( data );
	}, [ data ] );

	// Detect when initial load is complete
	useEffect( () => {
		if ( loading && isResolved ) {
			setLoading( false );
		}
	}, [ isResolved, loading ] );

	/**
	 * Handle form submit
	 */
	const handleSubmit = async ( e: React.FormEvent ) => {
		e.preventDefault();
		setIsSaving( true );
		try {
			const response = await save( attributes );
			notify( { message: response.message } );
		} catch ( error: any ) {
			console.error( 'Error:', error );
			notify( {
				message: error?.message || __( 'Something went wrong' ),
				type: 'error',
			} );
		} finally {
			setIsSaving( false );
		}
	};

	return (
		<StyledForm onSubmit={ handleSubmit }>
			<SettingsHeader
				heading={ heading }
				icon={ icon }
				loading={ loading }
				isSaving={ isSaving }
			/>
			<SettingsSections
				sections={ sections }
				attributes={ attributes }
				setAttributes={ setAttributes }
				loading={ loading }
			/>
		</StyledForm>
	);
}
