import {
	Flex,
	FlexBlock,
	FlexItem,
	__experimentalHeading as Heading,
} from '@wordpress/components';
import { __experimentalText as Text } from '@wordpress/components';
import styled from 'styled-components';
import type { SectionHeader } from './types';

const StyledSectionHeader = styled( Flex )`
	margin-bottom: 20px;

	h2 {
		font-size: 16px;
		line-height: 20px;
		color: var( --wpmvc-gray-900 );
	}

	p {
		font-size: 12px;
		font-weight: 500;
		line-height: 16px;
		padding-top: 10px;
		color: var( --wpmvc-gray-700 );
	}
`;

export default function SectionHeader( {
	heading,
	description,
	children,
	style,
}: SectionHeader ) {
	return (
		<StyledSectionHeader gap={ 36 } style={ style }>
			<FlexBlock>
				<Heading>{ heading }</Heading>
				{ description && <Text as={ 'p' }>{ description }</Text> }
			</FlexBlock>
			{ children && <FlexItem>{ children }</FlexItem> }
		</StyledSectionHeader>
	);
}
