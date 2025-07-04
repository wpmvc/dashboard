import { IconType } from '@wordpress/components';
import { FieldsType } from '@wpmvc/fields/build-types/types/field';
import { CSSProperties, ReactNode } from 'react';

export type SettingsHeader = {
	heading: string;
	icon?: IconType;
	loading: boolean;
	isSaving: boolean;
};

export type SectionHeader = {
	heading: string;
	description?: string;
	children?: ReactNode;
	style?: CSSProperties | undefined;
};

export type SettingsSection = SectionHeader & {
	fields: FieldsType;
	attributes: Record< string, any >;
	setAttributes: ( attributes: Record< string, any > ) => void;
	loading?: boolean;
};

export type Section = {
	heading?: string;
	description?: string;
	fields?: FieldsType;
	View?: ( props: {
		attributes: Record< string, any >;
		setAttributes: ( attributes: Record< string, any > ) => void;
		loading?: boolean;
	} ) => JSX.Element;
};

export type Sections = Record< string, Section >;
export type SettingsSections = {
	sections: Sections;
	attributes: Record< string, any >;
	setAttributes: ( attributes: Record< string, any > ) => void;
	loading?: boolean;
};

export type Settings = {
	heading: string;
	icon?: IconType;
	sections: Sections;
	store: {
		name?: string;
		path: string;
	};
};
