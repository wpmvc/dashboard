import styled from 'styled-components';
import { StyledWrapperProps } from './types';

export const StyledWrapper = styled.div< StyledWrapperProps >`
	position: fixed;
	top: ${ ( props ) => `${ props.$top }px` };
	left: ${ ( props ) => `${ props.$left }px` };
	bottom: 0;
	right: 0;
	z-index: 900;
	overflow-y: auto;
	background: #f4f7f9;
`;
