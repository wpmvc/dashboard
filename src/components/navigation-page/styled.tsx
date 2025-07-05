import styled from 'styled-components';
import type { NavigationWrapperProps } from './types';

export const NavigationWrapper = styled.nav<
	NavigationWrapperProps & { $isHeaderHidden: boolean }
>`
	position: fixed;
	bottom: 0;
	left: ${ ( { $left } ) => `${ $left }px` };

	height: ${ ( { $top, $isHeaderHidden } ) =>
		$isHeaderHidden
			? `calc(100vh - ${ $top }px - 1px)`
			: `calc(100vh - (var(--wpmvc-header-height) + ${ $top }px) - 1px)` };

	width: ${ ( { $width } ) => `${ $width }px` };
	background: var( --wpmvc-background-light );
	// box-shadow: 0 1px 3px rgba( 0, 0, 0, 0.1 );
	z-index: 900;
	overflow-y: auto;
	border-right: 1px solid rgba( 0, 0, 0, 0.13 );

	@media ( max-width: 768px ) {
		display: ${ ( { $open } ) => ( $open ? 'block' : 'none' ) };
		position: fixed;
		top: calc(
			var( --wpmvc-header-height ) + ${ ( { $top } ) => `${ $top }px` } +
				1px
		);
		width: 100%;
		background: var( --bg-primary );
	}
`;

export const NavigationSection = styled.div`
	margin: 16px 0;
	padding: 0 10px;
`;
