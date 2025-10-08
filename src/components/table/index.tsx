/**
 * Table Component
 *
 * Displays a table with CRUD actions using @wpmvc/data store integration.
 */

/**
 * WordPress Dependencies
 */
import apiFetch from '@wordpress/api-fetch';
import { Card, CardBody, CardFooter, CardHeader } from '@wordpress/components';
import { useInstanceId } from '@wordpress/compose';
import { useMemo, useState } from '@wordpress/element';
import { __ } from '@wordpress/i18n';
import { trash } from '@wordpress/icons';

/**
 * External Dependencies
 */
import styled from 'styled-components';

/**
 * Internal Dependencies
 */
import { Table as TableComponent } from '@wpmvc/components';
import { Layout } from '@wpmvc/components/build-types/gutenberg/table/types';
import {
	registerCrudStore,
	useCrudQueryParams,
	useCrudStore,
	useCrudStoreData,
} from '@wpmvc/data';
import { FieldsType } from '@wpmvc/fields/build-types/types/field';
import { isUndefined } from 'lodash';
import SectionHeader from '../settings/section-header';
import Create from './create';
import Delete from './delete';
import Edit from './edit';

/**
 * Styled wrapper for the table card
 */
const StyledCard = styled.div`
	margin: 0 auto;
	.dataviews-view-table{
		thead{
			th{
				background-color: #F9F9F9;
				border-bottom: 1px solid #F0F0F0;
			}
		}
	}
`;

type CRUD = {
	status?: boolean;
	title?: string;
	fields?: FieldsType;
	buttonLabel?: string;
	okLabel?: string;
	cancelLabel?: string;
	onClick?: ( item: any ) => void;
	onSuccess?: ( response: any ) => void;
	isDisabled?: boolean;
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
	actions?: any[];
	create?: Create;
	edit?: Edit;
	destroy?: Destroy;
	showTable?: boolean;
	beforeTable?: React.ReactNode;
	headerRight?: React.ReactNode;
	cardFooter?: React.ReactNode;
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
	actions,
	create,
	destroy,
	edit,
	showTable = true,
	beforeTable,
	cardFooter,
	headerRight,
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

	const {
		refresh,
		resetQueryParamsAndRefresh,
		create: createStore,
		update,
		updateItem,
		destroy: destroyItem,
	} = useCrudStore( {
		name: storeKey,
		path,
	} );

	const isEnabledCreate =
		isUndefined( create?.status ) || create?.status === true;
	const isEnabledEdit = isUndefined( edit?.status ) || edit?.status === true;
	const isEnabledDestroy =
		isUndefined( destroy?.status ) || destroy?.status === true;

	const defaultActions = useMemo( () => {
		let items = [];

		if ( isEnabledEdit ) {
			items.push( {
				id: 'edit',
				label: edit?.buttonLabel ?? __( 'Edit' ),
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
				icon: trash,
				label: destroy?.buttonLabel ?? __( 'Delete' ),
				isPrimary: true,
				callback: ( items: any[] ) => {
					const id = parseInt( items[ 0 ]?.id ?? items[ 0 ]?.ID );
					if ( ! isNaN( id ) ) setDeleteId( id );
				},
			} );
		}

		return items;
	}, [ isEnabledEdit, isEnabledDestroy ] );

	const mergedActions = useMemo( () => {
		return [ ...( actions ?? [] ), ...defaultActions ];
	}, [ actions, defaultActions ] );

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
		<Card>
			<StyledCard>
				<CardHeader>
					<SectionHeader heading={ heading }>
						{ headerRight }
						{ isEnabledCreate && ! create?.onClick && (
							<Create
								onSubmit={ createStore }
								fields={ create?.fields ?? {} }
								addNewLabel={
									create?.buttonLabel ?? __( 'Add New' )
								}
								title={ create?.title ?? __( 'Add Item' ) }
								okLabel={ create?.okLabel ?? __( 'Create' ) }
								cancelLabel={
									create?.cancelLabel ?? __( 'Cancel' )
								}
								onSuccess={ ( response ) => {
									create?.onSuccess?.( response );
									resetQueryParamsAndRefresh();
								} }
								isDisabled={ create?.isDisabled }
							/>
						) }
					</SectionHeader>
				</CardHeader>
				
				{ isEnabledEdit && (
					<Edit
						path={ path }
						onSubmit={ update }
						fields={ edit?.fields ?? {} }
						editId={ editId }
						setEditId={ setEditId }
						title={ edit?.title ?? __( 'Edit Item' ) }
						okLabel={ edit?.okLabel ?? __( 'Save' ) }
						cancelLabel={ edit?.cancelLabel ?? __( 'Cancel' ) }
						onSuccess={ edit?.onSuccess }
					/>
				) }
				{ isEnabledDestroy && (
					<Delete
						id={ deleteId }
						setId={ setDeleteId }
						onSubmit={ destroyItem }
						title={ destroy?.title ?? __( 'Delete Item' ) }
						okLabel={ destroy?.okLabel ?? __( 'Delete' ) }
						cancelLabel={ destroy?.cancelLabel ?? __( 'Cancel' ) }
						message={ destroy?.message }
						onSuccess={ destroy?.onSuccess }
					/>
				) }
				<CardBody>
					{ beforeTable }
					{
						showTable && (
							<TableComponent
								{ ...props }
								items={ data.items ?? [] }
								total={ data.total ?? 0 }
								isLoading={ ! isResolved }
								fields={ processedColumns }
								refresh={ refresh }
								actions={ mergedActions }
								queryParams={ queryParams }
							/>
						)
					}
				</CardBody>
				{ cardFooter && <CardFooter>{ cardFooter }</CardFooter> }
			</StyledCard>
		</Card>
	);
}
