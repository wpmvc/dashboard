/**
 * Table Component
 *
 * Displays a table with CRUD actions using @wpmvc/data store integration.
 */

/**
 * WordPress Dependencies
 */
import { Card } from '@wordpress/components';
import { useMemo, useState } from '@wordpress/element';
import { useInstanceId } from '@wordpress/compose';
import { __ } from '@wordpress/i18n';

/**
 * External Dependencies
 */
import styled from 'styled-components';

/**
 * Internal Dependencies
 */
import { Table as TableComponent } from '@wpmvc/components';
import SectionHeader from '../settings/section-header';
import {
	registerCrudStore,
	useCrudQueryParams,
	useCrudStore,
	useCrudStoreData,
} from '@wpmvc/data';
import Create from './create';
import Edit from './edit';
import Delete from './delete';
import { FieldsType } from '@wpmvc/fields/build-types/types/field';
import { isUndefined } from 'lodash';

/**
 * Styled wrapper for the table card
 */
const StyledCard = styled.div`
	margin: 0 auto;
	padding: 24px;
`;

type CRUD = {
	status?: boolean;
	title?: string;
	fields?: FieldsType;
	buttonLabel?: string;
	okLabel?: string;
	cancelLabel?: string;
};

type Destroy = Omit< CRUD, 'fields' > & {
	message?: string;
};

type Create = CRUD;
type Edit = CRUD;

/**
 * Props for Table component
 */
type TableProps = {
	heading: string;
	path: string;
	columns: any[];
	storeName?: string;
	editFields: FieldsType;
	create?: Create;
	edit?: Edit;
	destroy?: Destroy;
};

/**
 * Table
 *
 * Renders CRUD-enabled table with Create, Edit, Delete modals.
 */
export default function Table( {
	heading,
	path,
	columns,
	storeName,
	create,
	destroy,
	edit,
}: TableProps ) {
	const instanceId = useInstanceId( Table, 'wpmvc-dashboard-table' );
	const storeKey = storeName || instanceId;

	const [ editId, setEditId ] = useState( 0 );
	const [ deleteId, setDeleteId ] = useState( 0 );

	registerCrudStore( {
		name: storeKey,
		path,
	} );

	const { data, isResolved } = useCrudStoreData( {
		name: storeKey,
		selector: 'get',
	} );

	const { refresh, resetQueryParamsAndRefresh, store, update } = useCrudStore(
		{
			name: storeKey,
			path,
		}
	);

	const isEnabledCreate =
		isUndefined( create?.status ) || create?.status === true;
	const isEnabledEdit = isUndefined( edit?.status ) || edit?.status === true;
	const isEnabledDestroy =
		isUndefined( destroy?.status ) || destroy?.status === true;

	const actions = useMemo( () => {
		let items = [];

		if ( isEnabledEdit ) {
			items.push( {
				id: 'edit',
				label: create?.buttonLabel ?? __( 'Edit' ),
				callback: ( items: any[] ) => {
					const id = parseInt( items[ 0 ]?.id );
					if ( ! isNaN( id ) ) setEditId( id );
				},
			} );
		}

		if ( isEnabledDestroy ) {
			items.push( {
				id: 'delete',
				label: destroy?.buttonLabel ?? __( 'Delete' ),
				isDestructive: true,
				callback: ( items: any[] ) => {
					const id = parseInt( items[ 0 ]?.id );
					if ( ! isNaN( id ) ) setDeleteId( id );
				},
			} );
		}

		return items;
	}, [ isEnabledEdit, isEnabledDestroy ] );

	const queryParams = useCrudQueryParams( { name: storeKey } );

	return (
		<>
			<StyledCard>
				<SectionHeader heading={ heading }>
					{ isEnabledCreate && (
						<Create
							store={ store }
							refresh={ resetQueryParamsAndRefresh }
							fields={ create?.fields ?? {} }
							addNewLabel={
								create?.buttonLabel ?? __( 'Add New' )
							}
							title={ create?.title ?? __( 'Add Item' ) }
							okLabel={ create?.okLabel ?? __( 'Create' ) }
							cancelLabel={
								create?.cancelLabel ?? __( 'Cancel' )
							}
						/>
					) }
				</SectionHeader>
				{ isEnabledEdit && (
					<Edit
						path={ path }
						update={ update }
						refresh={ refresh }
						fields={ edit?.fields ?? {} }
						editId={ editId }
						setEditId={ setEditId }
						title={ edit?.title ?? __( 'Edit Item' ) }
						okLabel={ edit?.okLabel ?? __( 'Save' ) }
						cancelLabel={ edit?.cancelLabel ?? __( 'Cancel' ) }
					/>
				) }
				{ isEnabledDestroy && (
					<Delete
						path={ path }
						refresh={ refresh }
						id={ deleteId }
						setId={ setDeleteId }
						title={ destroy?.title ?? __( 'Delete Item' ) }
						okLabel={ destroy?.okLabel ?? __( 'Delete' ) }
						cancelLabel={ destroy?.cancelLabel ?? __( 'Cancel' ) }
						message={ destroy?.message }
					/>
				) }
				<Card style={ { borderRadius: 4, overflow: 'hidden' } }>
					<TableComponent
						items={ data.items ?? [] }
						total={ data.total ?? 0 }
						isLoading={ ! isResolved }
						fields={ columns }
						refresh={ refresh }
						actions={ actions }
						queryParams={ queryParams }
					/>
				</Card>
			</StyledCard>
		</>
	);
}
