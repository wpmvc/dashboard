import { Fields } from '@wpmvc/fields';
import { FieldRootProps } from '@wpmvc/fields/build-types/types/field';
import styled from 'styled-components';

export const StyledFormFields = styled.div`
	.components-toggle-group-control,
	.components-input-control__container {
		border-radius: 4px;
	}

	.components-base-control__label,
	label {
		span {
			font-size: 13px;
			text-transform: capitalize;
			color: var( --wpmvc-gray-800 );
		}
	}

	.components-base-control__help {
		color: var( --wpmvc-gray-700 );
	}
`;

export default function FormFields( props: FieldRootProps ) {
	return (
		<StyledFormFields>
			<Fields { ...props } />
		</StyledFormFields>
	);
}
