import { Flex, FlexItem, Icon } from '@wordpress/components';
import { __experimentalHeading as Heading } from '@wordpress/components';
import styled from 'styled-components';
import type { SettingsHeader } from './types';
import { Button } from '@wpmvc/components';

const HeaderContainer = styled.div`
	border-bottom: 1px solid var( --wpmvc-gray-300 );
	padding-bottom: 16px;
`;

const StyledHeading = styled( Heading )`
	display: flex;
	align-items: center;
	gap: 8px;
`;

const StyledButton = styled( Button )`
	border-radius: 4px;
`;

export default function SettingsHeader( {
	heading,
	icon,
	loading,
	isSaving,
}: SettingsHeader ) {
	return (
		<HeaderContainer>
			<Flex>
				<FlexItem>
					<StyledHeading
						size={ 20 }
						weight={ 700 }
						lineHeight={ '24px' }
						color={ 'var(--wpmvc-gray-900)' }
						style={ {
							display: 'flex',
							alignItems: 'center',
							gap: '8px',
						} }
					>
						<Icon icon={ icon } />
						{ heading }
					</StyledHeading>
				</FlexItem>
				<FlexItem>
					<StyledButton
						variant="primary"
						type="submit"
						isBusy={ isSaving }
						disabled={ isSaving || loading }
					>
						Save
					</StyledButton>
				</FlexItem>
			</Flex>
		</HeaderContainer>
	);
}
