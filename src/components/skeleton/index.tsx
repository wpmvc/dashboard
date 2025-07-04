import styled, { keyframes } from 'styled-components';

const shimmer = keyframes`
  0% {
    background-position: -400px 0;
  }
  100% {
    background-position: 400px 0;
  }
`;

const SkeletonLine = styled.div< { width?: string } >`
	height: 16px;
	border-radius: 9999px;
	width: ${ ( { width } ) => width || '100%' };

	background: linear-gradient( 90deg, #e2e8f0 0%, #cbd5e1 50%, #e2e8f0 100% );
	background-size: 800px 100%;
	animation: ${ shimmer } 1.2s ease-in-out infinite;

	&:not( :last-child ) {
		margin-bottom: 12px;
	}
`;

export default function Skeleton() {
	return (
		<>
			<SkeletonLine />
			<SkeletonLine width="55%" />
		</>
	);
}
