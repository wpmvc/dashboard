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
import apiFetch from '@wordpress/api-fetch';
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
import { Layout } from '@wpmvc/components/build-types/gutenberg/table/types';

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
	onClick?: ( item: any ) => void;
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
	create?: Create;
	edit?: Edit;
	destroy?: Destroy;
	layoutType?: string;
	layout?: Layout;
	layouts?: {
		table?: {
			layout: Layout;
		};
		grid?: {
			layout: Layout;
		};
	};
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
	...props
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

	const { refresh, resetQueryParamsAndRefresh, store, update, updateItem } =
		useCrudStore( {
			name: storeKey,
			path,
		} );

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
					const item = items[ 0 ];
					if ( edit?.onClick ) {
						edit.onClick( item );
					} else {
						const id = parseInt( items[ 0 ]?.id ?? items[ 0 ]?.ID );
						if ( ! isNaN( id ) ) setEditId( id );
					}
				},
			} );
		}

		if ( isEnabledDestroy ) {
			items.push( {
				id: 'delete',
				label: destroy?.buttonLabel ?? __( 'Delete' ),
				isDestructive: true,
				callback: ( items: any[] ) => {
					const id = parseInt( items[ 0 ]?.id ?? items[ 0 ]?.ID );
					if ( ! isNaN( id ) ) setDeleteId( id );
				},
			} );
		}

		return items;
	}, [ isEnabledEdit, isEnabledDestroy ] );

	const queryParams = useCrudQueryParams( { name: storeKey } );

	const processedColumns = useMemo( () => {
		return columns.map( ( column ) => {
			if ( ! column.isStatus ) {
				return column;
			}

			const { render } = column;
			return {
				...column,
				render: ( { item }: any ) => {
					const [ isLoading, setIsLoading ] = useState( false );

					const onChange = async ( value: boolean ) => {
						setIsLoading( true );

						try {
							await apiFetch( {
								path: `${ path }/${ item?.id ?? item?.ID }/${
									column.id
								}`,
								method: 'POST',
								data: { value },
							} );

							updateItem( item?.id ?? item?.ID, {
								...item,
								[ column.id ]: value,
							} );
						} catch ( error ) {
							console.error( 'Failed to update status:', error );
						} finally {
							setIsLoading( false );
						}
					};

					return render( { item, onChange, isLoading } );
				},
			};
		} );
	}, [ columns, updateItem, path ] );

	return (
		<>
			<StyledCard>
				<SectionHeader heading={ heading }>
					{ isEnabledCreate && ! create?.onClick && (
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
						{ ...props }
						items={ data.items ?? [] }
						total={ data.total ?? 0 }
						isLoading={ ! isResolved }
						fields={ processedColumns }
						refresh={ refresh }
						actions={ actions }
						queryParams={ queryParams }
					/>
				</Card>
			</StyledCard>
		</>
	);
}
