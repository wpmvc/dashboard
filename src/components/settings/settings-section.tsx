import { Card } from '@wordpress/components';
import styled from 'styled-components';
import FormFields from '../form-fields';
import SectionHeader from './section-header';
import type { SettingsSection } from './types';
import Skeleton from '../skeleton';

const StyledSettingsSection = styled.div`
	> .components-card {
		padding: 28px;
		border-radius: 4px;
	}
`;

export default function SettingsSection( {
	heading,
	description,
	children,
	fields,
	attributes,
	setAttributes,
	loading,
}: SettingsSection ) {
	return (
		<StyledSettingsSection>
			<SectionHeader heading={ heading } description={ description }>
				{ children }
			</SectionHeader>
			<Card>
				{ loading ? (
					<Skeleton />
				) : (
					<FormFields
						fields={ fields }
						attributes={ attributes }
						setAttributes={ setAttributes }
					/>
				) }
			</Card>
		</StyledSettingsSection>
	);
}
