import { useEffect } from 'react';
import styled, { keyframes } from 'styled-components';
import { useDashboardRouting } from '../../hooks';

const fadeIn = keyframes`
    from {
        opacity: 0;
        transform: translateY(4px);
        filter: blur(3px);
    }
    to {
        opacity: 1;
        transform: translateY(0);
        filter: blur(0);
    }
`;

const PageTransitionWrapper = styled.div`
	animation: ${ fadeIn } 0.45s ease;
`;

export default function PageTransition( {
	children,
}: {
	children: React.ReactNode;
} ) {
	const { location } = useDashboardRouting();

	useEffect( () => {
		window.scrollTo( { top: 0, behavior: 'smooth' } );
	}, [ location?.pathname ] );

	return <PageTransitionWrapper>{ children }</PageTransitionWrapper>;
}
