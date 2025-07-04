import styled from 'styled-components';
import SettingsSection from './settings-section';
import type { SettingsSections } from './types';

const Wrapper = styled.div`
	padding-top: 32px;
	padding-bottom: 8px;
`;

export default function SettingsSections( {
	sections,
	attributes,
	setAttributes,
	loading,
}: SettingsSections ) {
	return Object.entries( sections ).map(
		( [ key, { heading, description, fields, View } ] ) => {
			if ( View ) {
				return (
					<Wrapper key={ key }>
						<View
							attributes={ attributes }
							setAttributes={ setAttributes }
							loading={ loading }
						/>
					</Wrapper>
				);
			}
			return (
				<Wrapper key={ key }>
					<SettingsSection
						heading={ heading ?? '' }
						description={ description ?? '' }
						fields={ fields ?? {} }
						attributes={ attributes }
						setAttributes={ setAttributes }
						loading={ loading }
					/>
				</Wrapper>
			);
		}
	);
}
