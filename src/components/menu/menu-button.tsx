// External dependencies
import styled from 'styled-components';

// Internal types
import { Button } from '@wpmvc/components';
import { ButtonProps } from '@wordpress/components/build-types/button/types';

type MenuButtonProps = ButtonProps & {
	$active?: boolean;
};

export const MenuButton = styled( Button )< MenuButtonProps >`
	cursor: pointer;
	border-radius: 4px !important;

	color: ${ ( { $active } ) =>
		$active ? 'var(--wpmvc-primary-500)' : 'var(--wpmvc-gray-900)' };

	background-color: ${ ( { $active } ) =>
		$active ? 'var(--wpmvc-primary-25)' : 'transparent' };

	svg {
		opacity: ${ ( { $active } ) => ( $active ? 1 : 0.6 ) };
	}
` as React.ComponentType< MenuButtonProps >;
