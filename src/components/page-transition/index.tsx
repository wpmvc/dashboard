import styled, { keyframes } from 'styled-components';

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

const PageTransition = styled.div`
	animation: ${ fadeIn } 0.45s;
`;

export default PageTransition;
