import styled from 'styled-components';

interface HeaderWrapperProps {
	$top?: number;
	$left?: number;
}

export const HeaderWrapper = styled.header< HeaderWrapperProps >`
	position: fixed;
	height: var( --wpmvc-header-height );
	top: ${ ( props ) => `${ props.$top }px` };
	left: ${ ( props ) => `${ props.$left }px` };
	right: 0;
	background: white;
	padding: 0px 24px;
	display: flex;
	align-items: center;
	justify-content: space-between;
	z-index: 99;
	border-bottom: 1px solid rgba( 0, 0, 0, 0.13 );
`;

export const Logo = styled.div`
	display: flex;
	align-items: center;
	gap: 10px;
	font-size: 18px;
	font-weight: 600;
	color: var( --text-primary );
`;

export const HeaderContent = styled.div`
	display: flex;
	align-items: center;
	justify-content: space-between;
	width: 100%;
`;

export const HeaderLeft = styled.div`
	display: flex;
	align-items: center;
	gap: 40px;
`;

export const HeaderRight = styled.div`
	@media ( max-width: 768px ) {
		display: none;
	}
`;

export const MobileActions = styled.div`
	display: none;

	@media ( max-width: 768px ) {
		display: flex;
		gap: 10px;
		align-items: center;
	}
`;

export const HeaderMenuWrapper = styled.nav`
	display: flex;
	gap: 4px;

	@media ( max-width: 768px ) {
		display: none;
	}
`;

type ResponsiveMenuWrapperProps = {
	$open: boolean;
	$top: number;
};

export const ResponsiveMenuWrapper = styled.div< ResponsiveMenuWrapperProps >`
	display: ${ ( { $open } ) => ( $open ? 'block' : 'none' ) };
	background: var( --bg-primary );
	padding: 20px 20px 100px 20px;
	position: fixed;
	overflow-y: auto;
	top: calc(
		var( --wpmvc-header-height ) + ${ ( { $top } ) => `${ $top }px` }
	);
	left: 0;
	right: 0;
	bottom: 0;
	z-index: 9;

	.menu-section {
		display: flex;
		flex-direction: column;
		gap: 12px;
		margin-bottom: 10px;
	}

	.bottom-actions {
		position: sticky;
		bottom: 0;
		background: var( --bg-primary );
		padding: 12px 0 52px;
		display: flex;
		justify-content: flex-start;
		gap: 12px;
		z-index: 1;
		border-top: 1px solid var( --border-color );
	}

	@media ( min-width: 769px ) {
		display: none !important;
	}
`;
